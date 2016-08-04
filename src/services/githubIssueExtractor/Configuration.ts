import { IServiceConfiguration, ISchema, Schema } from "../../app/index";
/**
 * MySQL Configuration for this extension
 */
export class Configuration implements IServiceConfiguration {

    private _url: string;

    private _username: string;

    private _token: string;

    private _organisation: string;

    get url(): string {
        return this._url;
    }

    get username(): string {
        return this._username;
    }

    get token(): string {
        return this._token;
    }

    get organisation(): string {
        return this._organisation;
    }

    getSchema(): ISchema {
        return Schema.createFromObject({
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "description": "Url",
                    "default": "https://api.github.com"
                },
                "username": {
                    "type": "string",
                    "description": "GitHub Username",
                },
                "token": {
                    "type": "string",
                    "description": "GitHub Personal Access Token",
                },
                "organisation": {
                    "type": "string",
                    "description": "GitHub Organisation",
                }
            },
            "additionalProperties": false,
            "required": [
                "url",
                "username",
                "token",
                "org",
            ]
        });
    }

    store(): Object {
        return {
            "url": this._url,
            "username": this._username,
            "token": this._token,
            "organisation": this._organisation
        };
    }

    load({url, username, token, organisation}): void {
        this._url = url;
        this._username = username;
        this._token = token;
        this._organisation = organisation;
    }
}
