import { ILogger } from "./logger";
import { ISettings } from "./settings";

/**
 * Implementation of the abstract Command class.
 * 
 * @param TArgs   Type of the command's arguments.
 * @param TResults   Type of the results.
 */
export interface ICommandClass<TArgs, TResult> {
    /**
     * Initializes a new instance of a Command subclass.
     * 
     * @param args   Arguments for the command.
     * @param logger   Logs on important events.
     * @param settings   User settings for the manager.
     */
    new(args: TArgs, logger: ILogger, settings: ISettings): Command<TArgs, TResult>;
}

/**
 * Executable management command.
 * 
 * @param TArgs   Type of the command's arguments.
 * @param TResults   Type of the results.
 */
export abstract class Command<TArgs, TResults> {
    /**
     * Arguments for the command.
     */
    protected readonly args: TArgs;

    /**
     * Logs on important events.
     */
    protected readonly logger: ILogger;

    /**
     * User settings for the manager.
     */
    protected readonly settings: ISettings;

    /**
     * Initializes a new instance of the Command class.
     * 
     * @param args   Arguments for the command.
     * @param logger   Logs on important events.
     * @param settings   User settings for the manager.
     */
    public constructor(args: TArgs, logger: ILogger, settings: ISettings) {
        this.args = args;
        this.logger = logger;
        this.settings = settings;
    }

    /**
     * Executes the command.
     * 
     * @param args   Arguments for the command.
     * @returns A Promise for the command's results.
     */
    public abstract execute(args?: TArgs): Promise<TResults>;

    /**
     * Creates and runs a sub-command.
     * 
     * @type TSubArgs   Type of the sub-command's arguments.
     * @type TSubResults   Type the sub-command returns.
     * @type TSubCommand   Type of the sub-command.
     * @param command   Sub-command class to run.
     * @param args   Args for the sub-command.
     */
    protected subroutine<TSubArgs, TSubResults, TSubCommand extends ICommandClass<TSubArgs, TSubResults>>
        (command: TSubCommand, args: TSubArgs): Promise<TSubResults> {
        return new command(args, this.logger, this.settings).execute();
    }
}
