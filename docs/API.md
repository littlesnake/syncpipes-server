FORMAT: 1A
HOST: http://localhost:3010/api/v1

# SyncPipes API

SyncPipes management API for managing Service Configurations, Mappings and Pipelines

## Group Pipeline Execution

Resources related to the Pipeline Executions interface of the API. A Pipeline execution contains the output of the execution of a pipeline.

## PipelineExecutions Collection [/pipeline-executions{?limit,page,order}]

### List PipelineExecutions [GET]

List all pipeline executions

+ Parameters
    + limit: 100 (number) - The maximum number of pipeline executions which will be in the response.
    + page: 1 (number) - The page to display, only if the total count of executions is greater then the limit.
    + order: started (string) - The field to order the collection, prefix with a minus "-" to order descending.

+ Response 200 (application/json)

        {
          "meta": {
            "total": 13,
            "limit": 25,
            "page": 1
          },
          "list": [
            {
              "_id": "577909d46b785e721e3443e4",
              "pipeline": {
                "_id": "5767bcb0b4debf803f94c1ba",
                "loaderConfig": "576549b9213a2bcd193bc520",
                "extractorConfig": "5767bc97b4debf803f94c1b9",
                "mapping": "5765632390eeeadb1d47fbf9",
                "name": "GitHub sebischair to MySQL",
                "__v": 0,
                "updated": "2016-06-20T09:51:44.277Z",
                "created": "2016-06-20T09:51:44.276Z"
              },
              "status": "Finished",
              "__v": 0,
              "finished": "2016-07-03T12:49:31.073Z",
              "started": "2016-07-03T12:49:24.359Z"
            },
            {
              "_id": "57723fff56bcda59e6f3a671",
              "pipeline": {
                "_id": "5765785490eeeadb1d47fc0f",
                "loaderConfig": "576549b9213a2bcd193bc520",
                "extractorConfig": "5765497b213a2bcd193bc51f",
                "mapping": "5765632390eeeadb1d47fbf9",
                "name": "GitHub Inversify to MySQL",
                "__v": 0,
                "updated": "2016-06-18T16:35:32.890Z",
                "created": "2016-06-18T16:35:32.887Z"
              },
              "status": "Finished",
              "__v": 0,
              "finished": "2016-06-28T09:16:56.429Z",
              "started": "2016-06-28T09:14:39.788Z"
            },
            {
              "_id": "57722de156bcda59e6f3a670",
              "pipeline": {
                "_id": "5765785490eeeadb1d47fc0f",
                "loaderConfig": "576549b9213a2bcd193bc520",
                "extractorConfig": "5765497b213a2bcd193bc51f",
                "mapping": "5765632390eeeadb1d47fbf9",
                "name": "GitHub Inversify to MySQL",
                "__v": 0,
                "updated": "2016-06-18T16:35:32.890Z",
                "created": "2016-06-18T16:35:32.887Z"
              },
              "status": "Finished",
              "__v": 0,
              "finished": "2016-06-28T07:59:31.427Z",
              "started": "2016-06-28T07:57:21.126Z"
            },
            {
              "_id": "5767e66ab6e08d3047b3343b",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Finished",
              "__v": 0,
              "finished": "2016-06-20T12:49:47.773Z",
              "started": "2016-06-20T12:49:46.738Z"
            },
            {
              "_id": "5767e5c9a6e72a2047539abd",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Finished",
              "__v": 0,
              "finished": "2016-06-20T12:47:06.484Z",
              "started": "2016-06-20T12:47:05.733Z"
            },
            {
              "_id": "5767e5515475ee0247903a86",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Running",
              "__v": 0,
              "started": "2016-06-20T12:45:05.677Z"
            },
            {
              "_id": "5767e5375475ee0247903a85",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Failed",
              "__v": 0,
              "finished": "2016-06-20T12:44:41.305Z",
              "started": "2016-06-20T12:44:39.097Z"
            },
            {
              "_id": "5767e45c4e67f406436ad00e",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Failed",
              "__v": 0,
              "finished": "2016-06-20T12:41:02.272Z",
              "started": "2016-06-20T12:41:00.782Z"
            },
            {
              "_id": "5767e3f04e67f406436ad00d",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Failed",
              "__v": 0,
              "finished": "2016-06-20T12:39:20.595Z",
              "started": "2016-06-20T12:39:12.769Z"
            },
            {
              "_id": "5767e3c14e67f406436ad00c",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Failed",
              "__v": 0,
              "finished": "2016-06-20T12:38:27.515Z",
              "started": "2016-06-20T12:38:25.146Z"
            },
            {
              "_id": "5767e3994e67f406436ad00b",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Failed",
              "__v": 0,
              "finished": "2016-06-20T12:37:51.773Z",
              "started": "2016-06-20T12:37:45.889Z"
            },
            {
              "_id": "5767e2524e67f406436ad00a",
              "pipeline": {
                "_id": "5767cd134e67f406436ad009",
                "loaderConfig": "5767cbc54e67f406436acffd",
                "extractorConfig": "5767ccfc4e67f406436ad008",
                "mapping": "5767cc234e67f406436acffe",
                "name": "Req. Excel to MySQL",
                "__v": 0,
                "updated": "2016-06-20T11:01:39.891Z",
                "created": "2016-06-20T11:01:39.890Z"
              },
              "status": "Failed",
              "__v": 0,
              "finished": "2016-06-20T12:32:24.809Z",
              "started": "2016-06-20T12:32:18.749Z"
            },
            {
              "_id": "5767bfd51f45bec84091d931",
              "pipeline": {
                "_id": "5765785490eeeadb1d47fc0f",
                "loaderConfig": "576549b9213a2bcd193bc520",
                "extractorConfig": "5765497b213a2bcd193bc51f",
                "mapping": "5765632390eeeadb1d47fbf9",
                "name": "GitHub Inversify to MySQL",
                "__v": 0,
                "updated": "2016-06-18T16:35:32.890Z",
                "created": "2016-06-18T16:35:32.887Z"
              },
              "status": "Finished",
              "__v": 0,
              "finished": "2016-06-20T10:07:12.247Z",
              "started": "2016-06-20T10:05:09.608Z"
            }
          ]
        }

## Pipeline Execution [/pipelines/{pipeline_execution_id}]

+ Parameters
    + pipeline_execution_id: 5742c2e484ac324326514ff8 (required, string) - ID of the Pipeline Execution in form of an BSON ObjectID

### View Pipeline Execution Details [GET]

