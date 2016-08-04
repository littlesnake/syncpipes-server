# SyncPipes RESTful Server

## Requirements

* MongoDB
* RabbitMQ
* __node.js (v6.0 and above)__ and npm
* [Typings](https://github.com/typings/typings) `npm install --global typings`
* [Gulp](http://gulpjs.com/) `npm install --global gulp-cli`

## Install

1. Run `npm install`
1. Run `typings install` 
1. Run `gulp serve`

## Docker support

The application has build in [Docker](https://www.docker.com/) support. It also supports [docker-compose](https://github.com/docker/compose) to manage all dependencies.

You can start the complete application stack using `docker-compose up`

## Using the API

To use access the API either a generic REST-Client like [Postman](https://www.getpostman.com/) or the official SyncPipes client application can be used.

We suggest to use the official Angular.js client application.

The complete API documentation can be found in `docs/API.md`