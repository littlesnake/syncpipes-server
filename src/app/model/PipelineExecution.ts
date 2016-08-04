import * as mongoose from 'mongoose';
import { IPipeline } from "./Pipeline";
import { ILoggerMessage } from "../service/Logger";

export interface IPipelineExecution extends mongoose.Document {
    pipeline: IPipeline
    status: string
    log: Array<ILoggerMessage>
    started: Date;
    finished: Date;
}

var LogMessageSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true
    },
    date: Date,
    message: {
        type: String,
        required: true
    },
    context: mongoose.Schema.Types.Mixed,
});

var PipelineExecutionSchema = new mongoose.Schema({
    pipeline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pipeline",
        required: true
    },
    status: String,
    log: [LogMessageSchema],
    started: {
        type: Date,
        "default": Date.now
    },
    finished: Date
}, {collection: 'pipeline_executions'});

export var PipelineExecution: mongoose.Model<IPipelineExecution> = mongoose.model<IPipelineExecution>('PipelineExecution', PipelineExecutionSchema);


