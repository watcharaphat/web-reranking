const recursive = require('recursive-readdir');

export async function getFiles(dataPath) {
  let files;
  try {
    files = await recursive(dataPath);
  } catch (error) {
    console.error('Cannot get files', error);
  }

  return files;
}
