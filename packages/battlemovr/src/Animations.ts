import { IOnAction, IOnActions, ISwitchAction } from "./Actions";
import { IOnIntroduction } from "./animators/Introductions";

/**
 * Descriptors of why a battle may finish.
 */
export enum BattleOutcome {
    /**
     * The opponent team fled.
     */
    opponentFled,

    /**
     * The player's team is out of usable actors.
     */
    opponentVictory,

    /**
     * The player team fled.
     */
    playerFled,

    /**
     * The opponent's team is out of usable actors.
     */
    playerVictory,

    /**
     * Both teams are out of usable actors.
     */
    tie,
}

/**
 * Animations for a team's battle activities.
 */
export interface ITeamAnimations {
    /**
     * Action animations, keyed by their type names.
     */
    actions: IOnActions;

    /**
     * Animation for when an actor's health changes.
     */
    healthChange: IOnHealthChange;

    /**
     * Animation for a team introducting itself at the beginning of battle.
     */
    introduction: IOnIntroduction;

    /**
     * Actor switching animations.
     */
    switching: ISwitchingAnimations;
}

/**
 * Animations for various battle activities.
 */
export interface IAnimations {
    /**
     * Animation for when a battle is complete.
     */
    complete: IOnBattleComplete;

    /**
     * Opponent team animations.
     */
    opponent: ITeamAnimations;

    /**
     * Player team animations.
     */
    player: ITeamAnimations;

    /**
     * Animation for a battle starting.
     */
    start: IOnStart;
}

/**
 * Animation for when the battle is complete.
 *
 * @param outcome   Descriptor of what finished the battle.
 * @param onComplete   Callback for when it's safe to dispose of battle info.
 */
export type IOnBattleComplete = (outcome: BattleOutcome, onComplete?: () => void) => void;

/**
 * Animation for when an actor's health changes.
 *
 * @param health   New value for the actor's health.
 * @param onComplete   Callback for when this is done.
 */
export type IOnHealthChange = (health: number, onComplete: () => void) => void;

/**
 * Animation for a battle starting.
 *
 * @param onComplete   Callback for when this is done.
 */
export type IOnStart = (onComplete: () => void) => void;

/**
 * Animations for actors switching positions.
 */
export interface ISwitchingAnimations {
    /**
     * Animation for an actor entering battle.
     */
    enter: IOnEnter;

    /**
     * Animation for an actor exiting battle.
     */
    exit: IOnExit;

    /**
     * Animation for an actor getting knocked out.
     */
    knockout: IOnKnockout;

    /**
     * Animations for actors switching positions.
     */
    switch: IOnAction<ISwitchAction>;
}

/**
 * Animation for when an actor enters battle.
 *
 * @param onComplete   Callback for when this is done.
 */
export type IOnEnter = (onComplete: () => void) => void;

/**
 * Animation for when an actor exits battle.
 *
 * @param onComplete   Callback for when this is done.
 */
export type IOnExit = (onComplete: () => void) => void;

/**
 * Animation for when an actor gets knocked out.
 *
 * @param onComplete   Callback for when this is done.
 */
export type IOnKnockout = (onComplete: () => void) => void;
