import { templates, filters, getConfig, compile } from 'squirrelly';
import { readFileSync } from 'fs';
import namings, { type rawStack } from '../../namings';
import { size } from '../file';
getConfig({
 cache: false,
});
templates.define('navbar', compile(readFileSync('src/views/partials/navbar.html', { encoding: 'utf8' })));
templates.define('footer', compile(readFileSync('src/views/partials/footer.html', { encoding: 'utf8' })));
filters.define('joinStackNames', function (stack: rawStack[]) {
 return stack.map((s) => namings[s].name).join(', ');
});
filters.define('size', size);
