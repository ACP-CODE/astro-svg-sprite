import { compressBest, compressStandard, compressFast } from "../utils/compressOptions";

export default function optimizeSvgContent(content: string, options?: 'storage' | 'fast' | 'standard' | 'best'): string {
  switch (options) {
    case 'best':
      content = compressBest(content);
      break;
    case 'standard':
    case undefined:
      content = compressStandard(content);
      break;
    case 'fast':
      content = compressFast(content);
      break;
    default:
      break;
  }
  return content;
}

