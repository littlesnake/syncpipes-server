import { IPipelineExecution, PipelineExecution } from '../model/PipelineExecution';

export enum LogLevel {
    Debug = 0,
    Info = 1,
    Warn = 2,
    Error = 3,
    Fatal = 4
}

export interface ILoggerMessage {
    level: LogLevel;
    date?: Date;
    message: string;
    context: Object;
}
export interface ILogger {
    setLevel(level: LogLevel);
    debug(msg: string, context?: Object);
    info(msg: string, context?: Object);
    warn(msg: string, context?: Object);
    error(msg: string, context?: Object);
    fatal(msg: string, context?: Object);
    flush();
}

export class ConsoleLogger implements ILogger {

    private logLevel: LogLevel;

    private messages: Array<ILoggerMessage>;

    constructor() {
        this.messages = [];
        this.logLevel = LogLevel.Debug;
    }

    setLevel(level: LogLevel) {
        this.logLevel = level;
    }


    debug(msg: string, context: Object = null) {
        this.log(LogLevel.Debug, msg, context);
    }

    info(msg: string, context: Object = null) {
        this.log(LogLevel.Info, msg, context);
    }

    warn(msg: string, context: Object = null) {
        this.log(LogLevel.Warn, msg, context);
    }

    error(msg: string, context: Object = null) {
        this.log(LogLevel.Error, msg, context);
    }

    fatal(msg: string, context: Object = null) {
        this.log(LogLevel.Fatal, msg, context);
        this.flush();
        process.exit(1);
    }

    flush() {
        for (let msg of this.messages) {
            if (msg.level >= this.logLevel) {
                let out = msg.message + "Context: " + JSON.stringify(msg.context);
                switch (msg.level) {
                    case LogLevel.Debug:
                    case LogLevel.Info:
                        console.info(out);
                        break;
                    case LogLevel.Warn:
                        console.warn(out);
                        break;
                    case LogLevel.Error:
                    case LogLevel.Fatal:
                        console.error(out);
                        break;
                }
            }
        }
    }

    private log(level: LogLevel, msg: string, context: Object) {
        this.messages.push({
            level: level,
            message: msg,
            context: context
        });
    }
}

/**
 * Log to MongoDB
 */
export class MongoLogger implements ILogger {

    private logLevel: LogLevel;

    private executionID: string;

    constructor(executionID: string) {
        this.executionID = executionID;
        this.logLevel = LogLevel.Debug;
    }

    setLevel(level: LogLevel) {
        this.logLevel = level;
    }

    debug(msg: string, context: Object = null) {
        this.log(LogLevel.Debug, msg, context);
    }

    info(msg: string, context: Object = null) {
        this.log(LogLevel.Info, msg, context);
    }

    warn(msg: string, context: Object = null) {
        this.log(LogLevel.Warn, msg, context);
    }

    error(msg: string, context: Object = null) {
        this.log(LogLevel.Error, msg, context);
    }

    fatal(msg: string, context: Object = null) {
        this.log(LogLevel.Fatal, msg, context);
        process.exit(1);
    }

    /**
     * MongoLogger does not use flush, since we do "live" logging
     */
    flush() {}

    /**
     * Insert log entry into database, errors are ignored
     */
    private log(level: LogLevel, msg: string, context: Object) {
        console.log(msg);
        if (level >= this.logLevel) {
            let message = {
                level: level,
                date: new Date(),
                message: msg,
                context: context
            };
            // save to mongo
            PipelineExecution.update({_id: this.executionID}, {"$push": {"log": message}}).exec();
        }
    }
}
