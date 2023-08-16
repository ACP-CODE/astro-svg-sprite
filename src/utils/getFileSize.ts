import fs from '../paths';
/**
 * 获取 sprite.svg 文件大小
 * @param filePath 
 * @returns 
 */
export default function getFileSize(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats.size);
    });
  });
}