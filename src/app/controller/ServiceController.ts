import { Request, Response } from 'express';
import { IServiceManager } from "../provider/ServiceManager";
import { AbstractController, RoutePrefix, Route } from "./Controller";
import { ServiceConfig, IServiceConfig } from '../model/ServiceConfig'

@RoutePrefix('/services')
export class ServiceController extends AbstractController {

    @Route('/', 'GET')
    index(request: Request, response: Response) {
        let list = [];
        let services = this.getService<IServiceManager>('services').all();
        for (let service of services) {
            let config = service.getConfiguration();
            list.push({
                "name": service.getName(),
                "schema": service.getSchema().toObject(),
                "config": config === null ? null : config.getSchema().toObject(),
                "type": (service['extract'] instanceof Function) ? 'extractor' : 'loader' // typescript does not support runtime interface checking
            });
        }
        response.json(list);
    }

    @Route('/:name', 'GET')
    view(request: Request, response: Response) {
        let service = this.getService<IServiceManager>('services').get(request.params.name);
        if (!service) {
            response.status(404).json({
               "error": `Service ${request.params.name} is not loaded`
            });
        } else {
            let config = service.getConfiguration();
            response.json({
                "name": service.getName(),
                "schema": service.getSchema().toObject(),
                "config": config === null ? null : config.getSchema().toObject()
            });
        }
    }

    @Route('/:name/schema.json', 'GET')
    viewSchema(request: Request, response: Response) {
        let service = this.getService<IServiceManager>('services').get(request.params.name);
        if (!service) {
            response.status(404).json({
                "error": `Service ${request.params.name} is not loaded`
            });
        } else {
            response.json(service.getSchema().toObject());
        }
    }

    @Route('/:name/:configName/schema.json', 'GET')
    viewSchema(request: Request, response: Response) {
        let service = this.getService<IServiceManager>('services').get(request.params.name);
        if (!service) {
            response.status(404).json({
                "error": `Service ${request.params.name} is not loaded`
            });
        } else {
            ServiceConfig.find({"service": service.getName()}).exec().then((documents) => {
                console.log(documents);
                for(let config of documents) {
                    if(config.name === request.params.configName) {
                        response.json(service.getSchema(config).toObject());
                    }
                }
                response.status(500).json({"error": "Cannot find config files!"})
            }, (err) => response.status(500).json(err));
        }
    }

    @Route('/:name/configs', 'GET')
    configIndex(request: Request, response: Response) {
        let service = this.getService<IServiceManager>('services').get(request.params.name);
        if (!service) {
            response.status(404).json({
                "error": `Service ${request.params.name} is not loaded`
            });
        } else {
            ServiceConfig.find({"service": service.getName()}).exec().then((documents) => {
                response.json(documents);
            }, (err) => response.status(500).json(err));
        }
    }

    @Route('/:name/configs', 'POST')
    configCreate(request: Request, response: Response) {
        let service = this.getService<IServiceManager>('services').get(request.params.name);
        if (!service) {
            response.status(404).json({
                "error": `Service ${request.params.name} is not loaded`
            });
        } else {
            let config = new ServiceConfig();
            config.service = service.getName();
            // set values from body
            config.name = request.body.name;
            config.config = request.body.config;
            // save config
            config.save((err, obj) => {
                if (err) {
                    response.status(500).json(err);
                } else {
                    response.status(201).json(obj);
                }
            });
        }
    }

    @Route('/:name/configs/:id', 'GET')
    configView(request: Request, response: Response) {
        // get service
        let service = this.getService<IServiceManager>('services').get(request.params.name);
        if (!service) {
            response.status(404).json({
                "error": `Service ${request.params.name} is not loaded`
            });
        } else {
            ServiceConfig.findOne({"_id": request.params.id, "service": service.getName()}).exec().then((document) => {
                if (document === null) {
                    this.notFound(response);
                } else {
                    response.json(document);
                }
            }, (err) => {
                response.status(500).json(err);
            });
        }
    }

    @Route('/:name/configs/:id', 'PUT')
    configUpdate(request: Request, response: Response) {
        let service = this.getService<IServiceManager>('services').get(request.params.name);
        if (!service) {
            response.status(404).json({
                "error": `Service ${request.params.name} is not loaded`
            });
        } else {
            ServiceConfig.findOne({"_id": request.params.id, "service": service.getName()}).exec().then((config: IServiceConfig) => {
                if (config === null) {
                    this.notFound(response);
                } else {
                    // update config
                    config.name = request.body.name;
                    config.config = request.body.config;
                    config.save((err, obj) => {
                        if (err) {
                            response.status(500).json(err);
                        } else {
                            response.status(200).json(obj);
                        }
                    });
                }
            }, (err) => {
                response.status(500).json(err);
            });
        }
    }

    @Route('/:name/configs/:id', 'DELETE')
    configRemove(request: Request, response: Response) {
        let service = this.getService<IServiceManager>('services').get(request.params.name);
        if (!service) {
            response.status(404).json({
                "error": `Service ${request.params.name} is not loaded`
            });
        } else {
            ServiceConfig.findByIdAndRemove(request.params.id).exec().then(() => {
                response.status(204).json(null);
            }, (err) => {
                response.status(500).json(err);
            });
        }
    }
}

