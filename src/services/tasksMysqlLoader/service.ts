import * as stream from 'stream';
import * as mysql from 'mysql';
import * as SyncPipes from "../../app/index";
// mysql connector configuration
import { Configuration } from './Configuration'

/**
 * TasksMySQLLoaderService
 */
export class TasksMySQLLoaderService implements SyncPipes.ILoaderService {

    private config: Configuration;

    private context: SyncPipes.IPipelineContext;

    private connection: mysql.IConnection;

    private stream: stream.Writable;

    private schema: SyncPipes.ISchema;

    /**
     * SyncPipes logger instance
     */
    private logger: SyncPipes.ILogger;

    constructor() {
        this.schema = SyncPipes.Schema.createFromFile(__dirname + '/schema.json');
    }

    /**
     * Returns the name of this extension
     * @return {string}
     */
    getName(): string {
        return 'TasksMySQLLoader';
    }

    /**
     * Returns the JSON-Schema of this extension
     *
     * @return {Schema}
     */
    getSchema(): SyncPipes.ISchema {
        return this.schema;
    }

    /**
     * Returns a fresh instance of the configuration
     *
     * @return {Configuration}
     */
    getConfiguration(): SyncPipes.IServiceConfiguration {
        return new Configuration();
    }

    /**
     * Sets the configuration of the extension
     *
     * @param config
     */
    setConfiguration(config: SyncPipes.IServiceConfiguration): void {
        this.config = <Configuration>config;
    }

    /**
     * Prepares the extension for the extraction process
     * @param context
     * @param logger
     */
    prepare(context: SyncPipes.IPipelineContext, logger: SyncPipes.ILogger): Promise<any> {
        this.context = context;
        this.logger = logger;
        this.connection = mysql.createConnection(this.config.store());
        this.connection.connect();
        return this.setupDatabase();
    }

    load(): stream.Writable {

        this.stream = new stream.Writable({ objectMode: true });
        this.stream._write = (chunk, encoding, callback) => {
            Promise.all([
                this.insertTasks(chunk.tasks),
            ]).then(() => {
                callback();
            }).catch((err) => {
                this.logger.error(err);
                callback(err);
            });
        };
        return this.stream;
    }

    private insertTasks(tasks: Array<any>): Promise<any> {
        // tasks query
        let query = "INSERT INTO `tasks` (`uid`, `name`, `description`, `effort`, `parentTask`, `requirement`) VALUES ";
        let bindings = [];
        let placeholder = [];
        for (let task of tasks) {
            placeholder.push("(?, ?, ?, ?, ?, ?)");
            bindings = bindings.concat(
                [
                    task.uid, task.name || 'N/A', task['description'], task['effort'], task['parentTask'], task['requirement']
                ]);
        }
        query += placeholder.join(',');

        // run query
        return this.execQuery(query, bindings);
    }

    private setupDatabase(): Promise<any> {
        let sql = `
        CREATE TABLE IF NOT EXISTS \`tasks\` (
            \`id\` SERIAL,
            \`uid\` VARCHAR(100) NOT NULL,
            \`name\` VARCHAR(512) NOT NULL,
            \`description\` TEXT,
            \`effort\` INT,
            \`parentTask\` VARCHAR(100),
            \`requirement\` VARCHAR(100),
            PRIMARY KEY (\`id\`),
            UNIQUE INDEX \`id_UNIQUE\` (\`id\` ASC)
        );`;
        return this.execQuery(sql);
    }

    private execQuery(sql: string, bindings: Array<any> = []): Promise<any> {
        this.logger.debug(`Executing SQL-Query ${sql}`, bindings);
        return new Promise<any>((resolve, reject) => {
            this.connection.query(sql, bindings, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
