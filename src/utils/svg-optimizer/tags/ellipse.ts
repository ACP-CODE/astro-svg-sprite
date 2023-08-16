export function convertEllipseToPath(content: string): string {
  const ellipseRegex = /<ellipse([^>]*)\/?>/g;

  const transformedContent = content.replace(ellipseRegex, (match, attributes) => {
    const attributesRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
    const ellipseAttributes: Record<string, string> = {};
  
    let attributeMatch;
    while ((attributeMatch = attributesRegex.exec(attributes)) !== null) {
      const [, attributeName, attributeValue] = attributeMatch;
      ellipseAttributes[attributeName] = attributeValue;
    }
  
    const { cx, cy, rx, ry, ...restAttributes } = ellipseAttributes;
  
    const d = `M${Number(cx) - Number(rx)},${cy}A${rx},${ry} 0 1,0 ${Number(cx) + Number(rx)},${cy}A${rx},${ry} 0 1,0 ${Number(cx) - Number(rx)},${cy}`;
  
    const pathAttributes = Object.entries(restAttributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ");
  
    return `<path d="${d}" ${pathAttributes}></path>`;
  });

  return transformedContent;
}