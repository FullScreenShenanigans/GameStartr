import { FPSAnalyzr, IFPSAnalyzr } from "fpsanalyzr";

import { IGamesRunnr, IGamesRunnrSettings, ITriggerCallback, IUpkeepScheduler } from "./IGamesRunnr";

/**
 * Runs a series of callbacks on a timed interval.
 */
export class GamesRunnr implements IGamesRunnr {
    /**
     * Storage and analysis for framerate measurements.
     */
    public readonly fpsAnalyzer: IFPSAnalyzr = new FPSAnalyzr();

    /**
     * Functions to be run, in order, on each upkeep.
     */
    private readonly games: Function[];

    /**
     * Optional trigger Function for this.close.
     */
    private readonly onClose?: ITriggerCallback;

    /**
     * Optional trigger Function for this.pause.
     */
    private readonly onPause?: ITriggerCallback;

    /**
     * Optional trigger Function for this.play.
     */
    private readonly onPlay?: ITriggerCallback;

    /**
     * Function used to schedule the next upkeep, such as setTimeout.
     */
    private readonly upkeepScheduler: IUpkeepScheduler;

    /**
     * Function used to cancel the next upkeep, such as clearTimeout
     */
    private readonly upkeepCanceller: (handle: number) => void;

    /**
     * Reference to the next upkeep, such as setTimeout's returned int.
     */
    private upkeepNext: number;

    /**
     * Whether the game is currently paused.
     */
    private paused: boolean;

    /**
     * The amount of time, in milliseconds, between each upkeep.
     */
    private interval: number;

    /**
     * The playback rate multiplier (defaults to 1, for no change).
     */
    private speed: number;

    /**
     * The actual speed, as (1 / speed) * interval.
     */
    private intervalReal: number;

    /**
     * Initializes a new instance of the GamesRunnr class.
     *
     * @param settings   Settings to be used for initialization.
     */
    public constructor(settings: IGamesRunnrSettings = {}) {
        this.games = settings.games || [];
        this.interval = settings.interval || 1000 / 60;
        this.speed = settings.speed || 1;
        this.onClose = settings.onClose;
        this.onPause = settings.onPause;
        this.onPlay = settings.onPlay;

        this.paused = true;

        this.upkeepScheduler = settings.upkeepScheduler || setTimeout.bind(window);
        this.upkeepCanceller = settings.upkeepCanceller || clearTimeout.bind(window);

        this.setIntervalReal();
    }

    /**
     * @returns Whether this is paused.
     */
    public getPaused(): boolean {
        return this.paused;
    }

    /**
     * @returns The Array of game Functions.
     */
    public getGames(): Function[] {
        return this.games;
    }

    /**
     * @returns The interval between upkeeps.
     */
    public getInterval(): number {
        return this.interval;
    }

    /**
     * @returns The speed multiplier being applied to the interval.
     */
    public getSpeed(): number {
        return this.speed;
    }

    /**
     * Meaty function, run every <interval*speed> milliseconds, to mark an FPS
     * measurement and run every game once.
     */
    public upkeep = (): void => {
        if (this.paused) {
            return;
        }

        this.upkeepNext = this.upkeepScheduler(this.upkeep, this.intervalReal);
        this.runAllGames();
        this.fpsAnalyzer.measure();
    }

    /**
     * A utility for this.upkeep that calls the same games.forEach(run), timing
     * the total execution time.
     *
     * @returns The total time spent, in milliseconds.
     */
    public upkeepTimed(): number {
        const now: number = this.fpsAnalyzer.getTimestamp();

        this.runAllGames();

        return this.fpsAnalyzer.getTimestamp() - now;
    }

    /**
     * Runs onClose.
     */
    public close(): void {
        if (this.onClose) {
            this.onClose();
        }
    }

    /**
     * Continues execution of this.upkeep by calling it. If an onPlay has been
     * defined, it's called before.
     */
    public play(): void {
        if (!this.paused) {
            return;
        }

        this.paused = false;

        if (this.onPlay) {
            this.onPlay();
        }

        this.upkeep();
    }

    /**
     * Stops execution of this.upkeep, and cancels the next call. If an onPause
     * has been defined, it's called after.
     */
    public pause(): void {
        if (this.paused) {
            return;
        }
        this.paused = true;

        if (this.onPause) {
            this.onPause();
        }

        this.upkeepCanceller(this.upkeepNext);
    }

    /**
     * Calls upkeep a <num or 1> number of times, immediately.
     *
     * @param num   How many times to upkeep (by default, 1).
     */
    public step(times: number = 1): void {
        this.play();
        this.pause();
        if (times > 0) {
            this.step(times - 1);
        }
    }

    /**
     * Toggles whether this is paused, and calls the appropriate Function.
     */
    public togglePause(): void {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    /**
     * Sets the interval between between upkeeps.
     *
     * @param interval   The new time interval in milliseconds.
     */
    public setInterval(interval: number): void {
        if (isNaN(interval)) {
            throw new Error(`Invalid interval given to setInterval: '${interval}'.`);
        }

        this.interval = interval;
        this.setIntervalReal();
    }

    /**
     * Sets the speed multiplier for the interval.
     *
     * @param speed   The new speed multiplier.
     */
    public setSpeed(speed: number): void {
        if (isNaN(speed)) {
            throw new Error(`Invalid speed given to setSpeed: '${speed}'.`);
        }

        this.speed = speed;
        this.setIntervalReal();
    }

    /**
     * Sets the intervalReal variable, which is interval / speed.
     */
    private setIntervalReal(): void {
        this.intervalReal = this.interval / this.speed;
    }

    /**
     * Runs all games in this.games.
     */
    private runAllGames(): void {
        for (const game of this.games) {
            game();
        }
    }
}
