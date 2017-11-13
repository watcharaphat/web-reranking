import { getURLMap } from './getURLMap';

async function main() {
  const urlMap = await getURLMap();
  console.log(urlMap);
}

main();
