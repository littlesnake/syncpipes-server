import * as fs from 'fs';
import * as lodash from 'lodash'
import Ajv = require('ajv');

export interface ISchema {

    /**
     * Validate the schema
     */
    isValid(): boolean

    /**
     * Validate a object against the schema
     * @param obj
     */
    validateObject(obj: Object): boolean

    toObject(dereference?: boolean): any;

    partial(path: string): any;
}

/**
 * JsonSchema representation
 */
export class Schema implements ISchema {

    private schemaRaw: string;

    private schema: Object;

    private validator: Function;

    constructor(schemaRaw: string) {
        this.schemaRaw = schemaRaw;
        this.schema = JSON.parse(this.schemaRaw);
        //let ajv = new Ajv({v5: true}); // options can be passed, e.g. {allErrors: true}
       // this.validator = ajv.compile(this.schema);
    }

    public static createFromFile(filename: string): Schema {
        let content = fs.readFileSync(filename, {encoding: "utf8"});
        return new Schema(content);
    }

    public static createFromObject(schema: Object): Schema {
        return new Schema(JSON.stringify(schema));
    }

    isValid(): boolean {
        return true;
    }

    validateObject(obj: Object): boolean {
        return this.validator(obj);
    }

    toObject(dereference: boolean = false): any {
        if (dereference) {
            return Schema.dereference(this.schema, this.schema);
        }
        return this.schema
    }

    partial(path: string): any {
        // get dereferenced schema
        let currentSchema = this.toObject(true);
        // split path
        let pathBits = path.split('/');
        let currentPath = pathBits.shift();
        if (currentPath !== "") {
            while (typeof currentPath !== 'undefined') {
                // check if is valid schema
                if (!currentSchema.hasOwnProperty('type')) {
                    throw new Error('Invalid json schema');
                }
                // get sub schema
                switch (currentSchema.type) {
                    case 'array':
                        // check if property exists
                        if (!currentSchema.items.properties.hasOwnProperty(currentPath)) {
                            throw new Error(`Invalid path ${path} provided.`);
                        }
                        currentSchema = currentSchema.items.properties[currentPath];
                        break;
                    case 'object':
                        // check if property exists
                        if (!currentSchema.properties.hasOwnProperty(currentPath)) {
                            throw new Error(`Invalid path ${path} provided.`);
                        }
                        currentSchema = currentSchema.properties[currentPath];

                        break;
                    default:
                        throw new Error('Unknown JSON-Schema type' + currentSchema.type);
                }
                // get next path bit
                currentPath = pathBits.shift();
            }
        }
        
        return currentSchema;
    }

    /**
     * Resolve references
     *
     * @param schema
     * @param rootSchema
     */
    static dereference(schema: Object, rootSchema: Object) {

        //TODO: Look ahead
        for (let key in schema) {
            if (schema.hasOwnProperty(key)) {
                // only check objects
                if (lodash.isPlainObject(schema[key])) {
                    // console.log(JSON.stringify(schema, null, "  "));
                    // check if the object has a ref key
                    if (schema[key].hasOwnProperty('$ref')) {
                        schema[key] = Schema.lookup(schema[key]['$ref'], rootSchema);
                    } else {
                        // check nested objects
                        schema[key] = Schema.dereference(schema[key], rootSchema);
                    }
                }
            }
        }
        return schema;
    }

    private static lookup(path: string, schema: Object) {
        if (!path.startsWith('#/')) {
            throw new Error(`Invalid reference '${path}'. Only local references are allowed`);
        }
        path = path.replace('#/', '');
        path = path.replace('/', '.');
        let val = lodash.get(schema, path);
        if (typeof val === 'undefined') {
            throw new Error(`Reference '${path}' not found`);
        }
        return val;
    }

}
