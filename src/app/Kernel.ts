// external dependencies
import 'reflect-metadata';
import * as express from 'express';
import bodyParser = require('body-parser');
import cors = require('cors');
import mongoose = require('mongoose');
// ioc container
import { Container } from './inversify.conf';
// internal
import { IService } from './service/Service';
// provider
import { IServiceManager } from './provider/ServiceManager';
import { IJobSchedulerConfig, IJobScheduler } from './provider/JobScheduler';
// controllers
import { AbstractController } from "./controller/Controller";
import { ServiceController } from './controller/ServiceController';
import { PipelineController } from "./controller/PipelineController";
import { MappingController } from "./controller/MappingController";
import { PipelineExecutionController } from "./controller/PipelineExecutionController";


export interface IAppConfig {
    port: number;
    mongo: {
        url: string
    };
    rabbitmq: IJobSchedulerConfig
}
/**
 * Abstract application kernel
 */
export class Kernel {

    private app: express.Application;

    private config: IAppConfig;

    private port: number;

    private router: express.Router;

    constructor(appConfig: IAppConfig) {
        this.config = appConfig;
    }

    /**
     * Boot the Kernel and connect to all relevant services like MongoDB and RabbitMQ
     *
     * @return {Promise<any>}
     */
    public boot(): Promise<any> {
        // connect to mongo
        mongoose.connect(this.config.mongo.url);
        mongoose.Promise = global.Promise;
        // config scheduler
        let scheduler = Container.get<IJobScheduler>('scheduler');
        return scheduler.configure(this.config.rabbitmq);
    }

    /**
     * Load a third party service and make it available to the application
     *
     * @param service
     */
    public loadService(service: IService) {
        let services = Container.get<IServiceManager>('services');
        services.load(service);
    }

    /**
     * Execute the Kernel as HTTP Server
     *
     * @return {http.Server}
     */
    public server() {
        this.app = express();
        // body parser for json middleware
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.router = express.Router();
        this.app.use('/api/v1', this.router);
        // load controllers
        this.loadController(new ServiceController());
        this.loadController(new PipelineController());
        this.loadController(new MappingController());
        this.loadController(new PipelineExecutionController());
        // start app
        return this.app.listen(this.config.port, () => {
            console.log('SyncPipes is running on port:' + this.config.port);
        });
    }

    /**
     * Execute the Kernel as worker
     */
    public worker() {
        let scheduler = Container.get<IJobScheduler>('scheduler');
        scheduler.consume();
    }

    /**
     * Load a controller by using the class decorators and create routing configuration
     *
     * @param controller
     */
    private loadController(controller: AbstractController) {
        controller.setContainer(Container);
        if (Reflect.hasOwnMetadata('route:prefix', controller.constructor)) {
            // get the prefix
            let prefix = Reflect.getMetadata('route:prefix', controller.constructor);
            // loop over methods
            let props = Object.getOwnPropertyNames(controller.constructor.prototype);
            for (let prop of props) {
                if (Reflect.hasOwnMetadata('route:path', controller.constructor.prototype, prop) &&
                    Reflect.hasOwnMetadata('route:method', controller.constructor.prototype, prop)) {
                    // get path an method
                    let path = Reflect.getMetadata('route:path', controller.constructor.prototype, prop);
                    let method = Reflect.getMetadata('route:method', controller.constructor.prototype, prop).toLowerCase();
                    // register route
                    if (['all', 'get', 'post', 'put', 'patch', 'head', 'delete'].indexOf(method) !== -1) {
                        this.router[method](prefix + path, (req, res) => {
                            controller[prop](req, res);
                        });
                    }
                }
            }
        }
    }
}

