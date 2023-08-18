import fs from '../paths';

import { packageName } from "../data/pkg-name";
import { Logger } from "../utils/logger";

export default function printFileStats(filePath: string, outputPath: string, startTime: any) {

  const logger = new Logger(packageName);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      logger.error('Could not read file information:', `${err}`);
      return;
    }

    // 计算 `sprite.svg` 文件大小
    const fileSizeInBytes = stats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;

    // 泛统计生成 `sprite.svg` 耗时
    const endTime = process.hrtime(startTime);
    const executionTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    logger.success(`\x1b[32mgenerated\x1b[0m 'sprite.svg' (${fileSizeInKilobytes} KB) in ${executionTime}ms`)

  });
}