import 'mocha';
import * as chai from 'chai'
import * as ObjectAccess from './ObjectAccess'

// test object access
describe('Object access test', () => {

    describe('ObjectAccess.at', () => {
        it('should work with plain objects', (done) => {


            let obj = {
                "level0": {
                    "propA": 1,
                    "propB": true,
                    "propC": "value",
                    "level1": {
                        "propA": 2,
                        "propB": false,
                        "propC": "value1",
                        "level2": {
                            "propA": 3,
                            "propB": null,
                            "propC": [1, 2, 3],
                        }
                    }
                }
            };

            chai.expect(ObjectAccess.at(obj, "level0")).to.eql([obj.level0]);
            chai.expect(ObjectAccess.at(obj, "level0/propA")).to.eql([obj.level0.propA]);
            chai.expect(ObjectAccess.at(obj, "level0/propB")).to.eql([obj.level0.propB]);
            chai.expect(ObjectAccess.at(obj, "level0/level1/propA")).to.eql([obj.level0.level1.propA]);
            chai.expect(ObjectAccess.at(obj, "level0/level1/level2/propC")).to.eql([obj.level0.level1.level2.propC]);

            done();
        });


        it('should work with complex objects', (done) => {


            let obj = {
                "list": [
                    {
                        "name": "Item 1",
                        "list": [
                            {
                                "name": "Item 1.1",
                                "list": [
                                    {
                                        "name": "Item 1.1.1",
                                        "values": [1, 2, 3]
                                    },
                                    {
                                        "name": "Item 1.1.2",
                                        "values": [1, 2, 3]
                                    },
                                    {
                                        "name": "Item 1.1.3",
                                        "values": [1, 2, 3]
                                    }
                                ]
                            },
                            {
                                "name": "Item 1.2",
                                "list": [
                                    {
                                        "name": "Item 1.2.1",
                                        "values": [1, 2, 3]
                                    },
                                    {
                                        "name": "Item 1.2.2",
                                        "values": [1, 2, 3]
                                    },
                                    {
                                        "name": "Item 1.2.3",
                                        "values": [1, 2, 3]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Item 2",
                        "list": [
                            {
                                "name": "Item 2.1",
                                "list": [
                                    {
                                        "name": "Item 2.1.1",
                                        "values": [1, 2, 3]
                                    },
                                    {
                                        "name": "Item 2.1.2",
                                        "values": [1, 2, 3]
                                    },
                                    {
                                        "name": "Item 2.1.3",
                                        "values": [1, 2, 3]
                                    }
                                ]
                            },
                            {
                                "name": "Item 2.2",
                                "list": [
                                    {
                                        "name": "Item 2.2.1",
                                        "values": [1, 2, 3]
                                    },
                                    {
                                        "name": "Item 2.2.2",
                                        "values": [1, 2, 3]
                                    },
                                    {
                                        "name": "Item 2.2.3",
                                        "values": [1, 2, 3]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            chai.expect(ObjectAccess.at(obj, "list")).to.eql(obj.list);


            chai.expect(ObjectAccess.at(obj, "list/list")).to.eql([
                obj.list[0].list[0],
                obj.list[0].list[1],
                obj.list[1].list[0],
                obj.list[1].list[1],
            ]);


            // scalar values
            chai.expect(ObjectAccess.at(obj, "list/name")).to.eql([
                "Item 1",
                "Item 2"
            ]);

            chai.expect(ObjectAccess.at(obj, "list/list/list/name")).to.eql([
                "Item 1.1.1",
                "Item 1.1.2",
                "Item 1.1.3",
                "Item 1.2.1",
                "Item 1.2.2",
                "Item 1.2.3",
                "Item 2.1.1",
                "Item 2.1.2",
                "Item 2.1.3",
                "Item 2.2.1",
                "Item 2.2.2",
                "Item 2.2.3",
            ]);
            chai.expect(ObjectAccess.at(obj, "list/list/list/values")).to.eql([
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
            ]);

            done();
        });

    });

    describe('ObjectAccess.where', () => {
        it('should work with top level objects', (done) => {


            let obj = {
                "projects": [
                    {
                        "id": 1,
                        "name": "P1",
                        "issues": [
                            {
                                "id": 1,
                                "title": "Issue1"
                            },
                            {
                                "id": 2,
                                "title": "Issue2"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "name": "P1",
                        "issues": [
                            {
                                "id": 3,
                                "title": "Issue1"
                            },
                            {
                                "id": 4,
                                "title": "Issue2"
                            }
                        ]
                    }
                ]
            };
            chai.expect(ObjectAccess.where(obj, "projects/issues", "id", 2)).to.eql([obj.projects[0].issues[1]]);
            chai.expect(ObjectAccess.where(obj, "projects", "id", 1)).to.eql([obj.projects[0]]);



            done();
        });


        it('should work with top level arrays', (done) => {


            let obj = [
                {
                    "id": 1,
                    "project": {
                        "name": "SyncPipes REST"
                    }
                },
                {
                    "id": 2,
                    "project": {
                        "name": "SyncPipes GUI"
                    }
                },
                {
                    "id": 3,
                    "project": {
                        "name": "SyncPipes Documentation"
                    }
                }
            ];
            chai.expect(ObjectAccess.where(obj, "", "id", 2)).to.eql([obj[1]]);

            done();
        });

    });

});
