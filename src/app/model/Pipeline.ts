import * as mongoose from 'mongoose';
import { IServiceConfig } from "./ServiceConfig";
import { IMapping } from "./Mapping";

export interface IPipeline extends mongoose.Document {
    name: string,
    extractorConfig: IServiceConfig
    loaderConfig: IServiceConfig
    mapping: IMapping
    created: Date;
    updated: Date;
}

var PipelineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    extractorConfig: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceConfig",
        required: true
    },
    loaderConfig: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceConfig",
        required: true
    },
    mapping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mapping",
        required: true
    },
    lastExecuted: Date,
    created: {
        type: Date,
        "default": Date.now
    },
    updated: {
        type: Date,
        "default": Date.now
    }
}).pre('save', function (next) {
    this.updated = new Date();
    next();
});

export var Pipeline: mongoose.Model<IPipeline> = mongoose.model<IPipeline>('Pipeline', PipelineSchema);


