import 'mocha';
import * as chai from 'chai'

import { GraphTransformer } from './GraphTransformer';
import { Schema } from '../service/Schema';
import { IMapping, IMappingGroup, IPropertyMapping } from '../model/Mapping';


const sourceSchema = Schema.createFromObject({
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

const targetSchema = Schema.createFromObject({
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
                    }
                },
                "required": [
                    "id",
                    "name"
                ]
            }
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
                    "project_id": {
                        "type": "integer"
                    },
                    "author_id": {
                        "type": "integer"
                    }
                },
                "required": [
                    "id",
                    "title",
                    "body",
                    "project_id",
                    "author_id"
                ]
            }
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
                    "issue_id": {
                        "type": "integer"
                    },
                    "author_id": {
                        "type": "integer"
                    }
                },
                "required": [
                    "id",
                    "body",
                    "issue_id",
                    "author_id"
                ]
            }
        },
        "users": {
            "type": "array",
            "items": {
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
    },
    "required": [
        "projects",
        "issues",
        "comments",
        "users"
    ]
});

const mappingForward = <IMapping>{
    _id: null,
    name: "Test",
    extractorService: "TestExtractor",
    loaderService: "TestLoader",
    groups: [
        // projects
        groupMapping(
            "projects",
            propertyMapping("projects/id", "projects/id", true, true),
            propertyMapping("projects/name", "projects/name")
        ),

        // issues
        groupMapping(
            "issues",
            propertyMapping("projects/issues/id", "issues/id", true, true),
            propertyMapping("projects/issues/title", "issues/title"),
            propertyMapping("projects/issues/body", "issues/body"),
            propertyMapping("projects/id", "issues/project_id"),
            propertyMapping("projects/issues/author/id", "issues/author_id")
        ),

        // comments
        groupMapping(
            "comments",
            propertyMapping("projects/issues/comments/id", "comments/id", true, true),
            propertyMapping("projects/issues/comments/body", "comments/body"),
            propertyMapping("projects/issues/id", "comments/issue_id"),
            propertyMapping("projects/issues/comments/author/id", "comments/author_id")
        ),
        // users
        groupMapping(
            "users",
            propertyMapping("projects/issues/author/id", "users/id", true, true),
            propertyMapping("projects/issues/author/username", "users/username"),
            propertyMapping("projects/issues/author/gender", "users/gender"),
            propertyMapping("projects/issues/comments/author/id", "users/id", true, true),
            propertyMapping("projects/issues/comments/author/username", "users/username"),
            propertyMapping("projects/issues/comments/author/gender", "users/gender")
        )
    ],
    created: new Date(),
    updated: null,
};

const mappingReverse = <IMapping>{
    _id: null,
    name: "TestReverse",
    extractorService: "TestExtractor",
    loaderService: "TestLoader",
    groups: [

        // issues
        groupMapping(
            "projects/issues",
            propertyMapping("issues/id", "projects/issues/id", true, true),
            propertyMapping("issues/title", "projects/issues/title"),
            propertyMapping("issues/body", "projects/issues/body"),
            propertyMapping("issues/project_id", "projects/issues/$foreignKey", false, true, "projects/id")
        ),

        // projects
        groupMapping(
            "projects",
            propertyMapping("projects/id", "projects/id", true, true),
            propertyMapping("projects/name", "projects/name")
        ),

        groupMapping(
            "projects/issues/author",
            propertyMapping("issues/author_id", "projects/issues/author/id"),
            propertyMapping("issues/id", "projects/issues/author/$foreignKey", false, false, "projects/issues/id")
        ),

        // comments
        groupMapping(
            "projects/issues/comments",
            propertyMapping("comments/id",       "projects/issues/comments/id", true , true),
            propertyMapping("comments/body",     "projects/issues/comments/body"),
            propertyMapping("comments/issue_id", "projects/issues/comments/$foreignKey", false, false, "projects/issues/id")
        ),

        groupMapping(
            "projects/issues/comments/author",
            propertyMapping("comments/author_id", "projects/issues/comments/author/id", true, true),
            propertyMapping("comments/id",        "projects/issues/comments/author/$foreignKey", false, false, "projects/issues/comments/id")
        ),

        // users
        groupMapping(
            "projects/issues/author",
            propertyMapping("users/username", "projects/issues/author/username"),
            propertyMapping("users/gender",   "projects/issues/author/gender"),
            propertyMapping("users/id",       "projects/issues/author/$foreignKey", false, false, "projects/issues/author/id")
        ),

        groupMapping(
            "projects/issues/comments/author",
            propertyMapping("users/username", "projects/issues/comments/author/username"),
            propertyMapping("users/gender",   "projects/issues/comments/author/gender"),
            propertyMapping("users/id",       "projects/issues/comments/author/$foreignKey", false, false, "projects/issues/comments/author/id")
        )

    ],
    created: new Date(),
    updated: null,
};

