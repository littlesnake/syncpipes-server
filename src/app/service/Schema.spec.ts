import 'mocha';
import * as chai from 'chai'

import { Schema } from './Schema';

const schema = Schema.createFromObject({
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "projects": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "issues": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "integer"
                                },
                                "title": {
                                    "type": "string"
                                },
                                "body": {
                                    "type": "string"
                                },
                                "author": {
                                    "$ref": "#/definitions/author"
                                },
                                "comments": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "integer"
                                            },
                                            "body": {
                                                "type": "string"
                                            },
                                            "author": {
                                                "$ref": "#/definitions/author"
                                            }
                                        },
                                        "required": [
                                            "id",
                                            "body",
                                            "author"
                                        ]
                                    }
                                }
                            },
                            "required": [
                                "id",
                                "title",
                                "body",
                                "author",
                                "comments"
                            ]
                        }
                    }
                },
                "required": [
                    "id",
                    "name",
                    "issues"
                ]
            }
        }
    },
    "required": [
        "projects"
    ],
    "definitions": {
        "author": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "username": {
                    "type": "string"
                },
                "gender": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "username",
                "gender"
            ]
        }
    }
});


// test mapper
describe('Schema test', () => {

    describe('Schema.partial', () => {
        it('should extract partial a schema', (done) => {

            // get partial schema
            let schemaRaw = schema.toObject(true);

            chai.expect(schema.partial('projects')).to.eql(schemaRaw.properties.projects);
            chai.expect(schema.partial('projects/issues')).to.eql(schemaRaw.properties.projects.items.properties.issues);
            chai.expect(schema.partial('projects/issues/comments')).to.eql(schemaRaw.properties.projects.items.properties.issues.items.properties.comments);
            chai.expect(schema.partial('projects/issues/comments/author')).to.eql(schemaRaw.properties.projects.items.properties.issues.items.properties.comments.items.properties.author);

            done();
        });

    });

});
