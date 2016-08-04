import { IServiceConfiguration, ISchema, Schema } from "../../app/index";
/**
 * MySQL Configuration for this extension
 */
export class Configuration implements IServiceConfiguration {

    private _url: string;

    private _username: string;

    private _password: string;

    private _workspace: string;

    get url(): string {
        return this._url;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get workspace(): string {
        return this._workspace;
    }

    setworkpsace(workspace: string): void {
        this._workspace = workspace;
    }

    getSchema(): ISchema {
        return Schema.createFromObject({
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "description": "Url",
                    "default": "https://server.sociocortex.com/api/v1"
                },
                "username": {
                    "type": "string",
                    "description": "Sociocortex Username",
                },
                "password": {
                    "type": "string",
                    "description": "Sociocortex Password",
                },
                "workspace": {
                    "type": "string",
                    "description": "Sociocortex Workspace Name",
                    "default": "Northwind"
                }
            },
            "additionalProperties": false,
            "required": [
                "url",
                "username",
                "password"
            ]
        });
    }

    store(): Object {
        return {
            "url": this._url,
            "username": this._username,
            "token": this._password
        };
    }

    load({url, username, password, workspace}): void {
        this._url = url;
        this._username = username;
        this._password = password;
        this._workspace = workspace;
    }
}
