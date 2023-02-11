// https://stackoverflow.com/a/35413452/5835100
export function unstringify(stringifiedString: string) {
  return stringifiedString
    .replace(/\\n/g, '  \n')
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, '\\&')
    .replace(/\\r/g, '\\\r')
    .replace(/\\t/g, '\\\t')
    .replace(/\\b/g, '\\\b')
    .replace(/\\f/g, '\\\f');
}
