/**
 * 获取 <svg></svg> 标签之间的内容
 * @param svgContent 
 * @returns 
 */
export default function extractSvgContent(svgContent: string): string {
  const startTag = '<svg';
  const endTag = '</svg>';

  const startIndex = svgContent.indexOf(startTag);
  const endIndex = svgContent.indexOf(endTag);

  if (startIndex !== -1 && endIndex !== -1) {
    const startTagEndIndex = svgContent.indexOf('>', startIndex);
    const content = svgContent.slice(startTagEndIndex + 1, endIndex).trim();
    return content;
  }

  return '';
}