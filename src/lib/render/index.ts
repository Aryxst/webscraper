import { render, renderFile } from 'squirrelly';
import { readFileSync } from 'fs';
import './defines';
const cache = new Map();
const res = { headers: { 'Content-Type': 'text/html' } };
export default {
 /**
  * @param v The name of the view(normalized, es. page.html)
  * @param title The title of the page
  * @param data The templates for the view
  */
 base(v: string, title: string, data: any): [string, object] {
  const v_ = 'v_' + v;
  if (cache.has(v_) && !data.upd) return [cache.get(v_), res];
  !data.layout
   ? cache.set(v_, Bun.peek(renderFile(`src/views/pages/${v}`, data)))
   : cache.set(
      v_,
      render(cache.get(data.layout), {
       body: Bun.peek(renderFile(`src/views/pages/${v}`, data)),
       title,
      })
     );
  console.log("Wasn't cached or got updated!");
  return [cache.get(v_), res];
 },
 layout(lt: string) {
  const lt_ = 'lt_' + lt;
  (!cache.has(lt_) && cache.set(lt_, readFileSync(`src/views/layouts/${lt}`, { encoding: 'utf8' }))) || console.trace(`Already has template "${lt}"! ***Nor a warning/error***`);
  // only during development disable the line above
  cache.set(lt_, readFileSync(`src/views/layouts/${lt}`, { encoding: 'utf8' }));
  return lt_;
 },
 out() {
  console.log(cache.keys());
 },
};