+ Response 200 (application/json)

        {
          "_id": "577909d46b785e721e3443e4",
          "pipeline": {
            "_id": "5767bcb0b4debf803f94c1ba",
            "loaderConfig": "576549b9213a2bcd193bc520",
            "extractorConfig": "5767bc97b4debf803f94c1b9",
            "mapping": "5765632390eeeadb1d47fbf9",
            "name": "GitHub sebischair to MySQL",
            "__v": 0,
            "updated": "2016-06-20T09:51:44.277Z",
            "created": "2016-06-20T09:51:44.276Z"
          },
          "status": "Finished",
          "__v": 0,
          "finished": "2016-07-03T12:49:31.073Z",
          "started": "2016-07-03T12:49:24.359Z",
          "log": [
            {
              "level": 0,
              "date": "2016-07-03T12:49:24.653Z",
              "message": "Executing SQL-Query CREATE TABLE IF NOT EXISTS `projects` (\n\t`id` SERIAL,\n\t`github_id` INT NOT NULL,\n\t`name` VARCHAR(512) NOT NULL,\n\t`full_name` VARCHAR(512) NOT NULL,\n\t`description` TEXT NULL,\n\t`language` VARCHAR(512) NULL,\n\t`git_url` VARCHAR(512) NOT NULL,\n\t`watcher_count` INT NOT NULL DEFAULT 0,\n\t`stars_count` INT NOT NULL DEFAULT 0,\n\t`created_at` VARCHAR(512) NOT NULL,\n\t`updated_at` VARCHAR(512) NULL,\n\tPRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\nCREATE TABLE IF NOT EXISTS `issues` (\n\t`id` SERIAL,\n\t`github_id` INT NOT NULL,\n\t`project_id` BIGINT UNSIGNED,\n\t`number` INT NOT NULL,\n\t`title` VARCHAR(512) NOT NULL,\n\t`body` TEXT NOT NULL,\n\t`user` VARCHAR(512) NOT NULL,\n\t`state` VARCHAR(512) NOT NULL,\n\t`created_at` VARCHAR(512) NOT NULL,\n\t`updated_at` VARCHAR(512) NULL,\n\tPRIMARY KEY (`id`),\n\tFOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\nCREATE TABLE IF NOT EXISTS `comments` (\n\t`id` SERIAL,\n    `github_id` INT NOT NULL,\n\t`issue_id` BIGINT UNSIGNED,\n\t`body` TEXT NOT NULL,\n\t`user` VARCHAR(512) NOT NULL,\n\t`created_at` VARCHAR(512) NOT NULL,\n\t`updated_at` VARCHAR(512) NULL,\n\tPRIMARY KEY (`id`),\n\tFOREIGN KEY (`issue_id`) REFERENCES `issues`(`id`) ON DELETE CASCADE ON UPDATE CASCADE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n",
              "context": [

              ],
              "_id": "577909d4f73045731eca24ab"
            },
            {
              "level": 1,
              "date": "2016-07-03T12:49:24.462Z",
              "message": "Pipeline GitHub sebischair to MySQL started",
              "context": null,
              "_id": "577909d4f73045731eca24aa"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:25.973Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                59567324,
                "sc-reportgenerator",
                "sebischair\/sc-reportgenerator",
                null,
                "Java",
                "git:\/\/github.com\/sebischair\/sc-reportgenerator.git",
                0,
                0,
                "2016-05-24T11:29:46Z",
                "2016-05-30T12:32:19Z"
              ],
              "_id": "577909d5f73045731eca24ac"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:26.340Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                53327657,
                "movie-backend",
                "sebischair\/movie-backend",
                null,
                "JavaScript",
                "git:\/\/github.com\/sebischair\/movie-backend.git",
                0,
                0,
                "2016-03-07T13:28:59Z",
                "2016-03-07T13:31:03Z"
              ],
              "_id": "577909d6f73045731eca24ad"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:26.706Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                51827631,
                "sc-modeler",
                "sebischair\/sc-modeler",
                null,
                "JavaScript",
                "git:\/\/github.com\/sebischair\/sc-modeler.git",
                0,
                0,
                "2016-02-16T10:27:43Z",
                "2016-02-18T13:57:33Z"
              ],
              "_id": "577909d6f73045731eca24ae"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:27.065Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                50824175,
                "sc-contentmanager",
                "sebischair\/sc-contentmanager",
                "SocioCortex content manager",
                "JavaScript",
                "git:\/\/github.com\/sebischair\/sc-contentmanager.git",
                0,
                0,
                "2016-02-01T08:04:04Z",
                "2016-02-08T09:49:43Z"
              ],
              "_id": "577909d7f73045731eca24af"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:27.436Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                50617332,
                "sc-documentation",
                "sebischair\/sc-documentation",
                null,
                "JavaScript",
                "git:\/\/github.com\/sebischair\/sc-documentation.git",
                0,
                0,
                "2016-01-28T22:07:26Z",
                "2016-03-28T20:45:46Z"
              ],
              "_id": "577909d7f73045731eca24b0"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:27.788Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                49529964,
                "sc-datatable",
                "sebischair\/sc-datatable",
                null,
                "JavaScript",
                "git:\/\/github.com\/sebischair\/sc-datatable.git",
                0,
                0,
                "2016-01-12T21:27:59Z",
                "2016-01-12T21:35:53Z"
              ],
              "_id": "577909d7f73045731eca24b1"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:28.149Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                45129673,
                "sc-angular",
                "sebischair\/sc-angular",
                null,
                "JavaScript",
                "git:\/\/github.com\/sebischair\/sc-angular.git",
                1,
                1,
                "2015-10-28T17:23:52Z",
                "2016-01-13T08:10:58Z"
              ],
              "_id": "577909d8f73045731eca24b2"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:28.508Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                45129568,
                "mxl-angular",
                "sebischair\/mxl-angular",
                null,
                "JavaScript",
                "git:\/\/github.com\/sebischair\/mxl-angular.git",
                0,
                0,
                "2015-10-28T17:22:18Z",
                "2016-02-12T14:00:36Z"
              ],
              "_id": "577909d8f73045731eca24b3"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:29.594Z",
              "message": "Executing SQL-Query INSERT INTO `projects` (`github_id`, `name`, `full_name`, `description`, `language`, `git_url`, `watcher_count`, `stars_count`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                45129236,
                "sc-visualizer",
                "sebischair\/sc-visualizer",
                null,
                "TypeScript",
                "git:\/\/github.com\/sebischair\/sc-visualizer.git",
                4,
                4,
                "2015-10-28T17:17:10Z",
                "2016-07-02T20:30:36Z"
              ],
              "_id": "577909d9f73045731eca24b4"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:29.614Z",
              "message": "Executing SQL-Query SELECT id FROM projects WHERE github_id = ? LIMIT 1",
              "context": [
                45129236
              ],
              "_id": "577909d9f73045731eca24b5"
            },
            {
              "level": 0,
              "date": "2016-07-03T12:49:29.634Z",
              "message": "Executing SQL-Query INSERT INTO `issues` (`github_id`, `project_id`, `number`, `title`, `body`, `user`, `state`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
              "context": [
                163399484,
                33,
                2,
                "Requesting a pull to sebischair:master from sebischair:officegen-integration",
                null,
                "AlexMoroz",
                "closed",
                "2016-07-01T13:48:40Z",
                "2016-07-01T13:49:59Z"
              ],
              "_id": "577909d9f73045731eca24b6"
            },
            {
              "level": 3,
              "date": "2016-07-03T12:49:29.644Z",
              "message": "Loader stream error: Error: ER_BAD_NULL_ERROR: Column 'body' cannot be null",
              "context": null,
              "_id": "577909d9f73045731eca24b7"
            },
            {
              "level": 1,
              "date": "2016-07-03T12:49:31.067Z",
              "message": "Data extraction finished",
              "context": null,
              "_id": "577909dbf73045731eca24b8"
            },
            {
              "level": 1,
              "date": "2016-07-03T12:49:31.070Z",
              "message": "Data loading finished",
              "context": null,
              "_id": "577909dbf73045731eca24b9"
            }
          ]
        }

## Group Pipeline

Resources related to Pipelines in the API.

## Pipeline Collection [/pipelines]

### List Pipelines [GET]

