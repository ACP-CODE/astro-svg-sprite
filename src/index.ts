import type { AstroConfig, AstroIntegration } from 'astro';

import { packageName } from './data/pkg-name';
import { parseSvgs, generateSprite, optimizeSvgContent, writeFile, printFileStats } from './core';
import { hasSvgFilesInDirectory, measureExecutionTime } from './utils';
import { getEntryPath, getOutputPath } from './paths';

export interface PluginConfig {
  /**
   * @description
   * [Optional] Show or hide log information.
   * @default `verbose`
   */
  mode?: 'verbose' | 'quiet';
  /**
   * @description
   * [Required] The directory where the SVG files are located, used to generate `sprite.svg` file.
   * @default `./src/assets/images/sprite`
   */
  include?: string | string[];
  /**
   * @description
   * [Required] Generate `sprite.svg` default, otherwise inline the sprite into the webpage.
   * @default `true`
   */
  emitFile?: EmitFileOptions | boolean;
}
export interface EmitFileOptions {
  /**
   * @description
   * [Optional] Compression level for the sprite code.
   * - `storage` No compression, maintains the sprite code as-is.
   * - `fast` Fast compression for reduced file size with acceptable performance.
   * - `standard` Standard compression for a balance between file size and compression time (default).
   * - `best` Best compression for the smallest file size, but with potentially longer compression time.
   * @default 'standard'
   */
  compress?: 'storage' | 'fast' | 'standard' | 'best';
  /**
   * @description
   * [Required] The directory where the generated `sprite.svg` file will be stored.
   * @default `assets/images` - path relative to `./public/`
   */
  path?: string;
}
const config: PluginConfig = {
  emitFile: true,
}
const defaultConfig: PluginConfig = {
  include: './src/assets/images/sprite',
  mode: 'verbose',
  emitFile: {
    compress: 'standard',
    path: 'assets/images'
  } as EmitFileOptions,
  ...config,
};

export let executionTime: number;
export default function svgSprite(astroConfig: PluginConfig = {}): AstroIntegration {

  let filePath: string;

  let config: AstroConfig;
  const mergedConfig: PluginConfig = { ...defaultConfig, ...astroConfig };

  const entry = getEntryPath(astroConfig.include);
  const output = getOutputPath((astroConfig.emitFile as EmitFileOptions)?.path);

  const icons = parseSvgs(entry);
  const sprite = optimizeSvgContent(generateSprite(icons), (mergedConfig.emitFile as EmitFileOptions)?.compress);

  function emitFile() {
    if (hasSvgFilesInDirectory(entry)) {
      if (astroConfig.emitFile || mergedConfig.emitFile) {
        if(icons.length!==0){
          writeFile(filePath, sprite);
        }
        if (mergedConfig.mode !== 'quiet') {
          printFileStats(filePath, output);
        }
      }
    }
  }

  return {
    name: packageName,
    hooks: {
      'astro:config:setup': async ({ injectScript }) => {
        if (astroConfig?.emitFile !== undefined || astroConfig?.emitFile === false ) {
          injectScript('page', `document.body.insertAdjacentHTML("beforeend", "${sprite}")`)
        }
      },
      'astro:config:done': async ({ config: cfg }) => {
        config = cfg;
        filePath = `${config.publicDir.pathname}${output}/sprite.svg`;
      },
      'astro:server:start': async () => {
        executionTime = measureExecutionTime(emitFile);
      },
      'astro:build:start': async () => {
        executionTime = measureExecutionTime(emitFile);
      }
    },
  };
}
