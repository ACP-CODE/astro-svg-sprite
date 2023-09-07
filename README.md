<div align="center">

**Welcome! 🎉  Check out the [release notes](./CHANGELOG.md) about new!**

</div>

<div align="center">
<p style="font-size:7rem">🪶</p>
</div>

<h1 align="center">astro-svg-sprite</h1>

<p align="center">A zero-dependency <a href="https://docs.astro.build/en/guides/integrations-guide/">Astro Integration</a> that generates a sprite.svg from SVG files in your Astro project.</p>

## Installation

> The package depends on the Integrations API of Astro 2.0 and above

Auto Install, use `astro add` command-line tool automates the installation for you. `npx`, `yarn` or `pnpm` any you like.

```sh
npx astro add astro-svg-sprite
```

Manual Install, run this in the terminal.

```sh
npm install astro-svg-sprite
```

## Usage

<details>
<summary id="#getting-started"><b>Getting Started</b></summary>
<br>

First, apply this integration to your `astro.config.*` file using the integrations property:

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import svgSprite from "astro-svg-sprite";

export default defineConfig({
  integrations: [svgSprite()],
});
```

Then, store the SVG files to be used for the generated `sprite.svg` in the `src/assets/images/sprite` directory.

```
/
├── astro.config.mjs
├── public
|   └── assets
|       └── images
|           └── sprite.svg
├── src
|   └── assets
|       └── images
|           └── sprite
|               └── 1.svg
|               └── 2.svg
|               └── *.svg
├── tsconfig.json
├── package.json
```

To generate `sprite.svg` file, run this in the terminal.

```sh
npm run dev
```

or

```sh
npm run build
```
<img width="621" alt="preview@2x" src="https://github.com/ACP-CODE/astro-svg-sprite/assets/3423524/ccb73a3a-588a-4a6c-91fc-288d00499dcd" width="100%">

The generated `sprite.svg` file will be stored in the `public/assets/images` directory.

</details>

<details>
<summary><b>Advanced</b></summary>
<br>

Here is an example of an advanced full configuration. With the help of [JSDoc](./dist/index.d.ts), you can easily configure it.

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import svgSprite from "astro-svg-sprite";

export default defineConfig({
  integrations: [
    svgSprite({
      mode: "verbose",
      include: [
        "./src/assets/images/sprite",
        "./src/assets/images",
        "./src/assets",
      ],
      emitFile: {
        compress: "standard",
        path: "assets/images",
      },
    }),
  ],
});
```

Must be known.

- `mode` - `vervose` `quite` Show or hide logger Info.
- `include` - SVG files stored directories.
- `emitFile.compress` - How sprite.svg file will be compressed to stored
- `emitFile.path` - The sprite.svg will stored directory, relative the `public` directory.

> **Note:** `emitFile.compress` recommends using the default `standard` mode. The `best` mode will convert some svg tags into path tags.

</details>

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this Integration.
