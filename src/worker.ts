declare var self: Worker;
const outDir = import.meta.dir + "/../out";
self.onmessage = async ({ data: urls }: MessageEvent) => {
  const requests: [string, number, boolean][] = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const tick = performance.now();
    console.log(url);
    try {
      const res = await fetch(url);
      const success = res.status < 400;
      const dest = `${outDir}/[${url.replaceAll("/", "-")}].txt`;
      const writer = Bun.file(dest).writer();

      writer.write(
        await new HTMLRewriter()
          .on("link[rel='stylesheet']", {
            async element(el) {
              try {
                let href = el.getAttribute("href");
                if (!href || href === "/") return console.log("no href");
                if (href.startsWith("//")) {
                  href = `https:${href}`;
                } else if (href.startsWith("/")) {
                  href = url + href;
                }
                const cssRes = await fetch(href);
                writer.write(await cssRes.arrayBuffer());
                writer.flush();
              } catch (err) {
                console.error(`Failed to fetch css for ${url}:`, err);
              }
            },
          })
          .transform(res)
          .arrayBuffer()
      );
      writer.flush();
      requests.push([url, performance.now() - tick, success]);
      writer.end();
    } catch (err) {
      console.error(`Failed to process ${url}:`, err);
    }
  }
  self.postMessage(requests);
};
