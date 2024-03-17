import { regexps } from './namings';

declare var self: Worker;
const outDir = import.meta.dir + '/../out';
self.onmessage = async ({ data: urls }: MessageEvent) => {
 const requests: [string, number, number, boolean, Array<string | null>][] = [];
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
   writer.write(
    await new HTMLRewriter()
     .on("link[rel='stylesheet']", {
      async element(el) {
       try {
        let href = el.getAttribute('href');
        if (!href || href === '/') return;
        if (href.startsWith('//')) {
         href = `https:${href}`;
        } else if (href.startsWith('/')) {
         href = url.origin + href;
        }
        const cssRes = await fetch(href);
        writer.write(await cssRes.arrayBuffer());

        writer.flush();
       } catch (err) {
        console.error(`Failed to fetch css for ${url}:`, err);
       }
      },
     })
     .on('script', {
      async element(el) {
       try {
        let src = el.getAttribute('src');
        if (!src || src === '/') return;
        if (src.startsWith('//')) {
         src = `https:${src}`;
        } else if (src.startsWith('/')) {
         src = url.origin + src;
        }
        const jsRes = await fetch(src);
        writer.write(await jsRes.arrayBuffer());
        writer.flush();
       } catch (err) {
        console.error(`Failed to fetch js for ${url}:`, err);
       }
      },
     })
     // This happens in Svelte/SvelteKit, where they preload modules
     .on('link[rel="modulepreload"]', {
      async element(el) {
       try {
        let src = el.getAttribute('href');
        if (!src || src === '/') return;
        if (src.startsWith('//')) {
         src = `https:${src}`;
        } else if (src.startsWith('/')) {
         src = url.origin + src;
        }
        const jsRes = await fetch(src);
        writer.write(await jsRes.arrayBuffer());
        writer.flush();
       } catch (err) {
        console.error(`Failed to fetch js for ${url}:`, err);
       }
      },
     })
     .transform(res)
     .arrayBuffer(),
   );
   writer.end();
   // Get the text content of the file
   const text = await file.text();
   // Get the matched regexps
   const matchedExps = Object.keys(regexps).map((k, i) => {
    // @ts-ignore
    // The readonly is for getting suggestions in the namings.ts file while assign object values to the default export, so this isn't type safe.
    if (regexps[k].some((exp: RegExp) => exp.test(text))) return k;
    return null;
   });
   // Push the site url, the time it took to fetch it, the size of the file, whether the request was successful and the matched regexps
   requests.push([url.href, performance.now() - tick, file.size, success, matchedExps]);
  } catch (err) {
   console.error(`Failed to process ${url}:`, err);
  }
 }
 self.postMessage(requests);
};
