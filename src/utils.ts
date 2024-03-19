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
function size(bytes: number) {
 const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
 if (bytes === 0) return '0 Byte';
 const i = Math.floor(Math.log(bytes) / Math.log(1024));
 return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}
function parseUrl(src: string, origin: string) {
 if (!src || src === '/') return;
 if (src.startsWith('//')) {
  return `https:${src}`;
 } else if (src.startsWith('/')) {
  return origin + src;
 }
 return `${origin}/${src}`;
}
// TODO: Add support for nested properties(object, and nested objects and arrays) => function selfCall and remove loop
function recurseProp(data: any, accessor: string) {
 const splatAccessor = accessor.split(/(\.|\[\])/).filter((x) => !(x === '.'));
 console.log(splatAccessor);
 let res: any;
 if (typeof data == 'object') {
  for (let i = 0; i < splatAccessor.length; i++) {
   res = data[splatAccessor[i]];
   if (typeof res != 'object') break;
   data = res;
  }
 } else if (Array.isArray(data)) {
  for (let i = 0; i < splatAccessor.length; i++) {
   res = data[+splatAccessor[i]];
  }
 }
 return res;
}

export { size, countLineBreaks, chunkify, parseUrl, recurseProp };
