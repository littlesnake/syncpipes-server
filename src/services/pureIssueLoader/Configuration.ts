import { IServiceConfiguration, ISchema, Schema } from "../../app/index";

/**
 * MySQL Configuration for this extension
 */
export class Configuration implements IServiceConfiguration {

    /**
     * MySQL Host, default: "localhost"
     */
    public host: string;

    /**
     * MySQL Port, default: 3306
     */
    public port: number;

    /**
     * MySQL User, default: "root"
     */
    public user: string;

    /**
     * MySQL Password, default: ""
     */
    public password: string;

    /**
     * MySQL Database
     */
    public database: string;

    /**
     *
     * @return {{host: string, port: number, user: string, password: string, database: string}}
     */
    store(): Object {
        return {
            "host": this.host || 'localhost',
            "port": this.port || 3306,
            "user": this.user || 'root',
            "password": this.password || '',
            "database": this.database,
            "multipleStatements": true,
            "charset": "utf8mb4"
        };
    }

    /**
     *
     * @param host
     * @param port
     * @param user
     * @param password
     * @param database
     */
    load({host, port, user, password, database}): void {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
    }


    getSchema(): ISchema {
        return Schema.createFromObject({
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "properties": {
                "host": {
                    "type": "string",
                    "default": "localhost"
                },
                "port": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 65535,
                    "default": 3306
                },
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "database": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "host",
                "port",
                "username",
                "password",
                "database"
            ]
        });
    }
}
