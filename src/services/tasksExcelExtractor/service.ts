import * as stream from 'stream';
import * as SyncPipes from "../../app/index";
import * as xlsx from 'xlsx';

interface ITask {
    id: string;
    name: string;
    description: string;
    effort: number;
    parentTask: string;
    requirement: string;
}

/**
 * Extracts Tasks from an excel sheet
 */
export class TasksExcelExtractorService implements SyncPipes.IExtractorService {

    /**
     * Execution context
     */
    private context: SyncPipes.IPipelineContext;

    /**
     * Output stream
     */
    private stream: stream.Readable;

    /**
     * Workbooks created in prepare
     */
    private workbooks: Array<xlsx.IWorkBook>;

    /**
     * SyncPipes logger instance
     */
    private logger: SyncPipes.ILogger;

    /**
     * Extension schema
     */
    private schema: SyncPipes.ISchema;

    constructor() {
        this.schema = SyncPipes.Schema.createFromFile(__dirname + '/schema.json');
    }

    /**
     * Data is expected from pipeline
     *
     * @return {ExtractorServiceType}
     */
    getType(): SyncPipes.ExtractorServiceType {
        return SyncPipes.ExtractorServiceType.Passive;
    }

    prepare(context: SyncPipes.IPipelineContext, logger: SyncPipes.ILogger): Promise<any> {
        this.context = context;
        this.logger = logger;
        this.workbooks = [];
        // load xlsx file(s) from context
        for (let file of context.inputData) {
            this.workbooks.push(xlsx.read(file, { "type": "buffer" }));
        }
        // resolve immediately, since no async work is done
        return Promise.resolve();
    }


    extract(): stream.Readable {

        // create output stream
        this.stream = new stream.Readable({ objectMode: true });
        this.stream._read = () => {

            if (this.workbooks.length === 0) {
                this.stream.push(null);
            } else {
                let workbook = this.workbooks.pop();
                while (workbook != null) {
                    let tasks = new Array<ITask>();

                    // get tasks
                    let sheet = workbook.Sheets['Tasks'];
                    let range = xlsx.utils.decode_range(sheet['!ref']);
                    for (let row = range.s.r + 1; row <= range.e.r; ++row) {
                        tasks.push({
                            id: sheet[xlsx.utils.encode_cell({ c: 0, r: row })] ? sheet[xlsx.utils.encode_cell({ c: 0, r: row })].v : null,
                            name: sheet[xlsx.utils.encode_cell({ c: 1, r: row })] ? sheet[xlsx.utils.encode_cell({ c: 1, r: row })].v : null,
                            description: sheet[xlsx.utils.encode_cell({ c: 2, r: row })] ? sheet[xlsx.utils.encode_cell({ c: 2, r: row })].v : null,
                            effort: sheet[xlsx.utils.encode_cell({ c: 3, r: row })] ? sheet[xlsx.utils.encode_cell({ c: 3, r: row })].v : null,
                            parentTask: sheet[xlsx.utils.encode_cell({ c: 4, r: row })] ? sheet[xlsx.utils.encode_cell({ c: 4, r: row })].v : null,
                            requirement: sheet[xlsx.utils.encode_cell({ c: 5, r: row })] ? sheet[xlsx.utils.encode_cell({ c: 5, r: row })].v : null
                        });
                    }

                    this.stream.push({ "tasks": tasks });

                    // next workbook
                    workbook = this.workbooks.pop()
                }
            }

        };

        return this.stream;
    }

    getName(): string {
        return 'TasksExcelExtractor';
    }

    /**
     * This extensions has no configuration
     *
     * @return {null}
     */
    getConfiguration(): SyncPipes.IServiceConfiguration {
        return null;
    }

    setConfiguration(config: SyncPipes.IServiceConfiguration): void { }

    /**
     * Return the schema which can be extracted
     *
     * @return {Schema}
     */
    getSchema(): SyncPipes.ISchema {
        return this.schema;
    }

}
