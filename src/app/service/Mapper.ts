import * as stream from 'stream';
import ajv = require('ajv');
// internal

import { GraphTransformer } from "../helper/GraphTransformer";
import { ISchema } from "./Schema";
import { IMapping } from "../model/Mapping";


/**
 * Base interface for all mappers
 */
export interface IMapper {
    prepare(sourceSchema: Object, targetSchema: Object, mapping: IMapping);
    _transform(chunk: any, encoding: string, callback: Function): void;
}



export class TrivialMapper extends stream.Transform implements IMapper {

    private transformer: GraphTransformer;

    constructor() {
        super({objectMode: true});
    }

    prepare(sourceSchema: ISchema, targetSchema: ISchema, mapping: IMapping) {
        this.transformer = new GraphTransformer(sourceSchema, targetSchema, mapping);
    }

    _transform(chunk: any, encoding: string, callback: Function): void {
        // check if not null or undefined
        if (!chunk) {
            return null;
        }
        try {
            let dest = this.transformer.transform(chunk);
            this.push(dest);
            callback();
        } catch (e) {
            callback(e);
        }
    }
}
