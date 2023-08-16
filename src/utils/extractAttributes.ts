/**
 * 根据 SVG 文件内容抓起 viewBox，fill 属性以便赋予 <symbol></symbol> 标签
 * @param content 
 * @returns 
 */

export default function extractAttributes(content: string): string {
  const viewBoxPattern = /viewBox="([^"]*)"/;
  const fillPattern = /fill="([^"]*)"/;

  const viewBoxMatch = content.match(viewBoxPattern);
  const fillMatch = content.match(fillPattern);

  const viewBoxAttr = viewBoxMatch && viewBoxMatch[0] ? viewBoxMatch[0] : '';
  const fillAttr = fillMatch && fillMatch[0] ? fillMatch[0] : '';

  return `${viewBoxAttr} ${fillAttr}`;
}