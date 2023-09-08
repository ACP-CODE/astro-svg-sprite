import { invalidFiles, fileNames } from './parseSvgs';

function fileForm(files: string[]) {
  return files.length === 1 ? 'file' : 'files';
}

export default function printWarnInfo() {

  if (invalidFiles.length > 0) {

    console.log(`\n\x1b[42m parsed ${fileNames.length} SVG ${fileForm(fileNames)} \x1b[0m`);

    // for (let i = 0; i < fileNames.length; i++) {
    //   const fileName = fileNames[i];
    //   console.log(`parsing ${i + 1} ${fileName}`);
    //   if (i == fileNames.length - 1) {
    //     console.log(`parsed ${fileNames.length} ${fileForm(fileNames)}`);
    //   }
    // }

    const warnMsg = [
      `\n\x1b[33m(!) Please provide a standard svg ${fileForm(invalidFiles)}.`,
      `\x1b[1m${fileForm(invalidFiles)}:\x1b[22m ${JSON.stringify(invalidFiles, null, 2)}`,
      `   \x1b[1mNot a valid SVG file.\x1b[22m\n`,
      `\x1b[33m- To remove the warning information, delete or remove the SVG ${fileForm(invalidFiles)}.`,
      `- Visit \x1b[4mhttps://developer.mozilla.org/en-US/docs/Web/SVG\x1b[24m know more about SVG.\x1b[0m\n`
    ]

    console.log(`${warnMsg.join('\n')}`);

  }

}

