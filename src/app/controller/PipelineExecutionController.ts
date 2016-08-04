import {Request, Response} from 'express';
import { AbstractController, RoutePrefix, Route } from "./Controller";

// models
import { PipelineExecution } from '../model/PipelineExecution'

@RoutePrefix('/pipeline-executions')
export class PipelineExecutionController extends AbstractController {

    @Route('/', 'GET')
    index(request: Request, response: Response) {

        let limit = parseInt(request.query.limit) || 100;
        let page = parseInt(request.query.page) || 1;
        let order = request.query.order || '-started';

        PipelineExecution.count({}, (err, count) => {
            PipelineExecution.find({})
                .select('-log')
                .limit(limit)
                .skip(limit*(page-1))
                .sort((order.startsWith('pipeline.') ? null : order))
                .populate({path: 'pipeline', options: {sort: (order.startsWith('pipeline.') ? order.replace('pipeline.', '') : null)}})
                .exec().then((result) => {
                    response.json({
                        meta: {
                            total: count,
                            limit: limit,
                            page: page,
                        },
                        list: result
                    });
                });
        });
    }

    @Route('/:id', 'GET')
    view(request: Request, response: Response) {
        PipelineExecution.findOne({"_id": request.params.id}).populate('pipeline').exec().then((document) => {
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

