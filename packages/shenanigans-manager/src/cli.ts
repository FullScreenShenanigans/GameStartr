import * as minimist from "minimist";
import * as moment from "moment";
import * as path from "path";

import { ICommandArgs } from "./command";
import { CommandSearcher } from "./commandSearcher";
import { ConsoleLogger } from "./loggers/consoleLogger";
import { NameTransformer } from "./nameTransformer";
import { Runner } from "./runner";
import { settings } from "./settings";

/**
 * Parsed args from the CLI.
 */
interface IParsedArgs extends minimist.ParsedArgs {
    /**
     * Command to be run.
     */
    command: string;
}

const startTime: moment.Moment = moment();

const args: IParsedArgs & ICommandArgs = {
    directory: process.cwd(),
    ...minimist(process.argv.slice(2)) as IParsedArgs & Partial<ICommandArgs>
};

if (!args.command) {
    throw new Error("Requires --command.");
}

(async (): Promise<void> => {
    const runner: Runner = new Runner(
        new CommandSearcher(
            [path.join(__dirname, "commands")],
            new NameTransformer()));

    try {
        const result: boolean = await runner.run({
            args,
            command: args.command,
            logger: new ConsoleLogger(),
            userSettings: settings
        });

        if (!result) {
            console.error(`Could not find command '${args.command}'...`);
            return;
        }

        console.log("Success?");
    } catch (error) {
        console.error(error.stack || error.message);
    }

    const endTime: moment.Moment = moment();
    const duration: moment.Duration = moment.duration(endTime.diff(startTime));
    console.log(`\nshenanigans-manager took ${duration.humanize()}.`);
})();
