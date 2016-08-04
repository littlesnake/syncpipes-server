import { Request, Response } from 'express';
import { IServiceManager } from "../provider/ServiceManager";
import { AbstractController, RoutePrefix, Route } from "./Controller";
import { Mapping, IMapping } from '../model/Mapping'

@RoutePrefix('/mappings')
export class MappingController extends AbstractController {

    @Route('/', 'GET')
    index(request: Request, response: Response) {
        Mapping.find({}).exec().then((documents) => {
            response.json(documents);
        });
    }

    @Route('/', 'POST')
    create(request: Request, response: Response) {
        let serviceManager = this.getService<IServiceManager>('services');
        let mapping = new Mapping();
        // validate services
        if (!serviceManager.isLoaded(request.body.extractorService)) {
            response.status(400).json({"error": `Extractor Service ${request.body.extractorService} is not loaded`});
            return;
        }
        if (!serviceManager.isLoaded(request.body.loaderService)) {
            response.status(400).json({"error": `Loader Service  ${request.body.loaderService} is not loaded`});
            return;
        }
        mapping = AbstractController.copyPropertyValues(request.body, mapping);
        mapping.save((err, obj) => {
            if (err) {
                response.status(500).json(err);
            } else {
                response.status(201).json(obj);
            }
        });
    }

    @Route('/:id', 'GET')
    view(request: Request, response: Response) {
        Mapping.findOne({"_id": request.params.id}).exec().then((document) => {
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
        let serviceManager = this.getService<IServiceManager>('services');
        // validate services
        if (!serviceManager.isLoaded(b.extractorService)) {
            response.status(400).json({"error": `Extractor Service ${b.extractorService} is not loaded`});
            return;
        }
        if (!serviceManager.isLoaded(b.loaderService)) {
            response.status(400).json({"error": `Loader Service  ${b.loaderService} is not loaded`});
            return;
        }
        // find mapping
        Mapping.findById(request.params.id).exec().then((mapping: IMapping) => {
            mapping.name = b.name;
            mapping.extractorService = b.extractorService;
            mapping.loaderService = b.loaderService;
            mapping.groups = b.groups;
            mapping.save((err, obj) => {
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
        Mapping.findByIdAndRemove(request.params.id).exec().then(() => {
            response.status(204).json(null);
        }, (err) => {
            response.status(500).json(err);
        });
    }
}

