const fs = require('fs');

export function writeToFile(filePath, data) {
  const file = fs.createWriteStream(filePath);
  file.on('error', (error) => {
    console.error(`Error writing file ${filePath}`, error);
  });

  data.forEach((row) => {
    file.write(row.concat('\n'));
  });
  file.end();
}
