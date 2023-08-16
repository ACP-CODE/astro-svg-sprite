import { parsePoints } from "../utils/parse-points";

export function convertPolygonToPath(content: string): string {
  const polygonRegex = /<polygon([^>]*)\/?>/g;

  const transformedContent = content.replace(polygonRegex, (match, attributes) => {
    const attributesRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
    const polygonAttributes: Record<string, string> = {};
  
    let attributeMatch;
    while ((attributeMatch = attributesRegex.exec(attributes)) !== null) {
      const [, attributeName, attributeValue] = attributeMatch;
      polygonAttributes[attributeName] = attributeValue;
    }
  
    const { points, ...restAttributes } = polygonAttributes;
  
    const d = `M ${parsePoints(points).join(" ")} Z`;
  
    const pathAttributes = Object.entries(restAttributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ");
  
    return `<path d="${d}" ${pathAttributes}></path>`;
  });

  return transformedContent;
}