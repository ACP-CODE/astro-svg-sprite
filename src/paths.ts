import fs from 'node:fs';

function getEntryPath(entry?: string | string[]) {
  const defaultPath = './src/assets/images/sprite';
  if (!entry || entry === '') {
    return defaultPath;
  } else if (typeof entry === 'string') {
    return entry;
  } else if (Array.isArray(entry)) {
    const nonEmptyPaths = entry.filter(path => path && path !== '');
    if (nonEmptyPaths.length > 0) {
      return nonEmptyPaths;
    }
  }
  return defaultPath;
}

function getOutputPath(output?: string) {
  if (!output || output === '') {
    return 'assets/images';
  } else {
    return output;
  }
}

export { getEntryPath, getOutputPath, fs as default }
