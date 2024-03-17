function countLineBreaks(str: string) {
  const regex = /\r\n|\r|\n/g;
  const matches = str.match(regex);

  return matches ? matches.length : 0;
}
function chunkify(array: any[], n: number) {
  let chunks = [];
  for (let i = n; i > 0; i--) {
    chunks.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return chunks;
}
export { countLineBreaks, chunkify };
