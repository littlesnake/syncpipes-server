import 'mocha';
import * as chai from 'chai'

import { PipelineContext, Pipeline, ConsoleLogger, IPipeline, IServiceConfig } from "../../app/index";
import { GitHubIssueExtractorService } from './service'

// test mapper
describe('GithubIssueExtractor test', function() {

    describe('GithubIssueExtractor.extract', function() {
        it('should extract repositories, issues and comments', function(done) {
            // disable test timeout
            this.timeout(10000);

            // create fake pipeline
            let pipeline = <IPipeline>{
                extractorConfig: <IServiceConfig>{
                    config: {
                        "url" : "https://api.github.com",
                        //TODO: provide usr/pwd
                        "username" : "",
                        "token" : "",
                        "organisation" : ""
                    }
                }
            };

            // create logger
            let logger = new ConsoleLogger();

            // create execution context
            let context = new PipelineContext(pipeline, null);

            // create service
            let service = new GitHubIssueExtractorService();
            let config = service.getConfiguration();
            config.load(pipeline.extractorConfig.config);
            service.setConfiguration(config);
            // prepare
            service.prepare(context, logger).then(() => {

                let stream = service.extract();

                // handle end
                stream.on('data', (data) => {
                    console.log(data);
                });

                stream.on('end', (data) => {
                    done();
                });

                // error handling
                stream.on('error', (err) => {
                    console.error("Stream error", err);
                    done();
                });

            });
        });

    });

});
