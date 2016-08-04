import 'mocha';
import * as chai from 'chai'

import { PipelineContext, Pipeline, ConsoleLogger, IPipeline, IServiceConfig } from "../../../../app/index";
import { SocioCortexTypesExtractorService } from './../typesService'

var assert = require('chai').assert;

// test mapper
describe('SocioCortexTypesExtractor test', () => {

    describe('SocioCortexTypesExtractor.extract', () => {

        beforeEach(function () {
            this.typeName = "Product";
            this.types = [];
            this.service = null;

            // create fake pipeline
            let pipeline = <IPipeline>{
                extractorConfig: <IServiceConfig>{
                    config: {
                        "url" : "https://server.sociocortex.com/api/v1",
                        "username" : "mail@gmail.com",
                        "password" : "password",
                        "workspace": "Northwind"
                    }
                }
            };

            // create logger
            this.logger = new ConsoleLogger();

            // create execution context
            this.context = new PipelineContext(pipeline, null);

            // create service
            this.service = new SocioCortexTypesExtractorService();
        });

        it('should extract type with given name', function(done) {
            // disable test timeout
            this.timeout(0);

            // prepare
            this.service.prepare(this.context, this.logger).then(() => {
                let stream = this.service.extract();

                stream.on('data', (chunk) => {
                    this.types = chunk;
                });

                // handle end
                stream.on('end', () => {
                    console.log(this.types.length);
                    for(var i = 0; i < this.types.length; i++) {
                        if(this.types[i].name === this.typeName) {
                            done();
                        }
                    }
                });
                // error handling
                stream.on('error', (err) => {
                    this.logger.error("Stream error", err);
                    done();
                });
            });
        });
    });
});
