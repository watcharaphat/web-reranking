const recursive = require('recursive-readdir');

const dataPath = '/Users/watcharaphat/project/web-indexer/data';
const proto = 'http://';

export async function getURLMap() {
  let files;
  try {
    files = await recursive(dataPath);
  } catch (error) {
    console.error('Cannot get files', error);
  }

  return files.map(file => proto.concat(file.slice(45)));
}
