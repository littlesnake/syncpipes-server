import * as stream from 'stream';
import * as SyncPipes from "../../app/index";
import * as xlsx from 'xlsx';

interface IRequirement {
    id: string;
    name: string;
    info: string;
    description: string;
}

interface ITestCase {
    id: string;
    description: string;
}

/**
 * Extracts Repositories and Issues from a github org
 */
export class RequirementsExcelExtractorService implements SyncPipes.IExtractorService {

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
        this.workbooks = [];
        // load xlsx file(s) from context
        for (let file of context.inputData) {
            this.workbooks.push(xlsx.read(file, {"type": "buffer"}));
        }
        // resolve immediately, since no async work is done
        return Promise.resolve();
    }


    extract(): stream.Readable {

        // create output stream
        this.stream = new stream.Readable({objectMode: true});
        this.stream._read = () => {

            if (this.workbooks.length === 0) {
                this.stream.push(null);
            } else {
                let workbook = this.workbooks.pop();
                while (workbook != null) {
                    let requirements = new Array<IRequirement>();
                    let tests = new Array<ITestCase>();
                    // get requirements
                    let sheet = workbook.Sheets['Requirement'];
                    let range = xlsx.utils.decode_range(sheet['!ref']);
                    for (let row = range.s.r+1; row <= range.e.r; ++row) {
                        requirements.push({
                            id: sheet[xlsx.utils.encode_cell({c: 0, r: row})] ? sheet[xlsx.utils.encode_cell({c: 0, r: row})].v : null,
                            name: sheet[xlsx.utils.encode_cell({c: 1, r: row})] ? sheet[xlsx.utils.encode_cell({c: 1, r: row})].v : null,
                            info: sheet[xlsx.utils.encode_cell({c: 2, r: row})] ? sheet[xlsx.utils.encode_cell({c: 2, r: row})].v : null,
                            description: sheet[xlsx.utils.encode_cell({c: 3, r: row})] ? sheet[xlsx.utils.encode_cell({c: 3, r: row})].v : null
                        });
                    }
                    // get tests
                    sheet = workbook.Sheets['TestCases'];
                    range = xlsx.utils.decode_range(sheet['!ref']);
                    for (let row = range.s.r+1; row <= range.e.r; ++row) {
                        tests.push({
                            id: sheet[xlsx.utils.encode_cell({c: 0, r: row})].v,
                            description: sheet[xlsx.utils.encode_cell({c: 1, r: row})].v,
                        });
                    }
                    this.stream.push({"requirements": requirements, "test-cases": tests});
                    // next workbook
                    workbook = this.workbooks.pop()
                }
            }

        };


        return this.stream;
    }

    getName(): string {
        return 'RequirementsExcelExtractor';
    }

    /**
     * This extensions has no configuration
     *
     * @return {null}
     */
    getConfiguration(): SyncPipes.IServiceConfiguration {
        return null;
    }

    setConfiguration(config: SyncPipes.IServiceConfiguration): void {}

    /**
     * Return the schema which can be extracted
     *
     * @return {Schema}
     */
    getSchema(): SyncPipes.ISchema {
        return this.schema;
    }

}
