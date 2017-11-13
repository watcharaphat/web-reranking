const glob = require('glob');
// const recursive = require('recursive-readdir');

// recursive('/Users/watcharaphat/project/web-indexer/data', (error, files) => {
//   files.forEach((file, index) => {
//     const fileName = file.slice(45);
//     const url = 'http://'.concat(fileName);
//     if (index <= 10) {
//       console.log(`${index}:\t${url}`);
//     }
//   });
// });

async function getDirectories(src, callback) {
  const files = await glob.sync(src.concat('/**/*'), callback);

  return files;
}

async function printDirectories() {
  const files = await getDirectories('/Users/watcharaphat/project/web-indexer/data');
  files.forEach((file, index) => {
    const fileName = file.slice(45);
    const url = 'http://'.concat(fileName);
    if (index <= 10) {
      console.log(`${index}:\t${url}`);
    }
  });
}

printDirectories();
