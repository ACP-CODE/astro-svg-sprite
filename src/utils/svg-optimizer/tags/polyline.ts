import { parsePoints } from "../utils/parse-points";

export function convertPolylineToPath(content: string): string {
  const polylineRegex = /<polyline([^>]*)\/?>/g;

  const transformedContent = content.replace(polylineRegex, (match, attributes) => {
    const attributesRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
    const polylineAttributes: Record<string, string> = {};
  
    let attributeMatch;
    while ((attributeMatch = attributesRegex.exec(attributes)) !== null) {
      const [, attributeName, attributeValue] = attributeMatch;
      polylineAttributes[attributeName] = attributeValue;
    }
  
    const { points, ...restAttributes } = polylineAttributes;
  
    const d = `M ${parsePoints(points).join(" ")}`
  
    const pathAttributes = Object.entries(restAttributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ");
  
    return `<path d="${d}" ${pathAttributes}></path>`;
  });

  return transformedContent;
}