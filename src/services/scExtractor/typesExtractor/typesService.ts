import * as stream from 'stream';
import * as SyncPipes from "./../../../app/index";
import 'node-rest-client';

// config
import { Configuration } from './../Configuration'

/**
 * Extracts Repositories and Issues from a github org
 */
export class SocioCortexTypesExtractorService implements SyncPipes.IExtractorService {

    /**
     * Extractor configuration
     */
    private config: Configuration;

    /**
     * Execution context
     */
    private context: SyncPipes.IPipelineContext;

    private client: any;

    /**
     * Output stream
     */
    private stream: stream.Readable;

    /**
     * SyncPipes logger instance
     */
    private logger: SyncPipes.ILogger;

    /**
     * Extension schema
     */
    private schema: SyncPipes.ISchema;

    constructor() {
        this.schema = SyncPipes.Schema.createFromFile(__dirname + '/schema.json');
    }

    /**
     * Data is fetched actively
     *
     * @return {ExtractorServiceType}
     */
    getType(): SyncPipes.ExtractorServiceType {
        return SyncPipes.ExtractorServiceType.Active;
    }

    prepare(context: SyncPipes.IPipelineContext, logger: SyncPipes.ILogger): Promise<any> {
        this.context = context;
        this.config = new Configuration();
        this.logger = logger;
        this.config.load(context.pipeline.extractorConfig.config);

        var Client = require('node-rest-client').Client;
        this.client = new Client({ user: this.config.username, password: this.config.password });

        return Promise.resolve();
    }

    extract(): stream.Readable {
        // create output stream
        this.stream = new stream.Readable({objectMode: true});
        this.stream._read = () => {};
        this.fetchTypes();
        return this.stream;
    }

    getName(): string {
        return 'SocioCortexExtractor';
    }

    getConfiguration(): SyncPipes.IServiceConfiguration {
        return new Configuration();
    }

    setConfiguration(config: SyncPipes.IServiceConfiguration): void {
        this.config = <Configuration>config;
    }

    /**
     * Return the schema which can be extracted
     *
     * @return {Schema}
     */
    getSchema(config): SyncPipes.ISchema {
        this.setConfiguration(config);
        return this.schema;
    }

    /**
     * Fetch all repositores and issues
     *
     * @param next
     */
    private fetchTypes() {
        if (this.stream === null || this.stream === undefined) {
            throw new Error('No output stream available');
        } else {
            this.handleRequests(this.config.url + "/workspaces").then((workspaces) => {
                for(var w=0; w<workspaces.length; w++) {
                    if(workspaces[w].name === this.config.workspace) {
                        this.handleRequests(this.config.url + "/workspaces/" + workspaces[w].id + "/entityTypes").then((types) => {
                            var p = [];
                            var allTypes = [];
                            for(var i = 0; i < types.length; i++) {
                                p.push(this.handleRequests(types[i].href).then((type) => {
                                    allTypes.push(type);
                                }));
                            }

                            Promise.all(p).then(() => {
                                this.stream.push(allTypes);
                                this.stream.push(null);
                            }).catch((err) => {
                                console.error(err);
                            });
                        });
                    }
                }
            });
        }
    }

    private handleRequests(url: string) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.client.get(url, (data, response) => {
                resolve(data);
            });
        });
    }

}
