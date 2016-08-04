import * as stream from 'stream';
import GitHub = require('github');
import * as SyncPipes from "../../app/index";
// config
import { Configuration } from './Configuration'

interface IComment {
    id: Number;
    body: string;
    user: string;
    created_at: string;
    updated_at: string;
}
interface IIssue {
    id: Number;
    number: Number;
    title: string;
    body: string;
    user: string;
    state: string;
    created_at: string;
    updated_at?: string;
    comments: Array<IComment>;
}
interface IRepository {
    id: Number;
    name: string;
    full_name: string;
    description: string;
    language: string;
    git_url: string;
    watchers_count: Number;
    stargazers_count: Number;
    created_at: string;
    updated_at?: string;
    issues: Array<IIssue>;
}
/**
 * Extracts Repositories and Issues from a github org
 */
export class GitHubIssueExtractorService implements SyncPipes.IExtractorService {

    /**
     * Extractor configuration
     */
    private config: Configuration;

    /**
     * Execution context
     */
    private context: SyncPipes.IPipelineContext;

    /**
     * GitHub client
     */
    private github: any;

    /**
     * Output stream
     */
    private stream: stream.Readable;

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
     * Data is fetched actively
     *
     * @return {ExtractorServiceType}
     */
    getType(): SyncPipes.ExtractorServiceType {
        return SyncPipes.ExtractorServiceType.Active;
    }

    /**
     * Prepare the githubIssueExtractor
     */
    prepare(context: SyncPipes.IPipelineContext, logger: SyncPipes.ILogger): Promise<any> {
        this.context = context;
        this.logger = logger;
        this.github = new GitHub({
            version: "3.0.0"
        });
        this.github.authenticate({
            type: "oauth",
            token: this.config.token
        });
        return Promise.resolve();
    }

    extract(): stream.Readable {
        // create output stream
        this.stream = new stream.Readable({objectMode: true});
        this.stream._read = () => { };
        this.fetchRepositories();

        return this.stream;
    }

    getName(): string {
        return 'GitHubIssueExtractor';
    }

    getConfiguration(): SyncPipes.IServiceConfiguration {
        return new Configuration();
    }

    setConfiguration(config: SyncPipes.IServiceConfiguration): void {
        this.config = <Configuration>config;
    }

    /**
     * Return the schema which can be extracted
     *
     * @return {Schema}
     */
    getSchema(): SyncPipes.ISchema {
        return this.schema;
    }

    /**
     * Fetch all repositories and issues
     *
     * @param next
     */
    private fetchRepositories() {
        if (this.stream === null) {
            throw new Error('No output stream available');
        }
        this.github.getAllPages(this.github.repos.getForOrg, {"org": this.config.organisation, per_page: 100}, (err, repos) => {
            if (err) {
                this.stream.emit('error', err);
                return;
            }
            let handle = (repo) => {
                if (!repo) {
                    this.stream.push(null);
                    return;
                }
                // build object
                let repoObj: IRepository = {
                    id: repo.id,
                    name: repo.name,
                    full_name: repo.full_name,
                    description: repo.description,
                    language: repo.language,
                    git_url: repo.git_url,
                    watchers_count: repo.watchers_count,
                    stargazers_count: repo.stargazers_count,
                    created_at: repo.created_at,
                    updated_at: repo.hasOwnProperty('updated_at') ? repo.updated_at : null,
                    issues: []
                };
                this.fetchIssuesForRepo(repoObj.name).then((issues) => {
                    repoObj.issues = issues;
                    // push to stream
                    this.stream.push([repoObj]);
                    // get next
                    handle(repos.pop());
                }).catch((err) => {
                    this.stream.emit('error', err);
                });
            };
            handle(repos.pop());
        });
    }

    private fetchIssuesForRepo(repo: string): Promise<Array<IIssue>> {
        return new Promise<any>((resolve, reject) => {
            let params = {user: this.config.organisation, repo: repo, per_page: 100, state: 'all'};
            this.github.getAllPages(this.github.issues.getForRepo, params, (err, rawIssues) => {
                if (err) {
                    reject(err);
                    return;
                }
                let issues = [];
                let handle = (issue) => {
                    if (!issue) {
                        resolve(issues);
                        return;
                    }
                    // build object
                    let issueObj: IIssue = {
                        id: issue.id,
                        number: issue.number,
                        title: issue.title,
                        body: issue.body,
                        user: issue.user.login,
                        state: issue.state,
                        created_at: issue.created_at,
                        updated_at: issue.hasOwnProperty('updated_at') ? issue.updated_at : null,
                        comments: []
                    };
                    this.fetchCommentsForIssue(repo, issueObj.number).then((comments) => {
                        issueObj.comments = comments;
                        issues.push(issueObj);
                        // get next
                        handle(rawIssues.pop());
                    }).catch((err) => {
                        this.stream.emit('error', err);
                    });
                };
                handle(rawIssues.pop());
            });
        });
    }

    private fetchCommentsForIssue(repo: string, issue: Number): Promise<Array<IComment>> {
        return new Promise<any>((resolve, reject) => {
            let params = {
                user: this.config.organisation,
                repo: repo,
                number: issue,
                per_page: 100
            };
            this.github.getAllPages(this.github.issues.getComments, params, (err, response) => {
                if (err) {
                    reject(err);
                    return;
                }
                let comments = new Array<IComment>();
                for (let comment of response) {
                    comments.push({
                        id: comment.id,
                        body: comment.body,
                        user: comment.user.login,
                        created_at: comment.created_at,
                        updated_at: comment.updated_at,
                    });
                }
                resolve(comments);
            });
        });
    }
}
