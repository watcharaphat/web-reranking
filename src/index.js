import { getFiles } from './getFiles';

async function main() {
  const proto = 'http://';
  const files = await getFiles();

  const urlMap = files.map(file => proto.concat(file.slice(45)));

  console.log(urlMap.length);
}

main();
