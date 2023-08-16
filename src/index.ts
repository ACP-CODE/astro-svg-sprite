import type { AstroIntegration } from 'astro';

import { packageName } from './data/pkg-name';
import { parseSvgs, generateSprite, optimizeSvgContent, writeFile, printFileStats } from './core';
import { getEntryPath, getOutputPath } from './paths';
import { hasSvgFilesInDirectory } from './utils';

type EntryType = string | string[];

export interface PluginConfig {
	/**
	* @docs
	* @name svgSprite.mode
	* @default `verbose`
	* @description
	* Show or hide log information
	*/
	mode?: 'verbose' | 'quiet';
	/**
	 * @docs
	 * @name svgSprite.include
	 * @type { string | string[] }
	 * @default `./src/assets/images/sprite`
	 * @description
	 * The directory where the SVG files are located, used to generate `sprite.svg` file.
	 */
	include?: EntryType;
	/**
	 * @docs
	 * @name svgSprite.emitFile
	 * @type { boolean | Object }
	 * @default `true`
	 * @description
	 * Generate `sprite.svg` default, otherwise inline the sprite into the webpage.
	 */
	emitFile?: EmitFileOptions | boolean;
};

export interface EmitFileOptions {
	/**
	 * @docs
	 * @name svgSprite.emitFile.compress
	 * @default 'standard'
	 * @description
	 * Compression level for the sprite code.
	 * - `storage`: No compression applied, the sprite code remains as-is.
	 * - `fast`: Apply fast compression to reduce file size with acceptable performance.
	 * - `standard`: Apply standard compression for a balance between file size and compression time (default).
	 * - `best`: Apply the best compression to achieve the smallest file size, but with potentially longer compression time.
	 */
	compress?: 'storage' | 'fast' | 'standard' | 'best';
	/**
	 * @docs
	 * @name svgSprite.emitFile.path
	 * @default `assets/images` relative ./public, real path `./public/assets/images`
	 * @description
	 * The directory where the generated `sprite.svg` file will be stored.
	 */
	path?: string;
};

const defaultConfig: PluginConfig = {
	include: './src/assets/images/sprite',
	mode: 'verbose',
	emitFile: {
		compress: 'standard',
		path: 'assets/images'
	}
};

export default function svgSprite(astroConfig: PluginConfig = {}): AstroIntegration {
	const mergedConfig: PluginConfig = { ...defaultConfig, ...astroConfig };
	return {
		name: packageName,
		hooks: {
			'astro:config:setup': ({ injectScript }) => {
				const entry = getEntryPath(astroConfig.include);
				if (!astroConfig.emitFile) {
					const icons = parseSvgs(entry);
					const sprite = optimizeSvgContent(generateSprite(icons), (mergedConfig.emitFile as EmitFileOptions)?.compress);
					injectScript('page', `document.body.insertAdjacentHTML("beforeend", "${sprite}")`)
				}
			},

			'astro:config:done': async ({ config }) => {
				const startTime = process.hrtime();

				const entry = getEntryPath(astroConfig.include);
				const output = getOutputPath((astroConfig.emitFile as EmitFileOptions)?.path);
				const filePath = `${config.publicDir.pathname}${output}/sprite.svg`;

				const icons = parseSvgs(entry);
				const sprite = optimizeSvgContent(generateSprite(icons), (mergedConfig.emitFile as EmitFileOptions)?.compress);

				if (hasSvgFilesInDirectory(entry)) {
					if (astroConfig.emitFile || mergedConfig.emitFile) {
						writeFile(filePath, sprite);
						if (mergedConfig.mode !== 'quiet') {
							printFileStats(filePath, output, startTime);
						}
					}
				}

			},
		},
	};
}