export function groupMapping(toPrefix: string, ...properties: IPropertyMapping[]): IMappingGroup {
    return <IMappingGroup>{
        toPrefix: toPrefix,
        properties: properties
    };
}

export function propertyMapping(fPath: string, tPath: string, primary: boolean = false, unique: boolean = false, foreignKey: string = null): IPropertyMapping {
    return <IPropertyMapping>{
        _id: null,
        fromPath: fPath,
        toPath: tPath,
        primaryKey: primary,
        uniqueKey: unique,
        foreignKey: foreignKey
    };
}

const sourceObj = {
    "projects": [
        {
            "id": 1,
            "name": "Project A",
            "issues": [
                {
                    "id": 1,
                    "title": "Mapper is not working",
                    "body": "The mapper is not working",
                    "author": {
                        "id": 1,
                        "username": "test.user1",
                        "gender": "male"
                    },
                    "comments": [
                        {
                            "id": 1,
                            "body": "Its working for me",
                            "author": {
                                "id": 2,
                                "username": "test.user2",
                                "gender": "male"
                            }
                        },
                        {
                            "id": 2,
                            "body": "Its working for me too",
                            "author": {
                                "id": 3,
                                "username": "test.user3",
                                "gender": "female"
                            }
                        },
                        {
                            "id": 3,
                            "body": "Dependencies installed, works now",
                            "author": {
                                "id": 1,
                                "username": "test.user1",
                                "gender": "male"
                            }
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "Use ZeroMQ instead of RabbitMQ?",
                    "body": "Is it possible to use ZeroMQ instead of RabbitMQ?",
                    "author": {
                        "id": 3,
                        "username": "test.user3",
                        "gender": "female"
                    },
                    "comments": [
                        {
                            "id": 4,
                            "body": "I don't think so",
                            "author": {
                                "id": 2,
                                "username": "test.user2",
                                "gender": "male"
                            }
                        },
                        {
                            "id": 5,
                            "body": "It is possible!",
                            "author": {
                                "id": 1,
                                "username": "test.user1",
                                "gender": "male"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "Project B",
            "issues": [
                {
                    "id": 3,
                    "title": "Integrate CI & CD",
                    "body": "Integrate CI and CD tools for this project",
                    "author": {
                        "id": 2,
                        "username": "test.user2",
                        "gender": "male"
                    },
                    "comments": [
                        {
                            "id": 6,
                            "body": "I've been waiting for this!",
                            "author": {
                                "id": 1,
                                "username": "test.user1",
                                "gender": "male"
                            }
                        },
                        {
                            "id": 7,
                            "body": "Mee to0!",
                            "author": {
                                "id": 3,
                                "username": "test.user3",
                                "gender": "female"
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

const targetObj = {
    "projects": [
        {
            "id": 1,
            "name": "Project A"
        },
        {
            "id": 2,
            "name": "Project B"
        }
    ],
    "issues": [
        {
            "id": 1,
            "title": "Mapper is not working",
            "body": "The mapper is not working",
            "project_id": 1,
            "author_id": 1
        },
        {
            "id": 2,
            "title": "Use ZeroMQ instead of RabbitMQ?",
            "body": "Is it possible to use ZeroMQ instead of RabbitMQ?",
            "project_id": 1,
            "author_id": 3
        },
        {
            "id": 3,
            "title": "Integrate CI & CD",
            "body": "Integrate CI and CD tools for this project",
            "project_id": 2,
            "author_id": 2
        }
    ],
    "comments": [
        {
            "id": 1,
            "body": "Its working for me",
            "issue_id": 1,
            "author_id": 2
        },
        {
            "id": 2,
            "body": "Its working for me too",
            "issue_id": 1,
            "author_id": 3
        },
        {
            "id": 3,
            "body": "Dependencies installed, works now",
            "issue_id": 1,
            "author_id": 1
        },
        {
            "id": 4,
            "body": "I don't think so",
            "issue_id": 2,
            "author_id": 2
        },
        {
            "id": 5,
            "body": "It is possible!",
            "issue_id": 2,
            "author_id": 1
        },
        {
            "id": 6,
            "body": "I've been waiting for this!",
            "issue_id": 3,
            "author_id": 1
        },
        {
            "id": 7,
            "body": "Mee to0!",
            "issue_id": 3,
            "author_id": 3
        }
    ],
    "users": [
        {
            "id": 1,
            "username": "test.user1",
            "gender": "male"
        },
        {
            "id": 2,
            "username": "test.user2",
            "gender": "male"
        },
        {
            "id": 3,
            "username": "test.user3",
            "gender": "female"
        }
    ]
};

// test mapper
describe('Mapper test', () => {
    describe('GraphTransformer.transform', () => {

        it('should be transformed', (done) => {
            // transforming forward
            let transformer = new GraphTransformer(sourceSchema, targetSchema, mappingForward);
            chai.expect(transformer.transform(sourceObj)).to.eql(targetObj);

            done();
        });

        it('should reverse transformation', (done) => {
            // transforming reverse
            let transformer = new GraphTransformer(targetSchema, sourceSchema, mappingReverse);
            chai.expect(transformer.transform(targetObj)).to.eql(sourceObj);



            done();
        });

        it('should transform top level arrays', (done) => {
            // top level array
            let sourceTLA = [
                {
                    "id": 1,
                    "velocity": "Good",
                    "repository": "SyncPipes REST"
                },
                {
                    "id": 2,
                    "velocity": "Bad",
                    "repository": "SyncPipes GUI"
                },
                {
                    "id": 3,
                    "velocity": "Worst",
                    "repository": "SyncPipes Documentation"
                }
            ];

            let targetTLA = [
                {
                    "id": 1,
                    "project": {
                        "name": "SyncPipes REST",
                        "velocity": "Good",
                    }
                },
                {
                    "id": 2,
                    "project": {
                        "name": "SyncPipes GUI",
                        "velocity": "Bad",
                    }
                },
                {
                    "id": 3,
                    "project": {
                        "name": "SyncPipes Documentation",
                        "velocity": "Worst",
                    }
                }
            ];

            // define mapping
            let mapping = <IMapping>{
                _id: null,
                name: "TLA",
                extractorService: "TestExtractor",
                loaderService: "TestLoader",
                groups: [
                    // id
                    groupMapping(
                        "",
                        propertyMapping("id", "id", true, true)
                    ),
                    // projects

                    groupMapping(
                        "project",
                        propertyMapping("repository", "project/name"),
                        propertyMapping("velocity", "project/velocity"),
                        propertyMapping("id", "project/$foreignKey", false, true, "id")
                    ),

                ],
                created: new Date(),
                updated: null,
            };

            let schemaSourceTLA = Schema.createFromObject({
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "repository": {
                            "type": "string"
                        },
                        "velocity": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "id",
                        "repository",
                        "velocity"
                    ]
                }
            });

            let schemaTargetTLA = Schema.createFromObject({
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "project": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "velocity": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "name",
                                "velocity"
                            ]
                        }
                    },
                    "required": [
                        "id",
                        "project"
                    ]
                }
            });


            let transformer = new GraphTransformer(schemaSourceTLA, schemaTargetTLA, mapping);
            chai.expect(transformer.transform(sourceTLA)).to.eql(targetTLA);

            done();

        });

        it('should transform top level arrays to normalized objects', (done) => {
            // top level array
            let sourceTLA = [
                {
                    "id": 1,
                    "velocity": "Good",
                    "repository": "SyncPipes REST",
                    "issues": [
                        {
                            "id": 1000,
                            "number": 1,
                            "title": "Title 1000"
                        },
                        {
                            "id": 1001,
                            "number": 2,
                            "title": "Title 1001"
                        },
                        {
                            "id": 1002,
                            "number": 3,
                            "title": "Title 1002"
                        }
                    ]
                },
                {
                    "id": 2,
                    "velocity": "Bad",
                    "repository": "SyncPipes GUI",
                    "issues": [
                        {
                            "id": 1003,
                            "number": 1,
                            "title": "Title 1003"
                        },
                        {
                            "id": 1004,
                            "number": 2,
                            "title": "Title 1004"
                        },
                        {
                            "id": 1005,
                            "number": 3,
                            "title": "Title 1005"
                        }
                    ]
                },
                {
                    "id": 3,
                    "velocity": "Worst",
                    "repository": "SyncPipes Documentation",
                    "issues": [
                        {
                            "id": 1006,
                            "number": 1,
                            "title": "Title 1006"
                        },
                        {
                            "id": 1007,
                            "number": 2,
                            "title": "Title 1007"
                        },
                        {
                            "id": 1008,
                            "number": 3,
                            "title": "Title 1009"
                        }
                    ]
                }
            ];

            let targetTLA = {
                "projects": [
                    {
                        "id": 1,
                        "velocity": "Good",
                        "repository": "SyncPipes REST"
                    },
                    {
                        "id": 2,
                        "velocity": "Bad",
                        "repository": "SyncPipes GUI"
                    },
                    {
                        "id": 3,
                        "velocity": "Worst",
                        "repository": "SyncPipes Documentation"
                    }
                ],
                "issues": [
                    {
                        "id": 1000,
                        "project_id": 1,
                        "number": 1,
                        "title": "Title 1000"
                    },
                    {
                        "id": 1001,
                        "project_id": 1,
                        "number": 2,
                        "title": "Title 1001"
                    },
                    {
                        "id": 1002,
                        "project_id": 1,
                        "number": 3,
                        "title": "Title 1002"
                    },
                    {
                        "id": 1003,
                        "project_id": 2,
                        "number": 1,
                        "title": "Title 1003"
                    },
                    {
                        "id": 1004,
                        "project_id": 2,
                        "number": 2,
                        "title": "Title 1004"
                    },
                    {
                        "id": 1005,
                        "project_id": 2,
                        "number": 3,
                        "title": "Title 1005"
                    },
                    {
                        "id": 1006,
                        "project_id": 3,
                        "number": 1,
                        "title": "Title 1006"
                    },
                    {
                        "id": 1007,
                        "project_id": 3,
                        "number": 2,
                        "title": "Title 1007"
                    },
                    {
                        "id": 1008,
                        "project_id": 3,
                        "number": 3,
                        "title": "Title 1009"
                    }
                ]
            };


            // define mapping
            let mapping = <IMapping>{
                _id: null,
                name: "TLA",
                extractorService: "TestExtractor",
                loaderService: "TestLoader",
                groups: [
                    // id

                    groupMapping(
                        "projects",
                        propertyMapping("id", "projects/id", true, true),
                        propertyMapping("repository", "projects/repository"),
                        propertyMapping("velocity", "projects/velocity")
                    ),

                    // projects

                    groupMapping(
                        "issues",
                        propertyMapping("issues/id", "issues/id"),
                        propertyMapping("issues/title", "issues/title"),
                        propertyMapping("issues/number", "issues/number"),
                        propertyMapping("id", "issues/project_id")
                    ),

                ],
                created: new Date(),
                updated: null,
            };

            let schemaSourceTLA = Schema.createFromObject({
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "velocity": {
                            "type": "string"
                        },
                        "repository": {
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
                                    "number": {
                                        "type": "integer"
                                    },
                                    "title": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "id",
                                    "title",
                                    "number"
                                ]
                            }
                        }
                    },
                    "required": [
                        "id",
                        "velocity",
                        "repository",
                        "issues"
                    ]
                }
            });

            let schemaTargetTLA = Schema.createFromObject({
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
                                "velocity": {
                                    "type": "string"
                                },
                                "repository": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "id",
                                "velocity",
                                "repository"
                            ]
                        }
                    },
                    "issues": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "integer"
                                },
                                "project_id": {
                                    "type": "integer"
                                },
                                "title": {
                                    "type": "string"
                                },
                                "number": {
                                    "type": "integer"
                                },
                            },
                            "required": [
                                "id",
                                "project_id",
                                "title",
                                "number"
                            ]
                        }
                    }
                },
                "required": [
                    "projects",
                    "issues"
                ]
            });


            let transformer = new GraphTransformer(schemaSourceTLA, schemaTargetTLA, mapping);
            chai.expect(transformer.transform(sourceTLA)).to.eql(targetTLA);

            done();

        });
    });
});

