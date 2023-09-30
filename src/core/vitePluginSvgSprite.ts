export default async function vitePluginSvgSprite(tags:string, compressHTML: boolean) {

  let htmlTags: string;

  if (compressHTML) {
    htmlTags = `${tags.replaceAll('\n', '')}`;
  } else {
    htmlTags = `\n\n<!--astro-svg-sprite-->\n${tags.replace(/(?<!\n)\n\n+(?!\n)/g, '\n')}\n<!--astro-svg-sprite-->\n\t`;
  }

  return {
    name: 'vite-plugin-spriter',
    enforce: 'pre',
    transform(html: string) {
      try {
        return html.replace('</body>', `${htmlTags}</body>`);
      } catch (error) {
        throw error;
      }
    }
  }

};
