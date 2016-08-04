import * as mongoose from 'mongoose';

export interface IServiceConfig extends mongoose.Document {
    name: string,
    service: string,
    config: any,
    created: Date;
    updated: Date;
}

var ServiceConfigSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    config: mongoose.Schema.Types.Mixed,
    created: {
        type: Date,
        "default": Date.now
    },
    updated: {
        type: Date,
        "default": Date.now
    }
}, {collection: 'service_configurations'}).pre('save', function (next) {
    this.updated = new Date();
    next();
});

export var ServiceConfig: mongoose.Model<IServiceConfig> = mongoose.model<IServiceConfig>('ServiceConfig', ServiceConfigSchema);
