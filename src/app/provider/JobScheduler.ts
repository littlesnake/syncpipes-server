import { injectable, inject } from "inversify";
import * as amqp from 'amqplib';
import { PipelineContext, IExtractorService, ILoaderService } from "../service/Service";
import { IServiceManager } from "./ServiceManager";
import { PipelineExecution } from "../model/PipelineExecution";
import { TrivialMapper } from "../service/Mapper";
import { MongoLogger } from "../service/Logger";

export interface IJobSchedulerConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    vhost: string;
}

export interface IJobScheduler {
    configure(config: IJobSchedulerConfig): Promise<any>;
    schedule(context: PipelineContext): boolean;
    consume();
}

@injectable()
export class JobScheduler implements IJobScheduler {

    private config: IJobSchedulerConfig;

    private queueName: string = 'tasks';

    private channel: amqp.Channel;

    private services: IServiceManager;

    constructor(
        @inject('services') services: IServiceManager
    ) {
        this.services = services;
    }

    configure(config: IJobSchedulerConfig): Promise<any> {
        this.config = config;
        return new Promise<any>((resolve, reject) => {
            // connect
            amqp.connect(this.amqpUrl()).then((conn) => {
                conn.createChannel().then((ch) => {
                    ch.assertQueue(this.queueName, {durable: true}).then(() => {
                        this.channel = ch;
                        resolve()
                    }).catch(this.handleError);
                }).catch(this.handleError);
            }).catch(this.handleError);
        });
    }

    schedule(context: PipelineContext): boolean {
        this.channel.sendToQueue(this.queueName, new Buffer(JSON.stringify({pipeline: context.pipeline, data: context.inputData, executionID: context.executionID})), {deliveryMode: true});
        return true;
    }

    consume() {
        this.channel.assertQueue(this.queueName, {durable: true}).then(() => {
            return this.channel.prefetch(1);
        }).then(() => {
            this.channel.consume(this.queueName, (msg) => {
                // deserialize pipeline context
                let context = PipelineContext.createFromJson(msg.content.toString());
                // logger
                let logger = new MongoLogger(context.executionID);
                // set pipeline status
                PipelineExecution.update({_id: context.executionID}, {"$set": {"status": "Running"}}).exec();
                // helper for error handling
                let handleError = (error) => {
                    logger.error(error);
                    let query = {
                        "$set": {
                            "status": "Failed",
                            "finished": new Date()
                        }
                    };
                    PipelineExecution.update({_id: context.executionID}, query).exec();
                };

                try {
                    logger.info(`Pipeline ${context.pipeline.name} started`);
                    // get extractor and loader
                    let extractor = <IExtractorService>this.services.get(context.pipeline.extractorConfig.service);
                    let loader = <ILoaderService>this.services.get(context.pipeline.loaderConfig.service);
                    // set extractor config
                    let extractorConfig = extractor.getConfiguration();
                    if (extractorConfig != null) {
                        extractorConfig.load(context.pipeline.extractorConfig.config);
                        extractor.setConfiguration(extractorConfig);
                    }
                    // set loader config
                    let loaderConfig = loader.getConfiguration();
                    if (loaderConfig != null) {
                        loaderConfig.load(context.pipeline.loaderConfig.config);
                        loader.setConfiguration(loaderConfig);
                    }
                    // prepare services
                    Promise.all([
                        extractor.prepare(context, logger),
                        loader.prepare(context, logger)
                    ]).then(() => {

                        // destination stream
                        let loaderStream = loader.load();
                        loaderStream.on('error', (err) => handleError(`Loader stream error: ${err}`));
                        loaderStream.on('finish', () => {
                            logger.info(`Data loading finished`);
                            PipelineExecution.update({_id: context.executionID}, {"$set": {"status": "Finished", "finished": new Date()}}).exec();
                        });

                        // Get the extractor data stream and setup error handling
                        let extractorStream = extractor.extract();
                        extractorStream.on('error', (err) => handleError(`Extractor stream error: ${err}`));
                        extractorStream.on('end', () => {
                            logger.info(`Data extraction finished`);
                            //loaderStream.end();
                        });

                        // init the mapper
                        let mapper = new TrivialMapper();
                        mapper.prepare(extractor.getSchema(), loader.getSchema(), context.pipeline.mapping);
                        // pipe the extractorStream to the loader stream
                        extractorStream.pipe(mapper).pipe(loaderStream);

                    }).catch((err) => handleError(`Prepare failed with error: ${err}`));
                } catch (e) {
                    handleError(e);
                } finally {
                    // for now
                    this.channel.ack(msg);
                }
            }, {noAck: false});
        });
    }

    private amqpUrl(): string {
        let url = 'amqp://';
        if (this.config.password !== "" && this.config.user != "") {
            url += `${this.config.user}:${this.config.password}@`;
        }
        url += `${this.config.host}:${this.config.port}`;
        if (this.config.vhost !== "" || this.config.vhost !== "/") {
            url += `/${this.config.vhost}`;
        }
        return url;
    }

    private handleError(err) {
        console.error(err);
        process.exit(1);
    }
}
