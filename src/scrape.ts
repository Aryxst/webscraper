import os from 'os';
import log from './lib/log';
import { chunkify } from './utils';
import type { RequestResult } from './worker';
const cpus = os.cpus();
const urls = (await Bun.file('sample.txt').text()).split('\n').filter(x => x);

console.clear();
log('i', 'Loading sample.txt...');
log('i', `Found ${urls.length} entries in sample.txt...`);
const threadCount = Number(prompt(`How many cpus do you want to use? (1-${cpus.length})`));
if (!threadCount || threadCount > cpus.length || threadCount == 0) throw Error('Must provide a number of threads less or equal to the number of cpus, and not equal to 0!');

async function run(jobs: any, concurrentWorkers: number) {
 const chunks = chunkify(jobs, concurrentWorkers).filter(x => x.length > 0);
 const tick = performance.now();
 const result: RequestResult[] = [];
 let completedChunks = 0;
 chunks.forEach((data, i) => {
  const workerURL = new URL(`worker.ts`, import.meta.url).href;
  const worker = new Worker(workerURL);
  worker.postMessage(data);
  worker.onmessage = event => {
   completedChunks++;
   console.log(`Worker ${i} completed`);
   result.push(...event.data);
   if (completedChunks === chunks.length) {
    log('i', `${chunks.length} ${chunks.length == 1 ? 'worker' : 'workers'} took ${performance.now() - tick}ms to complete`);
    Bun.write('www/data.json', JSON.stringify(result));
    process.exit();
   }
  };
  worker.addEventListener('open', () => {
   console.log(`Worker ${i} started`);
  });
 });
 console.log(chunks);
}
run(urls, threadCount);
