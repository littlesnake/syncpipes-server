import * as stream from 'stream';
import * as mysql from 'mysql';
import * as SyncPipes from "../../app/index";
// mysql connector configuration
import { Configuration } from './Configuration'

/**
 * RequirementsMySQLLoaderService
 */
export class RequirementsMySQLLoaderService implements SyncPipes.ILoaderService {

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
        return 'RequirementsMySQLLoader';
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

        this.stream = new stream.Writable({objectMode: true});
        this.stream._write = (chunk, encoding, callback) => {
            Promise.all([
                this.insertRequirements(chunk.requirements),
                this.insertTests(chunk.tests)
            ]).then(() => {
                callback();
            }).catch((err) => {
                this.logger.error(err);
                callback(err);
            });
        };
        return this.stream;
    }

    private insertTests(tests: Array<any>): Promise<any> {
        // requirements query
        let query = "INSERT INTO `tests` (`uid`, `description`) VALUES ";
        let bindings = [];
        let placeholder = [];
        for (let test of tests) {
            placeholder.push("(?, ?)");
            bindings = bindings.concat([test.uid, test.description]);
        }
        query += placeholder.join(',');
        return this.execQuery(query, bindings);
    }

    private insertRequirements(requirements: Array<any>): Promise<any> {
        // requirements query
        let query = "INSERT INTO `requirements` (`uid`, `name`, `short-description`, `long-description`) VALUES ";
        let bindings = [];
        let placeholder = [];
        for (let requirement of requirements) {
            placeholder.push("(?, ?, ?, ?)");
            bindings = bindings.concat([requirement.uid, requirement.name || 'N/A', requirement['short-description'], requirement['long-description']]);
        }
        query += placeholder.join(',');
        // run query
        return this.execQuery(query, bindings);
    }

    private setupDatabase(): Promise<any> {
        let sql = `
        CREATE TABLE IF NOT EXISTS \`requirements\` (
            \`id\` SERIAL,
            \`uid\` VARCHAR(100) NOT NULL,
            \`name\` VARCHAR(512) NOT NULL,
            \`short-description\` TEXT,
            \`long-description\` TEXT,
            PRIMARY KEY (\`id\`),
            UNIQUE INDEX \`id_UNIQUE\` (\`id\` ASC)
        );
        CREATE TABLE IF NOT EXISTS \`tests\` (
            \`id\` SERIAL,
            \`uid\` VARCHAR(100) NOT NULL,
            \`description\` TEXT,
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
