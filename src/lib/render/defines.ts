import { templates as partials, filters, getConfig, compile } from 'squirrelly';
import { readFileSync } from 'fs';
import namings, { type rawStack } from '../../namings';
import { size } from '../../utils';
getConfig({
 cache: false,
});
partials.define('navbar', compile(readFileSync('src/views/partials/navbar.html', { encoding: 'utf8' })));
partials.define('footer', compile(readFileSync('src/views/partials/footer.html', { encoding: 'utf8' })));

filters.define('sum', (arr: Array<number>) => arr.reduce((a, b) => a + b));
filters.define('avg', (arr: Array<number>) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length));
filters.define('getProp', (arr: Array<any>, prop: number) => arr.map(v => v[prop]));
// Calculate ratio of defined values in an array
filters.define('defRatio', (booleans: Array<boolean>) => booleans.filter(x => x).length / booleans.length);
filters.define('percentage', (number: number) => Math.round(number * 100));
filters.define('size', size);
// Project specific filters
filters.define('joinStacksName', (stacks: Array<rawStack>) => stacks.map(s => namings[s].name).join(', '));
