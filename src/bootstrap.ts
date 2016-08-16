import { config } from 'dotenv';
import { Kernel } from './app/index';
import { RequirementsExcelExtractorService } from "./services/requirementsExcelExtractor/service";
import { RequirementsMySQLLoaderService } from "./services/requirementsMysqlLoader/service";
import { TasksExcelExtractorService } from "./services/tasksExcelExtractor/service";
import { TasksMySQLLoaderService } from "./services/tasksMysqlLoader/service";
import { GitHubIssueExtractorService } from "./services/githubIssueExtractor/service";
import { PureIssueLoaderService } from "./services/pureIssueLoader/service";
import { JiraIssueExtractorService } from "./services/jiraIssueExtractor/service";
import { SocioCortexWorkspaceExtractorService } from "./services/scExtractor/workspacesExtractor/workspaceService";
import { SocioCortexTypesExtractorService } from "./services/scExtractor/typesExtractor/typesService";


// parse .env file
config({silent: true});

// init kernel
let kernel = new Kernel({
    "port": process.env.SYNCPIPES_PORT || 3010,
    "mongo": {
        "url": process.env.SYNCPIPES_MONGO_URL || "mongodb://localhost/syncpipes"
    },
    "rabbitmq": {
        "host": process.env.SYNCPIPES_RABBIT_HOST || "localhost",
        "port": process.env.SYNCPIPES_RABBIT_PORT || 5672,
        "user": process.env.SYNCPIPES_RABBIT_USER || "guest",
        "password": process.env.SYNCPIPES_RABBIT_PASSWORD || "guest",
        "vhost": process.env.SYNCPIPES_RABBIT_VHOST || "syncpipes"
    }
});
// load extensions
kernel.loadService(new RequirementsExcelExtractorService());
kernel.loadService(new RequirementsMySQLLoaderService());
kernel.loadService(new TasksExcelExtractorService());
kernel.loadService(new TasksMySQLLoaderService());
kernel.loadService(new GitHubIssueExtractorService());
kernel.loadService(new PureIssueLoaderService());
kernel.loadService(new JiraIssueExtractorService());
kernel.loadService(new SocioCortexTypesExtractorService());

export { kernel }
