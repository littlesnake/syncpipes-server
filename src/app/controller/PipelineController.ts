import {Request, Response, RequestHandler} from 'express';
import multer = require('multer');
import { IServiceManager } from "../provider/ServiceManager";
import { IJobScheduler } from "../provider/JobScheduler";
import { AbstractController, RoutePrefix, Route } from "./Controller";

// models
import { Pipeline, IPipeline } from '../model/Pipeline'
import { PipelineExecution, IPipelineExecution } from '../model/PipelineExecution'
import { PipelineContext, IExtractorService, ExtractorServiceType } from "../service/Service";

@RoutePrefix('/pipelines')
export class PipelineController extends AbstractController {

    private multer: RequestHandler;

    constructor() {
        super();
        // init multer middleware
        this.multer = <RequestHandler>multer({storage: multer.memoryStorage()}).array('data');
    }

    @Route('/', 'GET')
    index(request: Request, response: Response) {
        let services = this.getService<IServiceManager>('services');
        Pipeline.find({}).populate('mapping loaderConfig extractorConfig').exec().then((pipelines: any) => {
            let list = [];
            for (let p of pipelines) {
                let obj = p.toObject();
                let e = <IExtractorService>services.get(p.extractorConfig.service);
                obj.passive = (e.getType() === ExtractorServiceType.Passive);
                list.push(obj);
            }
            response.json(list);
        });
    }

    @Route('/', 'POST')
    create(request: Request, response: Response) {
        let pipeline = new Pipeline();
        pipeline = AbstractController.copyPropertyValues(request.body, pipeline);
        pipeline.save((err, obj) => {
            if (err) {
                response.status(500).json(err);
            } else {
                response.status(201).json(obj);
            }
        });
    }

    @Route('/:id', 'GET')
    view(request: Request, response: Response) {
        Pipeline.findOne({"_id": request.params.id}).populate('mapping loaderConfig extractorConfig').exec().then((document) => {
            if (document === null) {
                this.notFound(response);
            } else {
                response.json(document);
            }

        }, (err) => {
            response.status(500).json(err);
        });
    }

    @Route('/:id', 'PUT')
    update(request: Request, response: Response) {
        let b = request.body;
        // find mapping
        Pipeline.findById(request.params.id).exec().then((pipeline: IPipeline) => {
            pipeline.name = b.name;
            pipeline.mapping = b.mapping;
            pipeline.extractorConfig = b.extractorConfig;
            pipeline.loaderConfig = b.loaderConfig;
            pipeline.save((err, obj) => {
                if (err) {
                    response.status(500).json(err);
                } else {
                    response.status(200).json(obj);
                }
            });

        }, (err) => {
            response.status(500).json(err);
        });
    }

    @Route('/:id', 'DELETE')
    remove(request: Request, response: Response) {
        Pipeline.findByIdAndRemove(request.params.id).exec().then(() => {
            response.status(204).json(null);
        }, (err) => {
            response.status(500).json(err);
        });
    }

    @Route('/:id/actions/execute', 'POST')
    execute(request: Request, response: Response) {
        let scheduler = this.getService<IJobScheduler>('scheduler');
        let services = this.getService<IServiceManager>('services');
        // multer middleware
        this.multer(request, response, (err) => {
            if (err) {
                response.status(400).json(err);
            } else {
                // get mapping
                Pipeline.findOne({"_id": request.params.id}).populate('mapping loaderConfig extractorConfig').exec().then((pipeline) => {
                    if (pipeline === null) {
                        this.notFound(response);
                    } else {
                        // pipeline context
                        let context = new PipelineContext(<IPipeline>pipeline);
                        // get extension
                        let e = <IExtractorService>services.get(context.pipeline.extractorConfig.service);
                        if (!e) {
                            response.status(500).json({"error": `Service ${context.pipeline.extractorConfig.service} is not loaded`});
                        } else {
                            // check if data is provided
                            if (e.getType() === ExtractorServiceType.Passive) {
                                if (!request.is('multipart/form-data') || !request.files) {
                                    response.status(400).json({"error": "no input data provided for passive extractor"});
                                    return
                                }
                                // add files to context
                                for (let key of Reflect.ownKeys(request.files)) {
                                    if (request.files[key].buffer instanceof Buffer) {
                                        context.inputData.push(request.files[key].buffer);
                                    }
                                }
                            }
                            // create new pipeline execution
                            let pipelineExecution = new PipelineExecution();
                            pipelineExecution.status = "Queued";
                            pipelineExecution.pipeline = pipeline._id;
                            pipelineExecution.save((err, obj: IPipelineExecution) => {
                                context.executionID = obj._id;
                                scheduler.schedule(context);
                                response.json(obj);
                            });
                        }
                    }

                }, (err) => response.status(500).json(err));
            }
        });
    }

}

