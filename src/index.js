import { getFiles } from './getFiles';
import { writeToFile } from './modules/utils/writeToFile';

const fs = require('fs');
const Promise = require('bluebird');
const cheerio = require('cheerio');

const readFile = Promise.promisify(fs.readFile);

async function main() {
  const proto = 'http://';
  const files = await getFiles();
  const webGraph = [];

  const urlMap = files.map(file => proto.concat(file.slice(45)));
  writeToFile('result/urlmap.txt', urlMap);

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];

    let html;
    try {
      const data = await readFile(file);
      html = data.toString();
    } catch (err) {
      console.error(`Error reading file ${file}`, err);
    }
    const $ = cheerio.load(html);

    const links = $('a');
    const linkGraph = [];
    $(links).each((j, link) => {
      const href = $(link).attr('href');
      const index = urlMap.indexOf(href);
      if (index !== -1 && linkGraph.indexOf(href) === -1) {
        linkGraph.push(index);
      }
    });
    webGraph[i] = linkGraph;
  }

  writeToFile('result/webgraph.txt', webGraph);
}

main();
