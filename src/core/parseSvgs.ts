import fs from '../paths';

import { hasSvgFilesInDirectory, isValidSvg } from "../utils";
import { packageName } from "../data/pkg-name";
import { Logger } from "../utils/logger";

export default function parseSvgs(dir: string | string[]) {
  const icons: any[] = [];

  // 检查目录是否包含 SVG 文件
  if (!hasSvgFilesInDirectory(dir)) {
    const logger = new Logger(packageName);
    logger.warn(`Caution: No SVG files found in '${dir}' directory.`);
    return icons;
  }

  // 根据 dir 参数的类型进行处理
  if (typeof dir === 'string') {
    parseDirectory(dir); // 解析单个目录
  } else if (Array.isArray(dir)) {
    dir.forEach(directory => parseDirectory(directory)); // 对每个子目录进行解析
  }

  function parseDirectory(directory: string | string[]) {
    if (typeof directory === 'string') {
      parseSingleDirectory(directory);
    } else if (Array.isArray(directory)) {
      directory.forEach(dir => parseSingleDirectory(dir));
    }
  }

  function parseSingleDirectory(directory: string) {
    fs.readdirSync(directory).forEach(filename => {
      const logger = new Logger(packageName);
      const icon = fs.readFileSync(`${directory}/${filename}`, 'utf-8');

      // 检查 SVG 文件是否有效
      if (!isValidSvg(icon)) {
        logger.error(`\x1b[38;5;246mError: In ${directory} '${filename}' is not a valid SVG file, please provide a standard SVG.`);
        return;
      }

      // 将解析的 SVG 文件添加到 icons 数组
      icons.push({
        name: filename.replace(/\.svg$/, ''),
        content: icon
      });
    });
  }

  return icons;
}