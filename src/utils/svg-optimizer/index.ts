import { mergePathTags } from "./mergePathTags";
import {
  convertCircleToPath,
  convertEllipseToPath,
  convertLineToPath,
  convertPolygonToPath,
  convertPolylineToPath
} from "./tags";

export function optimizeSvgSprite(content: string): string {

  content = convertCircleToPath(content);
  content = convertEllipseToPath(content);
  content = convertLineToPath(content);
  content = convertPolygonToPath(content);
  content = convertPolylineToPath(content);

  // content = mergePathTags(content);

  return content;
}