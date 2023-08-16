export function convertRectToPath(content: string): string {
  const rectRegex = /<rect([^>]*)\/?>/g;

  const transformedContent = content.replace(rectRegex, (match, attributes) => {
    const attributesRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
    const rectAttributes: Record<string, string> = {};
  
    let attributeMatch;
    while ((attributeMatch = attributesRegex.exec(attributes)) !== null) {
      const [, attributeName, attributeValue] = attributeMatch;
      rectAttributes[attributeName] = attributeValue;
    }
  
    const { x, y, width, height, rx, ry, ...restAttributes } = rectAttributes;
  
    const topLeftX = Number(x);
    const topLeftY = Number(y);
    const topRightX = topLeftX + Number(width);
    const topRightY = topLeftY;
    const bottomRightX = topRightX;
    const bottomRightY = topLeftY + Number(height);
    const bottomLeftX = topLeftX;
    const bottomLeftY = bottomRightY;
  
    const d = `M ${topLeftX},${topLeftY} H ${topRightX} V ${bottomRightY} H ${bottomLeftX} Z`;
  
    const pathAttributes = Object.entries(restAttributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ");
  
    return `<path d="${d}" ${pathAttributes}></path>`;
  });
  
  return transformedContent;
}