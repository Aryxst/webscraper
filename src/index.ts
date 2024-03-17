import log from "./utils/log";
import os from "os";
import { chunkify } from "./utils/manipulate";
const cpus = os.cpus();
const urls = (await Bun.file("sample.txt").text()).split("\n");

console.clear();
log("i", "Loading sample.txt...");
log("i", `Found ${urls.length} entries in sample.txt`);
const threadCount = Number(
  prompt(`How many cpus do you want to use? (1-${cpus.length})`)
);
if (!threadCount || threadCount > cpus.length || threadCount == 0)
  throw Error(
    "Must provide a number of threads less or equal to the number of cpus, and not equal to 0!"
  );
//
//
//
async function run(jobs: any, concurrentWorkers: number) {
  const chunks = chunkify(jobs, concurrentWorkers);
  const tick = performance.now();
  let completedWorkers = 0;
  chunks.forEach((data, i) => {
    if (data.length == 0) {
      log("i", `Skipping empty chunk ${i}`);
      return;
    }
    const workerURL = new URL("worker.ts", import.meta.url).href;
    const worker = new Worker(workerURL);
    worker.postMessage(data);
    worker.onmessage = (event) => {
      completedWorkers++;
      console.log(`Worker ${i} completed`);
      if (completedWorkers === concurrentWorkers) {
        log(
          "i",
          `${concurrentWorkers} workers took ${
            performance.now() - tick
          }ms to complete`
        );
        process.exit();
      }
    };
    worker.addEventListener("open", () => {
      console.log(`Worker ${i} started`);
    });
  });
}
run(urls, threadCount);
