# How to create a SyncPipes Service

## Setting up your environment

1. Install `node.js` and `npm` (https://nodejs.org/en/download/)
2. Install global node.js dependencies: `npm install --global typings gulp-cli`
3. Checkout the project using git: `git clone git@github.com:FKSE/syncpipes-ui.git`
4. Change into the server subdirectory `cd app/server`
5. Install `node.js` dependencies `npm install`
6. Install Typescript definitions `typings install`
7. Make sure you have access to a MongoDB instance. You can use docker for this: `docker run --name my-mongo -p 27017:27017 -d mongo:latest`
8. Make sure you have access to a RabbitMQ instance. You can use docker for this: `docker run -d --hostname my-rabbit --name my-rabbit -p 5672:5672 -e RABBITMQ_DEFAULT_USER=syncpipes -e RABBITMQ_DEFAULT_PASS=syncpipes rabbitmq:3`
9. Copy the `.env.sample` file to `.env` and adjust it to your needs and environment.
10. Run `gulp serve` to start the server and the worker process.

## Exploring the API


API-Documentation is written using [api blueprint](https://apiblueprint.org/).

* [Markdown Version](API.md)
* [HTML Version](api.html)
* [HTML Online Version](http://preview.fkse.io/syncpipes/api.html)

## Implementing your own service

### Planning

**Before starting:** 

Decide which kind of service you going to implement. A `Extractor` services extracts data from the source system.
A `Loader` service loads data into the target system.

**Know your data:**

You will need to describe your data using [JSONSchema](http://json-schema.org/) so get familiar with the concepts.

### Implementing your adapter

* Decide if you wan't to create a `Extractor` or  `Loader` service
* Create a folder for your extension inside the `./services` folder
* Create a `service.ts` file and implement your service.
* Load the service inside `bootstrap.ts`

```typescript
import { config } from 'dotenv';
import { Kernel } from './app/index';
import { RequirementsExcelExtractorService } from "./services/requirementsExcelExtractor/service";
import { RequirementsMySQLLoaderService } from "./services/requirementsMysqlLoader/service";
import { GitHubIssueExtractorService } from "./services/githubIssueExtractor/service";
import { PureIssueLoaderService } from "./services/pureIssueLoader/service";
// import your service here
import { MyLoaderService } from "./services/myLoader/service";
import { MyExtractorService } from "./services/myExtractor/service";
// parse .env file
config({silent: true});

// init kernel
let kernel = new Kernel({ // ... });
// load extensions
kernel.loadService(new RequirementsExcelExtractorService());
kernel.loadService(new RequirementsMySQLLoaderService());
kernel.loadService(new GitHubIssueExtractorService());
kernel.loadService(new PureIssueLoaderService());

// load your service here
kernel.loadService(new MyLoaderService());
kernel.loadService(new MyExtractorService());

export { kernel }

```

* Get the client application and follow the instructions from the client's `README.md` file to start it.
* Use the client application to create a configuration for an *extractor* and a *loader* service.
* Create a mapping between an extractor and a loader service.
* Create a pipeline using the previously created service configurations and mapping.
* Execute the created pipelines and check the created log entries to verify your implemented services are working as expected.

