const recursive = require('recursive-readdir');

const dataPath = '/Users/watcharaphat/project/web-indexer/data';

export async function getFiles() {
  let files;
  try {
    files = await recursive(dataPath);
  } catch (error) {
    console.error('Cannot get files', error);
  }

  return files;
}
