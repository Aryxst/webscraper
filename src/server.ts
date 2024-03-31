import render from './lib/render';
import { join } from 'path';
const layout = render.layout('default.html');
Bun.serve({
 async fetch(req) {
  const url = new URL(req.url);
  render.out();
  if (url.pathname === '/') return new Response(...render.base('index.html', 'Table View', { upd: true, layout, data: require('../www/data.json') || [] }));
  const symLink = join('www', url.pathname);
  const file = Bun.file(symLink);
  if (file) {
   return new Response(file);
  }
  return new Response('Not found', { status: 404 });
 },
});

console.log('Listening on http://localhost:3000');
