# astro-svg-sprite

This is a zero-dependency [Astro Integration](https://docs.astro.build/en/guides/integrations-guide/) that generates a `sprite.svg` from SVG files in your Astro project.

> This integration supports Astro 2.0 and Above.

## Installation

### Quick Install

The `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type `"y"` in the terminal (meaning "yes") for each one.

```dash
## Using NPM
npx astro add astro-svg-sprite
# Using Yarn
yarn astro add astro-svg-sprite
# Using PNPM
pnpm astro add astro-svg-sprite
```

### Manual Install

First, install the `astro-svg-sprite` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```dash
npm install astro-svg-sprite
```

Then, apply this integration to your astro.config.\* file using the integrations property:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import svgSprite from "astro-svg-sprite";

export default defineConfig({
  // ...
  integrations: [svgSprite()],
});
```

## Usage

This is the default configuration of the plugin. You can configure it yourself according to JSDoc.

> **Note:** `emitFile:false` use with caution.
> 
> The current the option just inserts the sprite.svg code into the page through javascript.
>
> 1. In order to improve the user experience, I hope to support direct insertion `sprite code` into the page `<body>` tag in the future.
> 2. I don't know which official API or better way to do this so far.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import svgSprite from "astro-svg-sprite";

export default defineConfig({
  // ...
  integrations: [
    svgSprite({
      /**
       * @type { string | string[] }
       * @default `./src/assets/images/sprite`
       * @description
       * The directory where the SVG files are located, used to generate `sprite.svg` file.
       */
      include: "./src/assets/images/sprite",
      /**
       * @value 'verbose' | 'quiet'
       * @default `verbose`
       * @description
       * Show or hide log information
       */
      mode: "verbose",
      /**
       * @type { boolean | Object }
       * @default `true`
       * @description
       * Generate `sprite.svg` default, otherwise inline the sprite into the webpage.
       */
      emitFile: {
        /**
         * @value 'storage' | 'fast' | 'standard' | 'best'
         * @default 'standard'
         * @description
         * Compression level for the sprite code.
         * - `storage`: No compression applied, the sprite code remains as-is.
         * - `fast`: Apply fast compression to reduce file size with acceptable performance.
         * - `standard`: Apply standard compression for a balance between file size and compression time (default).
         * - `best`: Apply the best compression to achieve the smallest file size, but with potentially longer compression time.
         */
        compress: "standard",
        /**
         * @default `assets/images` relative ./public, real path `./public/assets/images`
         * @description
         * The directory where the generated `sprite.svg` file will be stored.
         */
        path: "assets/images",
      },
    }),
  ],
});
``;
```

> **Supplementary Note:** `svgSprite.emitFile.compress` recommends using the default `standard` mode. The best mode will convert some svg tags into path tags.

I'm considering whether to add the path merging function in the future, because it may bring about visual changes and other flexible features.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.
