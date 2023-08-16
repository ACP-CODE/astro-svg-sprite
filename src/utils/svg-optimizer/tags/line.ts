export function convertLineToPath(content: string): string {
  const lineRegex = /<line([^>]*)\/?>/g;

  const transformedContent = content.replace(lineRegex, (match, attributes) => {
    const attributesRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
    const lineAttributes: Record<string, string> = {};

    let attributeMatch;
    while ((attributeMatch = attributesRegex.exec(attributes)) !== null) {
      const [, attributeName, attributeValue] = attributeMatch;
      lineAttributes[attributeName] = attributeValue;
    }

    const { x1, y1, x2, y2, ...restAttributes } = lineAttributes;

    const d = `M ${x1},${y1} L ${x2},${y2}`;

    const pathAttributes = Object.entries(restAttributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ");

    return `<path d="${d}" ${pathAttributes}></path>`;
  });

  return transformedContent;
}