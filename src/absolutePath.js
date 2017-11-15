export function absolutePath(base, relative) {
  let urlPath;

  if (relative.startsWith('http://') || relative.startsWith('https://')) {
    urlPath = 'http://'.concat(relative.split('//')[1]);
    return urlPath;
  }

  if (relative.startsWith('/')) {
    relative = relative.slice(1);
  }

  const stack = base.split('/');
  const parts = relative.split('/');
  stack.pop();
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i] === '.') {
      continue;
    }
    if (parts[i] === '..') {
      stack.pop();
    } else {
      stack.push(parts[i]);
    }
  }

  urlPath = stack.join('/');
  urlPath = urlPath.endsWith('/') ? urlPath.slice(0, urlPath.length - 1) : urlPath;

  return urlPath;
}
