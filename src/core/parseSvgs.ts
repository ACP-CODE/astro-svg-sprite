import fs from '../paths';

import { hasSvgFilesInDirectory, isValidSvg } from "../utils";

const icons: any[] = []; // 有效的 SVG 文件内容

export const invalidFiles: any[] = []; // 无效的 SVG 文件名（含路径）
export const fileNames: any[] = []; // 所有目录下的 SVG 文件名（含路径）

function parseSingleDirectory(directory: string) {

  fs.readdirSync(directory).forEach(filename => {
    if (!filename.toLowerCase().endsWith('.svg')) {
      return;
    }
    const icon = fs.readFileSync(`${directory}/${filename}`, 'utf-8');

    if (!isValidSvg(icon)) {
      invalidFiles.push(`${directory}/${filename}`);
      fileNames.push(`${directory}/${filename}`);
    } else {
      fileNames.push(`${directory}/${filename}`)
    }

    if (isValidSvg(icon)) {
      icons.push({
        name: filename.replace(/\.svg$/, ''),
        content: icon
      });
    }
  });

}

function parseDirectory(directory: string | string[]) {

  if (typeof directory === 'string') {
    parseSingleDirectory(directory);
  } else if (Array.isArray(directory)) {
    directory.forEach(dir => parseSingleDirectory(dir));
  }

}

export default function parseSvgs(dir: string | string[]) {

  if (!hasSvgFilesInDirectory(dir)) {
    return icons;
  }

  if (typeof dir === 'string') {
    parseDirectory(dir); // 解析单个目录
  } else if (Array.isArray(dir)) {
    dir.forEach(directory => parseDirectory(directory)); // 对每个子目录进行解析
  }
  return icons;
}
