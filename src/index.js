import { getFiles } from './getFiles';

const fs = require('fs');
const Promise = require('bluebird');
const cheerio = require('cheerio');

const readFile = Promise.promisify(fs.readFile);

async function main() {
  const proto = 'http://';
  const files = await getFiles();
  const webGraph = [];

  const urlMap = files.map(file => proto.concat(file.slice(45)));

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    let html;
    try {
      const data = await readFile(file);
      html = data.toString();
    } catch (err) {
      console.error(`Error reading file ${file}`, err);
    }
    const $ = cheerio.load(html);

    if (i <= 10) {
      console.log(`File: ${file}\n`);
      const links = $('a');
      $(links).each((index, link) => {
        console.log($(link).attr('href'));
      });

      console.log('*********************************\n');
    }
  }
}

main();
