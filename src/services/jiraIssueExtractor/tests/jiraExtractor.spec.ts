import 'mocha';
import * as chai from 'chai';
import { PipelineContext, Pipeline, IExtractorService, ILoaderService, IPipeline, IServiceConfig } from "../../../app/index";
import {JiraIssueExtractorService} from "./../service";

import { Configuration } from './../Configuration';

//import jiraClient = require('jira-connector');

//let jiraConf = new Configuration().load({url:'issues.apache.org/jira', username:"", token:"", project:"SPARK"});



// test mapper
describe('Jira extractor test', () => {

    describe('Extractor.getAllProjects', () => {
        it('should extract all projects', (done) => {

            //var jira = new jiraClient( {
            //    host: 'issues.apache.org/jira'
            //});
            //
            //jira.project.getAllProjects(null, function(error, projects) {
            //    console.log(projects);
            //});
            
            //let jiraConf = new Configuration().load('issues.apache.org/jira', "", "", "SPARK");
            let extractor = new JiraIssueExtractorService();

            let pipeline = <IPipeline>{
                extractorConfig: <IServiceConfig>{
                    config: {
                        "url" : "issues.apache.org/jira",
                        "username" : "",
                        "token" : "",
                        "organisation" : "SPARK"
                    }
                }
            };

            let context = new PipelineContext(pipeline, null);

            extractor.prepare(context, null);
            //extractor.setConfiguration(jiraConf.load({url:'issues.apache.org/jira', username:"", token:"", project:"SPARK"}));
            extractor.extract();
            //let schemaRaw = schema.toObject(true);

            //chai.expect(schema.partial('projects')).to.eql(schemaRaw.properties.projects);
            //chai.expect(schema.partial('projects/issues')).to.eql(schemaRaw.properties.projects.items.properties.issues);
            //chai.expect(schema.partial('projects/issues/comments')).to.eql(schemaRaw.properties.projects.items.properties.issues.items.properties.comments);
            //chai.expect(schema.partial('projects/issues/comments/author')).to.eql(schemaRaw.properties.projects.items.properties.issues.items.properties.comments.items.properties.author);

            done();
        });

    });

});