+ Response 200 (application/json)

        [
          {
            "_id": "5765785490eeeadb1d47fc0f",
            "loaderConfig": {
              "_id": "576549b9213a2bcd193bc520",
              "config": {
                "host": "localhost",
                "port": 3306,
                "username": "root",
                "database": "syncpipes_github"
              },
              "name": "Local MySQL",
              "service": "PureIssueLoader",
              "__v": 0,
              "updated": "2016-06-18T13:16:41.530Z",
              "created": "2016-06-18T13:16:41.528Z"
            },
            "extractorConfig": {
              "_id": "5765497b213a2bcd193bc51f",
              "config": {
                "url": "https://api.github.com",
                "username": "fridolin-koch",
                "token": "20f815c8047591a5cd47d0a59c351f70c6dc94b4",
                "organisation": "inversify"
              },
              "name": "GitHub Inversify",
              "service": "GitHubIssueExtractor",
              "__v": 0,
              "updated": "2016-06-18T13:15:39.849Z",
              "created": "2016-06-18T13:15:39.841Z"
            },
            "mapping": {
              "_id": "5765632390eeeadb1d47fbf9",
              "name": "GitHub to MySQL",
              "extractorService": "GitHubIssueExtractor",
              "loaderService": "PureIssueLoader",
              "__v": 8,
              "updated": "2016-06-19T19:13:21.234Z",
              "created": "2016-06-18T15:05:07.042Z",
              "groups": [
                {
                  "toPrefix": "projects",
                  "_id": "5765632390eeeadb1d47fbfa",
                  "properties": [
                    {
                      "fromPath": "id",
                      "toPath": "projects/github_id",
                      "_id": "5765632390eeeadb1d47fbfe",
                      "foreignKey": null,
                      "uniqueKey": true,
                      "primaryKey": true
                    },
                    {
                      "fromPath": "name",
                      "toPath": "projects/name",
                      "_id": "5765632390eeeadb1d47fbfd",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    },
                    {
                      "fromPath": "full_name",
                      "toPath": "projects/full_name",
                      "_id": "5765632390eeeadb1d47fbfc",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    }
                  ]
                },
                {
                  "toPrefix": "issues",
                  "_id": "576574af90eeeadb1d47fc03",
                  "properties": [
                    {
                      "fromPath": "issues/id",
                      "toPath": "issues/github_id",
                      "_id": "576574af90eeeadb1d47fc0c",
                      "foreignKey": null,
                      "uniqueKey": true,
                      "primaryKey": true
                    },
                    {
                      "fromPath": "issues/number",
                      "toPath": "issues/number",
                      "_id": "576574af90eeeadb1d47fc0a",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    },
                    {
                      "fromPath": "issues/title",
                      "toPath": "issues/title",
                      "_id": "576574af90eeeadb1d47fc09",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    }
                  ]
                },
                {
                  "toPrefix": "comments",
                  "_id": "5766eed1a3ecfa4b362e6084",
                  "properties": [
                    {
                      "fromPath": "issues/comments/id",
                      "toPath": "comments/github_id",
                      "_id": "5766eed1a3ecfa4b362e608a",
                      "foreignKey": null,
                      "uniqueKey": true,
                      "primaryKey": true
                    },
                    {
                      "fromPath": "issues/id",
                      "toPath": "comments/issue_id",
                      "_id": "5766eed1a3ecfa4b362e6089",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    },
                    {
                      "fromPath": "issues/comments/body",
                      "toPath": "comments/body",
                      "_id": "5766eed1a3ecfa4b362e6088",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    }
                  ]
                }
              ]
            },
            "name": "GitHub Inversify to MySQL",
            "__v": 0,
            "updated": "2016-06-18T16:35:32.890Z",
            "created": "2016-06-18T16:35:32.887Z",
            "passive": false
          },
          {
            "_id": "5767bcb0b4debf803f94c1ba",
            "loaderConfig": {
              "_id": "576549b9213a2bcd193bc520",
              "config": {
                "host": "localhost",
                "port": 3306,
                "username": "root",
                "database": "syncpipes_github"
              },
              "name": "Local MySQL",
              "service": "PureIssueLoader",
              "__v": 0,
              "updated": "2016-06-18T13:16:41.530Z",
              "created": "2016-06-18T13:16:41.528Z"
            },
            "extractorConfig": {
              "_id": "5767bc97b4debf803f94c1b9",
              "config": {
                "url": "https://api.github.com",
                "username": "fridolin-koch",
                "token": "20f815c8047591a5cd47d0a59c351f70c6dc94b4",
                "organisation": "sebischair"
              },
              "name": "Github Sebischair",
              "service": "GitHubIssueExtractor",
              "__v": 0,
              "updated": "2016-06-20T09:51:26.400Z",
              "created": "2016-06-20T09:51:19.749Z"
            },
            "mapping": {
              "_id": "5765632390eeeadb1d47fbf9",
              "name": "GitHub to MySQL",
              "extractorService": "GitHubIssueExtractor",
              "loaderService": "PureIssueLoader",
              "__v": 8,
              "updated": "2016-06-19T19:13:21.234Z",
              "created": "2016-06-18T15:05:07.042Z",
              "groups": [
                {
                  "toPrefix": "projects",
                  "_id": "5765632390eeeadb1d47fbfa",
                  "properties": [
                    {
                      "fromPath": "id",
                      "toPath": "projects/github_id",
                      "_id": "5765632390eeeadb1d47fbfe",
                      "foreignKey": null,
                      "uniqueKey": true,
                      "primaryKey": true
                    },
                    {
                      "fromPath": "name",
                      "toPath": "projects/name",
                      "_id": "5765632390eeeadb1d47fbfd",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    },
                    {
                      "fromPath": "full_name",
                      "toPath": "projects/full_name",
                      "_id": "5765632390eeeadb1d47fbfc",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    }
                  ]
                },
                {
                  "toPrefix": "issues",
                  "_id": "576574af90eeeadb1d47fc03",
                  "properties": [
                    {
                      "fromPath": "issues/id",
                      "toPath": "issues/github_id",
                      "_id": "576574af90eeeadb1d47fc0c",
                      "foreignKey": null,
                      "uniqueKey": true,
                      "primaryKey": true
                    },
                    {
                      "fromPath": "issues/number",
                      "toPath": "issues/number",
                      "_id": "576574af90eeeadb1d47fc0a",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    },
                    {
                      "fromPath": "issues/title",
                      "toPath": "issues/title",
                      "_id": "576574af90eeeadb1d47fc09",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    }
                  ]
                },
                {
                  "toPrefix": "comments",
                  "_id": "5766eed1a3ecfa4b362e6084",
                  "properties": [
                    {
                      "fromPath": "issues/comments/id",
                      "toPath": "comments/github_id",
                      "_id": "5766eed1a3ecfa4b362e608a",
                      "foreignKey": null,
                      "uniqueKey": true,
                      "primaryKey": true
                    },
                    {
                      "fromPath": "issues/id",
                      "toPath": "comments/issue_id",
                      "_id": "5766eed1a3ecfa4b362e6089",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    },
                    {
                      "fromPath": "issues/comments/body",
                      "toPath": "comments/body",
                      "_id": "5766eed1a3ecfa4b362e6088",
                      "foreignKey": null,
                      "uniqueKey": false,
                      "primaryKey": false
                    }
                  ]
                }
              ]
            },
            "name": "GitHub sebischair to MySQL",
            "__v": 0,
            "updated": "2016-06-20T09:51:44.277Z",
            "created": "2016-06-20T09:51:44.276Z",
            "passive": false
          }
        ]

### Create New Pipeline [POST]

+ Request (application/json)

        {
            "name": "GitHub Issues only to PureIssue",
            "extractorConfig": "570920f2a486a6a8a05cca70",
            "loaderConfig": "570a416a231d1d36ba9faa92",
            "mapping": "57136de4777c434f9b03248e"
        }

+ Response 201 (application/json)

## Pipeline [/pipelines/{pipeline_id}]

