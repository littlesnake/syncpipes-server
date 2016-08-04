import * as mongoose from 'mongoose';

var PropertyMappingSchema = new mongoose.Schema({
    fromPath: {
        type: String,
        required: true
    },
    toPath: {
        type: String,
        required: true
    },
    primaryKey: {
        type: Boolean,
        "default": false,
    },
    uniqueKey: {
        type: Boolean,
        "default": false,
    },
    foreignKey: {
        type: String,
        "default": null,
    }
});

var MappingGroupSchema = new mongoose.Schema({
    toPrefix: {
        type: String,
        required: true
    },
    properties: [PropertyMappingSchema],
});

var MappingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    extractorService: {
        type: String,
        required: true
    },
    loaderService: {
        type: String,
        required: true
    },
    groups: [MappingGroupSchema],
    created: {
        type: Date,
        "default": Date.now
    },
    updated: {
        type: Date,
        "default": null
    }
}).pre('save', function (next) {
    this.updated = new Date();
    next();
});

export interface IPropertyMapping extends mongoose.Document {
    fromPath: string;
    toPath: string;
    primaryKey: boolean;
    uniqueKey: boolean;
    foreignKey: string;
}

export interface IMappingGroup extends mongoose.Document {
    toPrefix: string,
    properties: Array<IPropertyMapping>;
}

export interface IMapping extends mongoose.Document {
    name: string,
    extractorService: string;
    loaderService: string;
    groups: Array<IMappingGroup>;
    created: Date;
    updated: Date;
}

export var Mapping: mongoose.Model<IMapping> = mongoose.model<IMapping>('Mapping', MappingSchema);
