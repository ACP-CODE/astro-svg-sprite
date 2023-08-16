import { optimizeSvgSprite } from './svg-optimizer'

function removeTagsFromSvgContent(content: string): string {
  const tagsToRemove = ["g", "defs", "metadata", "title", 'desc', 'marker']; // 添加其他需要移除的标签
  for (const tag of tagsToRemove) {
    const openTagRegex = new RegExp(`<${tag}\\b[^>]*>`, "g");
    const closeTagRegex = new RegExp(`<\/${tag}\\s*>`, "g");
    content = content.replace(openTagRegex, "");
    content = content.replace(closeTagRegex, "");
  }
  return content;
}

function compressFast(content: string): string {
  return content
    // 删除空格、制表符
    .replace(/>\s+</g, '><')
    .replace(/\s+(?==|>)/g, '')
    .replace(/(\r\n|\n|\r|\t)/g, '');
}

function compressStandard(content: string): string {
  content = compressFast(content);
  content = removeTagsFromSvgContent(content);
  return content
    // 删除空标签
    .replace(/<(\w+)><\/\1>/g, '')
    .replace(/"/g, '\'')

    // 压缩属性
    .replace(/([a-zA-Z-]+)\s*=\s*([a-zA-Z0-9-]+)/g, '$1=$2')
    // 压缩内联 CSS 样式
    .replace(/style="([^"]+)"/g, (match, style) => {
      const css = style.replace(/(\r\n|\n|\r|\t)/gm, '').replace(/ +/g, ' ');
      return `style="${css}"`;
    });
}

function compressBest(content: string): string {
  content = compressStandard(content);
  content = optimizeSvgSprite(content);
  return content;
}

export { compressFast, compressStandard, compressBest }