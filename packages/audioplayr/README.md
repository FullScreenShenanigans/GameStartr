<!-- Top -->

# AudioPlayr

[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)
![TypeScript: Strict](https://img.shields.io/badge/typescript-strict-brightgreen.svg)
[![NPM version](https://badge.fury.io/js/audioplayr.svg)](http://badge.fury.io/js/audioplayr)
[![Join the chat at https://gitter.im/FullScreenShenanigans/community](https://badges.gitter.im/FullScreenShenanigans/community.svg)](https://gitter.im/FullScreenShenanigans/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Audio playback manager for persistent and on-demand themes and sounds.

<!-- /Top -->

## Usage

### Constructor

```typescript
import { AudioPlayr } from "audioplayr";

const audioPlayer = new AudioPlayr();

audioPlayer.play("Hello world.mp3");
```

#### `nameTransform`

By default, provided names are treated as the `src` file names for their sounds.
You can define a mapping of names to file names by providing a `nameTransform` method.
It should take in a `string` and return a `string`.

```typescript
const audioPlayer = new AudioPlayr({
    nameTransform: (name: string) => `Sounds/${name}.mp3`,
    storage: new ItemsHoldr(),
});

// Plays "Sounds/Hello world.mp3"
audioPlayer.play("Hello world");
```

Internally, all sound names will be transformed with the `nameTransform`.

#### `storage`

You must pass a `storage` parameter to an `AudioPlayr` to keep muted and volume stored locally.

It should have the following methods:

-   `getMuted(): boolean`
-   `getVolume(): boolean`
-   `setMuted(value: boolean)`
-   `setVolume(value: number)`

You can use the provided `wrapNativeStorage` method to have that come from `localStorage`:

```typescript
import { AudioPlayr, wrapNativeStorage } from "audioplayr";

const audioPlayer = new AudioPlayr({
    storage: wrapNativeStorage(localStorage),
});
```

Keys that may be stored are:

-   `"muted"`
-   `"volume"`

### `play`

Parameters:

-   `name: string`: Name of the audio file, used as its `src`.
-   `settings: Object` _(optional)_: Any additional options.

Returns: `Promise<void>` for _starting_ playback.

```typescript
audioPlayer.play("beep.mp3");
```

If the same audio name is played twice, the first will be stopped before the second starts.

```typescript
audioPlayer.play("beep.mp3");
// ...
audioPlayer.play("beep.mp3");
```

`settings` may contain any of the following keys:

-   `alias`:
    Changes what name the sound will be stored under.
    Defaults to the given name.

    As with `play`, if two sounds with the same `alias` are played, the first will be stopped before the second starts.

    ```typescript
    audioPlayer.play("Overworld.mp3", { alias: "Theme" });
    // ...
    audioPlayer.play("Underworld.mp3", { alias: "Theme" });
    ```

    If a `nameTransform` was provided, it's applied to this alias as well.

-   `loop`:
    Whether the sound should loop continuously.
    Defaults to `false`.

    ```typescript
    audioPlayer.play("Bloop.mp3", { loop: true });
    ```

-   `muted`:
    Whether the sound should be muted.
    Defaults to `false`.

    ```typescript
    audioPlayer.play("Boop.mp3", { muted: true });
    ```

    If the `AudioPlayr` is globally muted, `muted: false` will be ignored.

-   `volume`:
    Volume as a number in `[0, 1]`.
    Defaults to `1`.

    ```typescript
    audioPlayer.play("Bop.mp3", { volume: 0.5 });
    ```

    The sound's playing volume is computed as this times the global volume.

### `getMuted`

Returns: `boolean` for whether all sounds are muted.

### `getVolume`

Returns: `number` in `[0, 1]` for global sound volume.

### `setMuted`

Parameters:

-   `muted: boolean`: Whether this all sounds are globally muted.

Returns: `Promise<void>` for setting whether all sounds are globally muted.

### `setVolume`

Parameters:

-   `volume: number`: `number` in `[0, 1]` for global sound volume.

Returns: `Promise<void>` for setting the global sound volume.

### `pauseAll`

Returns: `Promise<void>` for pausing all sounds.

Pauses all sounds in parallel.
This only affects sounds that are playing.

### `resumeAll`

Returns: `Promise<void>` for resuming all sounds.

Resumes all sounds in parallel.
This only affects sounds that are paused.

### `stopAll`

Returns: `Promise<void>` for stopping all sounds.

Stops all sounds.
Any individual sound settings are cleared.

## `hasSound`

Parameters:

-   `alias: string`: Alias to check under.
-   `name: string` _(optional)_: Name the sound must have, if not the same as `alias`.

Returns: `boolean` for whether a sound exists under the alias.

<!-- Development -->

## Development

This repository is a portion of the [EightBittr monorepo](https://raw.githubusercontent.com/FullScreenShenanigans/EightBittr).
See its [docs/Development.md](../../docs/Development.md) for details on how to get started. 💖

### Running Tests

```shell
yarn run test
```

Tests are written in [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai).
Their files are written using alongside source files under `src/` and named `*.test.ts?`.
Whenever you add, remove, or rename a `*.test.t*` file under `src/`, `watch` will re-run `yarn run test:setup` to regenerate the list of static test files in `test/index.html`.
You can open that file in a browser to debug through the tests, or run `yarn test:run` to run them in headless Chrome.

<!-- Maps -->
<!-- /Maps -->

<!-- /Development -->
