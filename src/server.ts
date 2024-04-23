import Render from './lib/render';
import { join } from 'path';
const layout = Render.layout('default.html');
Bun.serve({
 async fetch(req) {
  const url = new URL(req.url);
  if (url.pathname === '/') return new Response(...Render.base('index.html', 'Table View', { layout, data: require('../result.json') || [] }));
  const symLink = join('public', url.pathname);
  const file = Bun.file(symLink);
  if (file) {
   return new Response(file);
  }
  return new Response('Not found', { status: 404 });
 },
});

console.log('Listening on http://localhost:3000');
