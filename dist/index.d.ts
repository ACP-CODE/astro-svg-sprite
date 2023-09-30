import type { AstroIntegration } from 'astro';
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
export declare let executionTime: number;
export default function svgSprite(astroConfig?: PluginConfig): AstroIntegration;
