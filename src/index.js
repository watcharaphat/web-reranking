import { getFiles } from './getFiles';
import { writeToFile } from './modules/utils/writeToFile';
import { absolutePath } from './absolutePath';

const fs = require('fs');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const P = require('pagerank-js');

const readFile = Promise.promisify(fs.readFile);
const pageRank = Promise.promisify(P);

async function main() {
  const proto = 'http://';
  const dataPath = '/Users/watcharaphat/project/web-indexer/html';

  const files = await getFiles(dataPath);
  const webGraph = [];

  const urlMap = files.map(file => proto.concat(file.slice(45)));
  console.log('Construct urlMap: Done');
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
      if (href) {
        const urlPath = absolutePath(urlMap[i], href);
        const index = urlMap.indexOf(urlPath);
        if (index !== -1 && linkGraph.indexOf(urlPath) === -1) {
          linkGraph.push(index);
        }
      }
    });
    webGraph[i] = linkGraph;
  }

  console.log('Construct webGraph: Done');
  writeToFile('result/webgraph.txt', webGraph);

  const linkProb = 0.85;
  const torelance = 0.0000000001;
  console.log('Page ranking');
  let pageScores;

  const virtualLinks = [];
  for (let i = 0; i < webGraph.length; i += 1) {
    virtualLinks.push(i);
  }

  const G = webGraph.map((edges) => {
    if (!edges.length) {
      return virtualLinks;
    }

    return edges;
  });

  try {
    pageScores = await pageRank(G, linkProb, torelance);
  } catch (err) {
    console.log('Error on pagerank.', err);
  }

  writeToFile('result/page_scores.txt', pageScores);
  console.log('Done.');
}

main();