+ Parameters
    + pipeline_id: 5742c2e484ac324326514ff8 (required, string) - ID of the Pipeline in form of an BSON ObjectID

### View Pipeline Details [GET]

+ Response 200 (application/json)

        {
          "_id": "5765785490eeeadb1d47fc0f",
          "loaderConfig": {
            "_id": "576549b9213a2bcd193bc520",
            "config": {
              "host": "localhost",
              "port": 3306,
              "username": "root",
              "database": "syncpipes_github"
            },
            "name": "Local MySQL",
            "service": "PureIssueLoader",
            "__v": 0,
            "updated": "2016-06-18T13:16:41.530Z",
            "created": "2016-06-18T13:16:41.528Z"
          },
          "extractorConfig": {
            "_id": "5765497b213a2bcd193bc51f",
            "config": {
              "url": "https:\/\/api.github.com",
              "username": "fridolin-koch",
              "token": "20f815c8047591a5cd47d0a59c351f70c6dc94b4",
              "organisation": "inversify"
            },
            "name": "GitHub Inversify",
            "service": "GitHubIssueExtractor",
            "__v": 0,
            "updated": "2016-06-18T13:15:39.849Z",
            "created": "2016-06-18T13:15:39.841Z"
          },
          "mapping": {
            "_id": "5765632390eeeadb1d47fbf9",
            "name": "GitHub to MySQL",
            "extractorService": "GitHubIssueExtractor",
            "loaderService": "PureIssueLoader",
            "__v": 8,
            "updated": "2016-06-19T19:13:21.234Z",
            "created": "2016-06-18T15:05:07.042Z",
            "groups": [
              {
                "toPrefix": "projects",
                "_id": "5765632390eeeadb1d47fbfa",
                "properties": [
                  {
                    "fromPath": "id",
                    "toPath": "projects\/github_id",
                    "_id": "5765632390eeeadb1d47fbfe",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "name",
                    "toPath": "projects\/name",
                    "_id": "5765632390eeeadb1d47fbfd",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "full_name",
                    "toPath": "projects\/full_name",
                    "_id": "5765632390eeeadb1d47fbfc",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "description",
                    "toPath": "projects\/description",
                    "_id": "5765632390eeeadb1d47fbfb",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "language",
                    "toPath": "projects\/language",
                    "_id": "576563aa90eeeadb1d47fc02",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "git_url",
                    "toPath": "projects\/git_url",
                    "_id": "576563aa90eeeadb1d47fc01",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "watchers_count",
                    "toPath": "projects\/watcher_count",
                    "_id": "576563aa90eeeadb1d47fc00",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "stargazers_count",
                    "toPath": "projects\/stars_count",
                    "_id": "576563aa90eeeadb1d47fbff",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "created_at",
                    "toPath": "projects\/created_at",
                    "_id": "576574af90eeeadb1d47fc0e",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "updated_at",
                    "toPath": "projects\/updated_at",
                    "_id": "576574af90eeeadb1d47fc0d",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              },
              {
                "toPrefix": "issues",
                "_id": "576574af90eeeadb1d47fc03",
                "properties": [
                  {
                    "fromPath": "issues\/id",
                    "toPath": "issues\/github_id",
                    "_id": "576574af90eeeadb1d47fc0c",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "issues\/number",
                    "toPath": "issues\/number",
                    "_id": "576574af90eeeadb1d47fc0a",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/title",
                    "toPath": "issues\/title",
                    "_id": "576574af90eeeadb1d47fc09",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/body",
                    "toPath": "issues\/body",
                    "_id": "576574af90eeeadb1d47fc08",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/user",
                    "toPath": "issues\/user",
                    "_id": "576574af90eeeadb1d47fc07",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/state",
                    "toPath": "issues\/state",
                    "_id": "576574af90eeeadb1d47fc06",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/created_at",
                    "toPath": "issues\/created_at",
                    "_id": "576574af90eeeadb1d47fc05",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/updated_at",
                    "toPath": "issues\/updated_at",
                    "_id": "576574af90eeeadb1d47fc04",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "id",
                    "toPath": "issues\/project_id",
                    "_id": "576695a5e9acff7e2cd28f4d",
                    "foreignKey": "",
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              },
              {
                "toPrefix": "comments",
                "_id": "5766eed1a3ecfa4b362e6084",
                "properties": [
                  {
                    "fromPath": "issues\/comments\/id",
                    "toPath": "comments\/github_id",
                    "_id": "5766eed1a3ecfa4b362e608a",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "issues\/id",
                    "toPath": "comments\/issue_id",
                    "_id": "5766eed1a3ecfa4b362e6089",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/body",
                    "toPath": "comments\/body",
                    "_id": "5766eed1a3ecfa4b362e6088",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/user",
                    "toPath": "comments\/user",
                    "_id": "5766eed1a3ecfa4b362e6087",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/created_at",
                    "toPath": "comments\/created_at",
                    "_id": "5766eed1a3ecfa4b362e6086",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/updated_at",
                    "toPath": "comments\/updated_at",
                    "_id": "5766eed1a3ecfa4b362e6085",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              }
            ]
          },
          "name": "GitHub Inversify to MySQL",
          "__v": 0,
          "updated": "2016-06-18T16:35:32.890Z",
          "created": "2016-06-18T16:35:32.887Z"
        }

### Update a Pipeline [PUT]

+ Request (application/json)

        {
            "name": "Name of the extension",
            "mapping": "5742c2db84ac324326514fe4"
        }

+ Response 200 (application/json)

        {
          "_id": "5765785490eeeadb1d47fc0f",
          "loaderConfig": {
            "_id": "576549b9213a2bcd193bc520",
            "config": {
              "host": "localhost",
              "port": 3306,
              "username": "root",
              "database": "syncpipes_github"
            },
            "name": "Local MySQL",
            "service": "PureIssueLoader",
            "__v": 0,
            "updated": "2016-06-18T13:16:41.530Z",
            "created": "2016-06-18T13:16:41.528Z"
          },
          "extractorConfig": {
            "_id": "5765497b213a2bcd193bc51f",
            "config": {
              "url": "https:\/\/api.github.com",
              "username": "fridolin-koch",
              "token": "20f815c8047591a5cd47d0a59c351f70c6dc94b4",
              "organisation": "inversify"
            },
            "name": "GitHub Inversify",
            "service": "GitHubIssueExtractor",
            "__v": 0,
            "updated": "2016-06-18T13:15:39.849Z",
            "created": "2016-06-18T13:15:39.841Z"
          },
          "mapping": {
            "_id": "5765632390eeeadb1d47fbf9",
            "name": "GitHub to MySQL",
            "extractorService": "GitHubIssueExtractor",
            "loaderService": "PureIssueLoader",
            "__v": 8,
            "updated": "2016-06-19T19:13:21.234Z",
            "created": "2016-06-18T15:05:07.042Z",
            "groups": [
              {
                "toPrefix": "projects",
                "_id": "5765632390eeeadb1d47fbfa",
                "properties": [
                  {
                    "fromPath": "id",
                    "toPath": "projects\/github_id",
                    "_id": "5765632390eeeadb1d47fbfe",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "name",
                    "toPath": "projects\/name",
                    "_id": "5765632390eeeadb1d47fbfd",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "full_name",
                    "toPath": "projects\/full_name",
                    "_id": "5765632390eeeadb1d47fbfc",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "description",
                    "toPath": "projects\/description",
                    "_id": "5765632390eeeadb1d47fbfb",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "language",
                    "toPath": "projects\/language",
                    "_id": "576563aa90eeeadb1d47fc02",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "git_url",
                    "toPath": "projects\/git_url",
                    "_id": "576563aa90eeeadb1d47fc01",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "watchers_count",
                    "toPath": "projects\/watcher_count",
                    "_id": "576563aa90eeeadb1d47fc00",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "stargazers_count",
                    "toPath": "projects\/stars_count",
                    "_id": "576563aa90eeeadb1d47fbff",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "created_at",
                    "toPath": "projects\/created_at",
                    "_id": "576574af90eeeadb1d47fc0e",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "updated_at",
                    "toPath": "projects\/updated_at",
                    "_id": "576574af90eeeadb1d47fc0d",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              },
              {
                "toPrefix": "issues",
                "_id": "576574af90eeeadb1d47fc03",
                "properties": [
                  {
                    "fromPath": "issues\/id",
                    "toPath": "issues\/github_id",
                    "_id": "576574af90eeeadb1d47fc0c",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "issues\/number",
                    "toPath": "issues\/number",
                    "_id": "576574af90eeeadb1d47fc0a",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/title",
                    "toPath": "issues\/title",
                    "_id": "576574af90eeeadb1d47fc09",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/body",
                    "toPath": "issues\/body",
                    "_id": "576574af90eeeadb1d47fc08",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/user",
                    "toPath": "issues\/user",
                    "_id": "576574af90eeeadb1d47fc07",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/state",
                    "toPath": "issues\/state",
                    "_id": "576574af90eeeadb1d47fc06",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/created_at",
                    "toPath": "issues\/created_at",
                    "_id": "576574af90eeeadb1d47fc05",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/updated_at",
                    "toPath": "issues\/updated_at",
                    "_id": "576574af90eeeadb1d47fc04",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "id",
                    "toPath": "issues\/project_id",
                    "_id": "576695a5e9acff7e2cd28f4d",
                    "foreignKey": "",
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              },
              {
                "toPrefix": "comments",
                "_id": "5766eed1a3ecfa4b362e6084",
                "properties": [
                  {
                    "fromPath": "issues\/comments\/id",
                    "toPath": "comments\/github_id",
                    "_id": "5766eed1a3ecfa4b362e608a",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "issues\/id",
                    "toPath": "comments\/issue_id",
                    "_id": "5766eed1a3ecfa4b362e6089",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/body",
                    "toPath": "comments\/body",
                    "_id": "5766eed1a3ecfa4b362e6088",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/user",
                    "toPath": "comments\/user",
                    "_id": "5766eed1a3ecfa4b362e6087",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/created_at",
                    "toPath": "comments\/created_at",
                    "_id": "5766eed1a3ecfa4b362e6086",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/updated_at",
                    "toPath": "comments\/updated_at",
                    "_id": "5766eed1a3ecfa4b362e6085",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              }
            ]
          },
          "name": "GitHub Inversify to MySQL",
          "__v": 0,
          "updated": "2016-06-18T16:35:32.890Z",
          "created": "2016-06-18T16:35:32.887Z"
        }


## Group Mapping

## Mapping Collection [/mappings]

### List All Mappings [GET]

+ Response 200 (application/json)

        [
          {
            "_id": "5765632390eeeadb1d47fbf9",
            "name": "GitHub to MySQL",
            "extractorService": "GitHubIssueExtractor",
            "loaderService": "PureIssueLoader",
            "__v": 8,
            "updated": "2016-06-19T19:13:21.234Z",
            "created": "2016-06-18T15:05:07.042Z",
            "groups": [
              {
                "toPrefix": "projects",
                "_id": "5765632390eeeadb1d47fbfa",
                "properties": [
                  {
                    "fromPath": "id",
                    "toPath": "projects\/github_id",
                    "_id": "5765632390eeeadb1d47fbfe",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "name",
                    "toPath": "projects\/name",
                    "_id": "5765632390eeeadb1d47fbfd",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "full_name",
                    "toPath": "projects\/full_name",
                    "_id": "5765632390eeeadb1d47fbfc",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "description",
                    "toPath": "projects\/description",
                    "_id": "5765632390eeeadb1d47fbfb",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "language",
                    "toPath": "projects\/language",
                    "_id": "576563aa90eeeadb1d47fc02",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "git_url",
                    "toPath": "projects\/git_url",
                    "_id": "576563aa90eeeadb1d47fc01",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "watchers_count",
                    "toPath": "projects\/watcher_count",
                    "_id": "576563aa90eeeadb1d47fc00",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "stargazers_count",
                    "toPath": "projects\/stars_count",
                    "_id": "576563aa90eeeadb1d47fbff",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "created_at",
                    "toPath": "projects\/created_at",
                    "_id": "576574af90eeeadb1d47fc0e",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "updated_at",
                    "toPath": "projects\/updated_at",
                    "_id": "576574af90eeeadb1d47fc0d",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              },
              {
                "toPrefix": "issues",
                "_id": "576574af90eeeadb1d47fc03",
                "properties": [
                  {
                    "fromPath": "issues\/id",
                    "toPath": "issues\/github_id",
                    "_id": "576574af90eeeadb1d47fc0c",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "issues\/number",
                    "toPath": "issues\/number",
                    "_id": "576574af90eeeadb1d47fc0a",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/title",
                    "toPath": "issues\/title",
                    "_id": "576574af90eeeadb1d47fc09",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/body",
                    "toPath": "issues\/body",
                    "_id": "576574af90eeeadb1d47fc08",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/user",
                    "toPath": "issues\/user",
                    "_id": "576574af90eeeadb1d47fc07",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/state",
                    "toPath": "issues\/state",
                    "_id": "576574af90eeeadb1d47fc06",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/created_at",
                    "toPath": "issues\/created_at",
                    "_id": "576574af90eeeadb1d47fc05",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/updated_at",
                    "toPath": "issues\/updated_at",
                    "_id": "576574af90eeeadb1d47fc04",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "id",
                    "toPath": "issues\/project_id",
                    "_id": "576695a5e9acff7e2cd28f4d",
                    "foreignKey": "",
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              },
              {
                "toPrefix": "comments",
                "_id": "5766eed1a3ecfa4b362e6084",
                "properties": [
                  {
                    "fromPath": "issues\/comments\/id",
                    "toPath": "comments\/github_id",
                    "_id": "5766eed1a3ecfa4b362e608a",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": true
                  },
                  {
                    "fromPath": "issues\/id",
                    "toPath": "comments\/issue_id",
                    "_id": "5766eed1a3ecfa4b362e6089",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/body",
                    "toPath": "comments\/body",
                    "_id": "5766eed1a3ecfa4b362e6088",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/user",
                    "toPath": "comments\/user",
                    "_id": "5766eed1a3ecfa4b362e6087",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/created_at",
                    "toPath": "comments\/created_at",
                    "_id": "5766eed1a3ecfa4b362e6086",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "issues\/comments\/updated_at",
                    "toPath": "comments\/updated_at",
                    "_id": "5766eed1a3ecfa4b362e6085",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              }
            ]
          },
          {
            "_id": "5767cc234e67f406436acffe",
            "loaderService": "RequirementsMySQLLoader",
            "extractorService": "RequirementsExcelExtractor",
            "name": "Requirements Excel to MySQL",
            "__v": 0,
            "updated": "2016-06-20T10:57:39.917Z",
            "created": "2016-06-20T10:57:39.905Z",
            "groups": [
              {
                "toPrefix": "requirements",
                "_id": "5767cc234e67f406436ad002",
                "properties": [
                  {
                    "fromPath": "requirements\/id",
                    "toPath": "requirements\/uid",
                    "_id": "5767cc234e67f406436ad006",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "requirements\/name",
                    "toPath": "requirements\/name",
                    "_id": "5767cc234e67f406436ad005",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "requirements\/info",
                    "toPath": "requirements\/short-description",
                    "_id": "5767cc234e67f406436ad004",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "requirements\/description",
                    "toPath": "requirements\/long-description",
                    "_id": "5767cc234e67f406436ad003",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              },
              {
                "toPrefix": "tests",
                "_id": "5767cc234e67f406436acfff",
                "properties": [
                  {
                    "fromPath": "test-cases\/id",
                    "toPath": "tests\/uid",
                    "_id": "5767cc234e67f406436ad001",
                    "foreignKey": null,
                    "uniqueKey": true,
                    "primaryKey": false
                  },
                  {
                    "fromPath": "test-cases\/description",
                    "toPath": "tests\/description",
                    "_id": "5767cc234e67f406436ad000",
                    "foreignKey": null,
                    "uniqueKey": false,
                    "primaryKey": false
                  }
                ]
              }
            ]
          }
        ]

### Create New Mappings [POST]

+ Request (application/json)

        {
          "name": "GitHub to MySQL",
          "extractorExtension": "GitHubIssueExtractor",
          "loaderExtension": "PureIssueLoader",
          "groups": [
            {
              "toPrefix": "projects",
              "properties": [
                {
                  "fromPath": "id",
                  "toPath": "projects\/github_id",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "name",
                  "toPath": "projects\/name",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "full_name",
                  "toPath": "projects\/full_name",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "description",
                  "toPath": "projects\/description",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "language",
                  "toPath": "projects\/language",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "git_url",
                  "toPath": "projects\/git_url",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "watchers_count",
                  "toPath": "projects\/watcher_count",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "stargazers_count",
                  "toPath": "projects\/stars_count",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "created_at",
                  "toPath": "projects\/created_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "updated_at",
                  "toPath": "projects\/updated_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "issues",
              "properties": [
                {
                  "fromPath": "issues\/id",
                  "toPath": "issues\/github_id",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/number",
                  "toPath": "issues\/number",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/title",
                  "toPath": "issues\/title",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/body",
                  "toPath": "issues\/body",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/user",
                  "toPath": "issues\/user",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/state",
                  "toPath": "issues\/state",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/created_at",
                  "toPath": "issues\/created_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/updated_at",
                  "toPath": "issues\/updated_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "id",
                  "toPath": "issues\/project_id",
                  "foreignKey": "",
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "comments",
              "properties": [
                {
                  "fromPath": "issues\/comments\/id",
                  "toPath": "comments\/github_id",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/id",
                  "toPath": "comments\/issue_id",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/body",
                  "toPath": "comments\/body",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/user",
                  "toPath": "comments\/user",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/created_at",
                  "toPath": "comments\/created_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/updated_at",
                  "toPath": "comments\/updated_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            }
          ]
        }

+ Response 201 (application/json)

        {
          "_id": "5765632390eeeadb1d47fbf9",
          "name": "GitHub to MySQL",
          "extractorService": "GitHubIssueExtractor",
          "loaderService": "PureIssueLoader",
          "__v": 8,
          "updated": "2016-06-19T19:13:21.234Z",
          "created": "2016-06-18T15:05:07.042Z",
          "groups": [
            {
              "toPrefix": "projects",
              "_id": "5765632390eeeadb1d47fbfa",
              "properties": [
                {
                  "fromPath": "id",
                  "toPath": "projects\/github_id",
                  "_id": "5765632390eeeadb1d47fbfe",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "name",
                  "toPath": "projects\/name",
                  "_id": "5765632390eeeadb1d47fbfd",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "full_name",
                  "toPath": "projects\/full_name",
                  "_id": "5765632390eeeadb1d47fbfc",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "description",
                  "toPath": "projects\/description",
                  "_id": "5765632390eeeadb1d47fbfb",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "language",
                  "toPath": "projects\/language",
                  "_id": "576563aa90eeeadb1d47fc02",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "git_url",
                  "toPath": "projects\/git_url",
                  "_id": "576563aa90eeeadb1d47fc01",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "watchers_count",
                  "toPath": "projects\/watcher_count",
                  "_id": "576563aa90eeeadb1d47fc00",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "stargazers_count",
                  "toPath": "projects\/stars_count",
                  "_id": "576563aa90eeeadb1d47fbff",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "created_at",
                  "toPath": "projects\/created_at",
                  "_id": "576574af90eeeadb1d47fc0e",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "updated_at",
                  "toPath": "projects\/updated_at",
                  "_id": "576574af90eeeadb1d47fc0d",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "issues",
              "_id": "576574af90eeeadb1d47fc03",
              "properties": [
                {
                  "fromPath": "issues\/id",
                  "toPath": "issues\/github_id",
                  "_id": "576574af90eeeadb1d47fc0c",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/number",
                  "toPath": "issues\/number",
                  "_id": "576574af90eeeadb1d47fc0a",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/title",
                  "toPath": "issues\/title",
                  "_id": "576574af90eeeadb1d47fc09",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/body",
                  "toPath": "issues\/body",
                  "_id": "576574af90eeeadb1d47fc08",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/user",
                  "toPath": "issues\/user",
                  "_id": "576574af90eeeadb1d47fc07",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/state",
                  "toPath": "issues\/state",
                  "_id": "576574af90eeeadb1d47fc06",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/created_at",
                  "toPath": "issues\/created_at",
                  "_id": "576574af90eeeadb1d47fc05",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/updated_at",
                  "toPath": "issues\/updated_at",
                  "_id": "576574af90eeeadb1d47fc04",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "id",
                  "toPath": "issues\/project_id",
                  "_id": "576695a5e9acff7e2cd28f4d",
                  "foreignKey": "",
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "comments",
              "_id": "5766eed1a3ecfa4b362e6084",
              "properties": [
                {
                  "fromPath": "issues\/comments\/id",
                  "toPath": "comments\/github_id",
                  "_id": "5766eed1a3ecfa4b362e608a",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/id",
                  "toPath": "comments\/issue_id",
                  "_id": "5766eed1a3ecfa4b362e6089",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/body",
                  "toPath": "comments\/body",
                  "_id": "5766eed1a3ecfa4b362e6088",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/user",
                  "toPath": "comments\/user",
                  "_id": "5766eed1a3ecfa4b362e6087",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/created_at",
                  "toPath": "comments\/created_at",
                  "_id": "5766eed1a3ecfa4b362e6086",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/updated_at",
                  "toPath": "comments\/updated_at",
                  "_id": "5766eed1a3ecfa4b362e6085",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            }
          ]
        }

## Mapping [/mappings/{mapping_id}]

+ Parameters
    + mapping_id: 5742c2e484ac324326514ff8 (required, string) - ID of the Mapping in form of an BSON ObjectID

### List Mapping [GET]

+ Response 200 (application/json)

        {
          "_id": "5765632390eeeadb1d47fbf9",
          "name": "GitHub to MySQL",
          "extractorService": "GitHubIssueExtractor",
          "loaderService": "PureIssueLoader",
          "__v": 8,
          "updated": "2016-06-19T19:13:21.234Z",
          "created": "2016-06-18T15:05:07.042Z",
          "groups": [
            {
              "toPrefix": "projects",
              "_id": "5765632390eeeadb1d47fbfa",
              "properties": [
                {
                  "fromPath": "id",
                  "toPath": "projects\/github_id",
                  "_id": "5765632390eeeadb1d47fbfe",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "name",
                  "toPath": "projects\/name",
                  "_id": "5765632390eeeadb1d47fbfd",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "full_name",
                  "toPath": "projects\/full_name",
                  "_id": "5765632390eeeadb1d47fbfc",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "description",
                  "toPath": "projects\/description",
                  "_id": "5765632390eeeadb1d47fbfb",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "language",
                  "toPath": "projects\/language",
                  "_id": "576563aa90eeeadb1d47fc02",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "git_url",
                  "toPath": "projects\/git_url",
                  "_id": "576563aa90eeeadb1d47fc01",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "watchers_count",
                  "toPath": "projects\/watcher_count",
                  "_id": "576563aa90eeeadb1d47fc00",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "stargazers_count",
                  "toPath": "projects\/stars_count",
                  "_id": "576563aa90eeeadb1d47fbff",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "created_at",
                  "toPath": "projects\/created_at",
                  "_id": "576574af90eeeadb1d47fc0e",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "updated_at",
                  "toPath": "projects\/updated_at",
                  "_id": "576574af90eeeadb1d47fc0d",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "issues",
              "_id": "576574af90eeeadb1d47fc03",
              "properties": [
                {
                  "fromPath": "issues\/id",
                  "toPath": "issues\/github_id",
                  "_id": "576574af90eeeadb1d47fc0c",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/number",
                  "toPath": "issues\/number",
                  "_id": "576574af90eeeadb1d47fc0a",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/title",
                  "toPath": "issues\/title",
                  "_id": "576574af90eeeadb1d47fc09",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/body",
                  "toPath": "issues\/body",
                  "_id": "576574af90eeeadb1d47fc08",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/user",
                  "toPath": "issues\/user",
                  "_id": "576574af90eeeadb1d47fc07",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/state",
                  "toPath": "issues\/state",
                  "_id": "576574af90eeeadb1d47fc06",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/created_at",
                  "toPath": "issues\/created_at",
                  "_id": "576574af90eeeadb1d47fc05",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/updated_at",
                  "toPath": "issues\/updated_at",
                  "_id": "576574af90eeeadb1d47fc04",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "id",
                  "toPath": "issues\/project_id",
                  "_id": "576695a5e9acff7e2cd28f4d",
                  "foreignKey": "",
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "comments",
              "_id": "5766eed1a3ecfa4b362e6084",
              "properties": [
                {
                  "fromPath": "issues\/comments\/id",
                  "toPath": "comments\/github_id",
                  "_id": "5766eed1a3ecfa4b362e608a",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/id",
                  "toPath": "comments\/issue_id",
                  "_id": "5766eed1a3ecfa4b362e6089",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/body",
                  "toPath": "comments\/body",
                  "_id": "5766eed1a3ecfa4b362e6088",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/user",
                  "toPath": "comments\/user",
                  "_id": "5766eed1a3ecfa4b362e6087",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/created_at",
                  "toPath": "comments\/created_at",
                  "_id": "5766eed1a3ecfa4b362e6086",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/updated_at",
                  "toPath": "comments\/updated_at",
                  "_id": "5766eed1a3ecfa4b362e6085",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            }
          ]
        }

### Update Mapping [PUT]


+ Request (application/json)

        {
          "name": "GitHub to MySQL",
          "extractorExtension": "GitHubIssueExtractor",
          "loaderExtension": "PureIssueLoader",
          "groups": [
            {
              "toPrefix": "projects",
              "properties": [
                {
                  "fromPath": "id",
                  "toPath": "projects\/github_id",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "name",
                  "toPath": "projects\/name",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "full_name",
                  "toPath": "projects\/full_name",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "description",
                  "toPath": "projects\/description",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "language",
                  "toPath": "projects\/language",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "git_url",
                  "toPath": "projects\/git_url",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "watchers_count",
                  "toPath": "projects\/watcher_count",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "stargazers_count",
                  "toPath": "projects\/stars_count",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "created_at",
                  "toPath": "projects\/created_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "updated_at",
                  "toPath": "projects\/updated_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "issues",
              "properties": [
                {
                  "fromPath": "issues\/id",
                  "toPath": "issues\/github_id",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/number",
                  "toPath": "issues\/number",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/title",
                  "toPath": "issues\/title",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/body",
                  "toPath": "issues\/body",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/user",
                  "toPath": "issues\/user",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/state",
                  "toPath": "issues\/state",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/created_at",
                  "toPath": "issues\/created_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/updated_at",
                  "toPath": "issues\/updated_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "id",
                  "toPath": "issues\/project_id",
                  "foreignKey": "",
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "comments",
              "properties": [
                {
                  "fromPath": "issues\/comments\/id",
                  "toPath": "comments\/github_id",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/id",
                  "toPath": "comments\/issue_id",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/body",
                  "toPath": "comments\/body",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/user",
                  "toPath": "comments\/user",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/created_at",
                  "toPath": "comments\/created_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/updated_at",
                  "toPath": "comments\/updated_at",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            }
          ]
        }

+ Response 200 (application/json)

        {
          "_id": "5765632390eeeadb1d47fbf9",
          "name": "GitHub to MySQL",
          "extractorService": "GitHubIssueExtractor",
          "loaderService": "PureIssueLoader",
          "__v": 8,
          "updated": "2016-06-19T19:13:21.234Z",
          "created": "2016-06-18T15:05:07.042Z",
          "groups": [
            {
              "toPrefix": "projects",
              "_id": "5765632390eeeadb1d47fbfa",
              "properties": [
                {
                  "fromPath": "id",
                  "toPath": "projects\/github_id",
                  "_id": "5765632390eeeadb1d47fbfe",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "name",
                  "toPath": "projects\/name",
                  "_id": "5765632390eeeadb1d47fbfd",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "full_name",
                  "toPath": "projects\/full_name",
                  "_id": "5765632390eeeadb1d47fbfc",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "description",
                  "toPath": "projects\/description",
                  "_id": "5765632390eeeadb1d47fbfb",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "language",
                  "toPath": "projects\/language",
                  "_id": "576563aa90eeeadb1d47fc02",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "git_url",
                  "toPath": "projects\/git_url",
                  "_id": "576563aa90eeeadb1d47fc01",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "watchers_count",
                  "toPath": "projects\/watcher_count",
                  "_id": "576563aa90eeeadb1d47fc00",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "stargazers_count",
                  "toPath": "projects\/stars_count",
                  "_id": "576563aa90eeeadb1d47fbff",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "created_at",
                  "toPath": "projects\/created_at",
                  "_id": "576574af90eeeadb1d47fc0e",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "updated_at",
                  "toPath": "projects\/updated_at",
                  "_id": "576574af90eeeadb1d47fc0d",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "issues",
              "_id": "576574af90eeeadb1d47fc03",
              "properties": [
                {
                  "fromPath": "issues\/id",
                  "toPath": "issues\/github_id",
                  "_id": "576574af90eeeadb1d47fc0c",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/number",
                  "toPath": "issues\/number",
                  "_id": "576574af90eeeadb1d47fc0a",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/title",
                  "toPath": "issues\/title",
                  "_id": "576574af90eeeadb1d47fc09",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/body",
                  "toPath": "issues\/body",
                  "_id": "576574af90eeeadb1d47fc08",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/user",
                  "toPath": "issues\/user",
                  "_id": "576574af90eeeadb1d47fc07",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/state",
                  "toPath": "issues\/state",
                  "_id": "576574af90eeeadb1d47fc06",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/created_at",
                  "toPath": "issues\/created_at",
                  "_id": "576574af90eeeadb1d47fc05",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/updated_at",
                  "toPath": "issues\/updated_at",
                  "_id": "576574af90eeeadb1d47fc04",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "id",
                  "toPath": "issues\/project_id",
                  "_id": "576695a5e9acff7e2cd28f4d",
                  "foreignKey": "",
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            },
            {
              "toPrefix": "comments",
              "_id": "5766eed1a3ecfa4b362e6084",
              "properties": [
                {
                  "fromPath": "issues\/comments\/id",
                  "toPath": "comments\/github_id",
                  "_id": "5766eed1a3ecfa4b362e608a",
                  "foreignKey": null,
                  "uniqueKey": true,
                  "primaryKey": true
                },
                {
                  "fromPath": "issues\/id",
                  "toPath": "comments\/issue_id",
                  "_id": "5766eed1a3ecfa4b362e6089",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/body",
                  "toPath": "comments\/body",
                  "_id": "5766eed1a3ecfa4b362e6088",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/user",
                  "toPath": "comments\/user",
                  "_id": "5766eed1a3ecfa4b362e6087",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/created_at",
                  "toPath": "comments\/created_at",
                  "_id": "5766eed1a3ecfa4b362e6086",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                },
                {
                  "fromPath": "issues\/comments\/updated_at",
                  "toPath": "comments\/updated_at",
                  "_id": "5766eed1a3ecfa4b362e6085",
                  "foreignKey": null,
                  "uniqueKey": false,
                  "primaryKey": false
                }
              ]
            }
          ]
        }


## Group Service

## Service Collection [/services]

### List All Services [GET]

Responds a list of all loaded services including their schema.

+ Response 200 (application/json)

        [
          {
            "name": "RequirementsExcelExtractor",
            "schema": {
              "id": "http://some.site.somewhere/entry-schema#",
              "$schema": "http://json-schema.org/draft-04/schema#",
              "description": "Schema for Requirements Excel extractor",
              "type": "object",
              "required": [
                "requirements",
                "test-cases"
              ],
              "properties": {
                "requirements": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "info": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      }
                    },
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "name"
                    ]
                  }
                },
                "test-cases": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      }
                    },
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "description"
                    ]
                  }
                }
              }
            }
          },
          {
            "name": "RequirementsMySQLLoader",
            "schema": {
              "id": "http://some.site.somewhere/entry-schema#",
              "$schema": "http://json-schema.org/draft-04/schema#",
              "description": "Schema for Requirements MySQL loader",
              "type": "object",
              "required": [
                "requirements",
                "tests"
              ],
              "properties": {
                "requirements": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "uid": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "short-description": {
                        "type": "string"
                      },
                      "long-description": {
                        "type": "string"
                      }
                    },
                    "additionalProperties": false,
                    "required": [
                      "uid",
                      "name",
                      "short-description",
                      "long-description"
                    ]
                  }
                },
                "tests": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "uid": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      }
                    },
                    "additionalProperties": false,
                    "required": [
                      "uid",
                      "name"
                    ]
                  }
                }
              }
            }
          },
          {
            "name": "GitHubIssueExtractor",
            "schema": {
              "id": "http://some.site.somewhere/entry-schema#",
              "$schema": "http://json-schema.org/draft-04/schema#",
              "description": "Schema for GitHub Issue extractor",
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
                  "full_name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "language": {
                    "type": "string"
                  },
                  "git_url": {
                    "type": "string"
                  },
                  "watchers_count": {
                    "type": "integer"
                  },
                  "stargazers_count": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string"
                  },
                  "updated_at": {
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
                        },
                        "body": {
                          "type": "string"
                        },
                        "user": {
                          "type": "string"
                        },
                        "state": {
                          "type": "string"
                        },
                        "created_at": {
                          "type": "string"
                        },
                        "updated_at": {
                          "type": "string"
                        }
                      },
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "number",
                        "title",
                        "body",
                        "user",
                        "state",
                        "created_at"
                      ]
                    }
                  }
                },
                "additionalProperties": false,
                "required": [
                  "id",
                  "name",
                  "full_name",
                  "description",
                  "git_url",
                  "watcher_count",
                  "stars_count",
                  "created_at"
                ]
              }
            }
          }
        ]

## Service [/services/{service_name}]

+ Parameters
    + service_name: GitHubIssueExtractor (required, string) - Name of the service

### View Service [GET]

+ Response 200 (application/json)

        {
            "name": "RequirementsExcelExtractor",
            "schema": {
              "id": "http://some.site.somewhere/entry-schema#",
              "$schema": "http://json-schema.org/draft-04/schema#",
              "description": "Schema for Requirements Excel extractor",
              "type": "object",
              "required": [
                "requirements",
                "test-cases"
              ],
              "properties": {
                "requirements": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "info": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      }
                    },
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "name"
                    ]
                  }
                },
                "test-cases": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      }
                    },
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "description"
                    ]
                  }
                }
              }
            }
          }

## Service Configuration Collection [/services/{service_name}/configs]

+ Parameters
    + service_name: GitHubIssueExtractor (required, string) - Name of the service

### View All Service Configurations [GET]

+ Response 200 (application/json)

        [
          {
            "_id": "57452fbe625b63620bf428e7",
            "config": {
              "host": "localhost",
              "port": "3306",
              "user": "root",
              "password": "",
              "database": "syncpipes_requirements"
            },
            "name": "MySQL Config Requirements",
            "service": "RequirementsExcelExtractor",
            "__v": 0,
            "updated": "2016-05-25T04:53:18.816Z",
            "created": "2016-05-25T04:53:18.802Z"
          }
        ]

### Create New Service Configuration [POST]

+ Request (application/json)

        {
            "config" : {
                "host" : "localhost",
                "port" : "3306",
                "user" : "root",
                "password" : "",
                "database" : "syncpipes_requirements"
            },
            "name" : "MySQL Config Requirements"
        }

+ Response 200 (application/json)

        {
          "_id": "57452fbe625b63620bf428e7",
          "config": {
            "host": "localhost",
            "port": "3306",
            "user": "root",
            "password": "",
            "database": "syncpipes_requirements"
          },
          "name": "MySQL Config Requirements",
          "service": "RequirementsExcelExtractor",
          "__v": 0,
          "updated": null,
          "created": "2016-05-25T04:53:18.802Z"
        }

## Service Configuration [/services/{service_name}/configs/{config_id}]

+ Parameters
    + service_name: GitHubIssueExtractor (required, string) - Name of the service
    + config_id: 5742c2e484ac324326514ff8 (required, string) - ID of the Service config in form of an BSON ObjectID

### View Service Configuration [GET]

+ Response 200 (application/json)

        {
          "_id": "57452fbe625b63620bf428e7",
          "config": {
            "host": "localhost",
            "port": "3306",
            "user": "root",
            "password": "",
            "database": "syncpipes_requirements"
          },
          "name": "MySQL Config Requirements",
          "service": "RequirementsExcelExtractor",
          "__v": 0,
          "updated": "2016-05-25T04:53:18.816Z",
          "created": "2016-05-25T04:53:18.802Z"
        }

### Update a Service Configuration [PUT]

+ Request (application/json)

        {
            "config" : {
                "host" : "localhost",
                "port" : "3306",
                "user" : "root",
                "password" : "",
                "database" : "syncpipes_requirements"
            },
            "name" : "MySQL Config Requirements"
        }

+ Response 200 (application/json)

        {
          "_id": "57452fbe625b63620bf428e7",
          "config": {
            "host": "localhost",
            "port": "3306",
            "user": "root",
            "password": "",
            "database": "syncpipes_requirements"
          },
          "name": "MySQL Config Requirements",
          "service": "RequirementsExcelExtractor",
          "__v": 0,
          "updated": null,
          "created": "2016-05-25T04:53:18.802Z"
        }
