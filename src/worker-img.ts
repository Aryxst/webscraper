declare var self: Worker;
const outDir = import.meta.dir + '/../out-img';
self.onmessage = async ({ data: urls }: MessageEvent) => {
 const requests: [string, number, number, boolean][] = [];
 if (urls.lenght === 0) {
  self.postMessage([]);
  self.terminate();
 }
 for (let i = 0; i < urls.length; i++) {
  const url = new URL(urls[i]);
  const tick = performance.now();
  try {
   const res = await fetch(url);
   const success = res.status < 400;
   const dest = `${outDir}/[${url.href.replaceAll('/', '-')}].txt`;
   const file = Bun.file(dest);
   const writer = file.writer();
   writer.start();
   new HTMLRewriter()
    .on('img[src]', {
     async element(el) {
      let src = el.getAttribute('src');
      if (!src || src === '/') return;
      if (src.startsWith('//')) {
       src = `https:${src}`;
      } else if (src.startsWith('/')) {
       src = url.origin + src;
      }
      writer.write(src + '\n\n');
      writer.flush();
     },
    })
    .on('svg', {
     text(el) {
      console.log(el);
     },
    })
    .transform(res);
   writer.end();
   requests.push([url.href, performance.now() - tick, file.size, success]);
  } catch (err) {
   console.error(`Failed to process ${url}:`, err);
  }
 }
 self.postMessage(requests);
};
