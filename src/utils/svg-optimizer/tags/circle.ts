export function convertCircleToPath(content: string): string {
  const circleRegex = /<circle([^>]*)\/?>/g;

  const transformedContent = content.replace(circleRegex, (match, attributes) => {
    const attributesRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
    const circleAttributes: Record<string, string> = {};

    let attributeMatch;
    while ((attributeMatch = attributesRegex.exec(attributes)) !== null) {
      const [, attributeName, attributeValue] = attributeMatch;
      circleAttributes[attributeName] = attributeValue;
    }

    const { cx, cy, r, ...restAttributes } = circleAttributes;

    const d = `M${Number(cx) - Number(r)},${cy}A${r},${r} 0 1,0 ${Number(cx) + Number(r)},${cy}A${r},${r} 0 1,0 ${Number(cx) - Number(r)},${cy}`;

    const pathAttributes = Object.entries(restAttributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ");

    return `<path d="${d}" ${pathAttributes}></path>`;
  });

  return transformedContent;
}