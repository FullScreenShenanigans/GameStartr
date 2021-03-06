// This file is referenced in EightBittr documentation.
// If you change it here, please change it there as well!

import { AreaSpawnr } from "areaspawnr";
import { factory, member } from "babyioc";
import { FpsAnalyzr } from "fpsanalyzr";
import { FrameTickr } from "frametickr";
import { GroupHoldr } from "groupholdr";
import { InputWritr } from "inputwritr";
import { ItemsHoldr } from "itemsholdr";
import { MapsCreatr } from "mapscreatr";
import { MapScreenr } from "mapscreenr";
import { ObjectMakr } from "objectmakr";
import { PixelDrawr } from "pixeldrawr";
import { PixelRendr } from "pixelrendr";
import { QuadsKeepr } from "quadskeepr";
import { ThingHittr } from "thinghittr";
import { TimeHandlr } from "timehandlr";

import { createAreaSpawner } from "./creators/createAreaSpawner";
import { createCanvas } from "./creators/createCanvas";
import { createContainer } from "./creators/createContainer";
import { createFpsAnalyzer } from "./creators/createFpsAnalyzer";
import { createFrameTicker } from "./creators/createFrameTicker";
import { createGroupHolder } from "./creators/createGroupHolder";
import { createInputWriter } from "./creators/createInputWriter";
import { createItemsHolder } from "./creators/createItemsHolder";
import { createMapsCreator } from "./creators/createMapsCreator";
import { createMapScreener } from "./creators/createMapScreener";
import { createObjectMaker } from "./creators/createObjectMaker";
import { createPixelDrawer } from "./creators/createPixelDrawer";
import { createPixelRender } from "./creators/createPixelRender";
import { createQuadsKeeper } from "./creators/createQuadsKeeper";
import { createThingHitter } from "./creators/createThingHitter";
import { createTimeHandler } from "./creators/createTimeHandler";
import { Collisions } from "./sections/Collisions";
import { Death } from "./sections/Death";
import { Frames } from "./sections/Frames";
import { Graphics } from "./sections/Graphics";
import { Groups } from "./sections/Groups";
import { Inputs } from "./sections/Inputs";
import { Items } from "./sections/Items";
import { Maintenance } from "./sections/Maintenance";
import { Maps } from "./sections/Maps";
import { Objects } from "./sections/Objects";
import { Physics } from "./sections/Physics";
import { Quadrants } from "./sections/Quadrants";
import { Scrolling } from "./sections/Scrolling";
import { Things } from "./sections/Things";
import { Timing } from "./sections/Timing";
import { Utilities } from "./sections/Utilities";
import { IEightBittrConstructorSettings, IEightBittrSettings, IThing } from "./types";

/**
 * Bare-bones, highly modular game engine for 2D 8-bit games.
 */
export class EightBittr {
    /**
     * Screen and component reset settings.
     */
    public readonly settings: IEightBittrSettings;

    /**
     * Loads EightBittr maps to spawn and unspawn areas on demand.
     */
    @factory(createAreaSpawner)
    public readonly areaSpawner: AreaSpawnr;

    /**
     * Storage and analysis for framerate measurements.
     */
    @factory(createFpsAnalyzer)
    public readonly fpsAnalyzer: FpsAnalyzr;

    /**
     * Runs a series of callbacks on a timed interval.
     */
    @factory(createFrameTicker)
    public readonly frameTicker: FrameTickr;

    /**
     * A general storage abstraction for keyed containers of items.
     */
    @factory(createGroupHolder)
    public readonly groupHolder: GroupHoldr<any>;

    /**
     * Pipes input events to action callbacks.
     */
    @factory(createInputWriter)
    public readonly inputWriter: InputWritr;

    /**
     * Cache-based wrapper around localStorage.
     */
    @factory(createItemsHolder)
    public readonly itemsHolder: ItemsHoldr;

    /**
     * Storage container and lazy loader for EightBittr maps.
     */
    @factory(createMapsCreator)
    public readonly mapsCreator: MapsCreatr;

    /**
     * A simple container for Map attributes given by switching to an Area.
     */
    @factory(createMapScreener)
    public readonly mapScreener: MapScreenr;

    /**
     * A abstract factory for dynamic attribute-based JavaScript classes.
     */
    @factory(createObjectMaker)
    public readonly objectMaker: ObjectMakr;

    /**
     * Real-time scene drawer for PixelRendr sprites.
     */
    @factory(createPixelDrawer)
    public readonly pixelDrawer: PixelDrawr;

    /**
     * Compresses images into text blobs in real time with fast cached lookups.
     */
    @factory(createPixelRender)
    public readonly pixelRender: PixelRendr;

    /**
     * Adjustable quadrant-based collision detection.
     */
    @factory(createQuadsKeeper)
    public readonly quadsKeeper: QuadsKeepr<IThing>;

    /**
     * Thing collision detection automator that unifies GroupHoldr and QuadsKeepr.
     */
    @factory(createThingHitter)
    public readonly thingHitter: ThingHittr;

    /**
     * Flexible, pausable alternative to setTimeout.
     */
    @factory(createTimeHandler)
    public readonly timeHandler: TimeHandlr;

    /**
     * Checkers and callbacks for Thing collisions.
     */
    @member(Collisions)
    public readonly collisions: Collisions<this>;

    /**
     * Removes Things from the game.
     */
    @member(Death)
    public readonly death: Death<this>;

    /**
     * Logic to advance each frame of the game.
     */
    @member(Frames)
    public readonly frames: Frames<this>;

    /**
     * Thing pixel data and properties.
     */
    @member(Graphics)
    public readonly graphics: Graphics<this>;

    /**
     * Collection settings for IThings group names.
     */
    @member(Groups)
    public readonly groups: Groups<this>;

    /**
     * User input filtering and handling.
     */
    @member(Inputs)
    public readonly inputs: Inputs<this>;

    /**
     * Storage keys and value settings.
     */
    @member(Items)
    public readonly items: Items<this>;

    /**
     * Enters and spawns map areas.
     */
    @member(Maps)
    public readonly maps: Maps<this>;

    /**
     * Update logic for Things in game ticks.
     */
    @member(Maintenance)
    public readonly maintenance: Maintenance<this>;

    /**
     * Raw ObjectMakr factory settings.
     */
    @member(Objects)
    public readonly objects: Objects<this>;

    /**
     * Physics functions to move Things around.
     */
    @member(Physics)
    public readonly physics: Physics<this>;

    /**
     * Arranges game physics quadrants.
     */
    @member(Quadrants)
    public readonly quadrants: Quadrants<this>;

    /**
     * Moves the screen and Things in it.
     */
    @member(Scrolling)
    public readonly scrolling: Scrolling<this>;

    /**
     * Adds and processes new Things into the game.
     */
    @member(Things)
    public readonly things: Things<this>;

    /**
     * Timing constants for delayed events.
     */
    @member(Timing)
    public readonly timing: Timing<this>;

    /**
     * Miscellaneous utility functions.
     */
    @member(Utilities)
    public readonly utilities: Utilities<this>;

    /**
     * Canvas upon which the game's screen is constantly drawn.
     */
    @factory(createCanvas)
    public readonly canvas: HTMLCanvasElement;

    /**
     * HTML container containing all game elements.
     */
    @factory(createContainer)
    public readonly container: HTMLElement;

    /**
     * Initializes a new instance of the EightBittr class.
     *
     * @param settings   Settings to be used for initialization.
     */
    public constructor(settings: IEightBittrConstructorSettings) {
        this.settings = {
            components: {},
            ...settings,
        };
    }
}
