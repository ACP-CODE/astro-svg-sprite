import fs from '../paths';

import { packageName } from "../data/pkg-name";
import { Logger } from "../utils/logger";
const logger = new Logger(packageName);

import { executionTime } from '..';
import printWarnInfo from './printWarnInfo';

export default function printFileStats(filePath: string, outputPath: string) {

  fs.stat(filePath, (err, stats) => {
    if (err) {
      logger.error('Could not read file information:', `${err}`);
      return;
    }

    const fileSizeInBytes = stats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;

    logger.info(`\x1b[2mCompleted in ${executionTime}ms.\x1b[22m`);

    printWarnInfo();

    logger.success(`\x1b[32mgenerated\x1b[0m 'sprite.svg' ${fileSizeInKilobytes}(kb).`);

  });
}
