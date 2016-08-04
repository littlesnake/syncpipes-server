import * as stream from 'stream';
import { ISchema } from './Schema';
import { IPipeline } from "../model/Pipeline";
import { ILogger } from "./Logger";

export interface IServiceConfiguration {
    getSchema(): ISchema;
    store(): Object;
    load(config: Object): void;
}

export interface IService {
    getName(): string;
    getConfiguration(): IServiceConfiguration;
    setConfiguration(config: IServiceConfiguration): void;
    getSchema(): ISchema;
    getSchema(config): ISchema;
    prepare(context: IPipelineContext, logger: ILogger): Promise<any>;
}
// Fetch vs. Pull vs. Active
export enum ExtractorServiceType {Active, Passive}

export interface IExtractorService extends IService {
    extract(): stream.Readable;
    getType(): ExtractorServiceType;
}

export interface ILoaderService extends IService {
    load(): stream.Writable
}

export interface IPipelineContext {
    pipeline: IPipeline;
    inputData: Array<Buffer>;
}

/**
 * Execution context for pipeline with is passed to prepare method of the extension
 */
export class PipelineContext implements IPipelineContext {

    private _pipeline: IPipeline;

    private _inputData: Array<Buffer>;
    
    private _executionID: string;

    constructor(pipeline: IPipeline, inputData: Array<Buffer> = null, executionID: string = null) {
        this.pipeline = pipeline;
        this.inputData = inputData || [];
        this._executionID = executionID;
    }

    get pipeline(): IPipeline {
        return this._pipeline;
    }

    set pipeline(pipeline: IPipeline) {
        this._pipeline = pipeline;
    }

    /**
     * getInputData returns the input data for a push pipeline, and null for a pull pipeline
     */
    get inputData(): Array<Buffer> {
        return this._inputData;
    }

    set inputData(data: Array<Buffer>) {
        this._inputData = data;
    }
    
    get executionID(): string {
        return this._executionID;
    }
    
    set executionID(id: string) {
        this._executionID = id;
    }

    static createFromJson(raw: string) {
        let obj = JSON.parse(raw, (key, value) => {
            if (value && value.type === 'Buffer') {
                return new Buffer(value.data)
            }
            return value;
        });

        return new PipelineContext(obj.pipeline, obj.data, obj.executionID);
    }
}


