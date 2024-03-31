import { filters, getConfig } from 'squirrelly';
import namings, { type rawStack } from '../../namings';
import { size } from '../../utils';
getConfig({
 cache: false,
});

filters.define('sum', (arr: Array<number>) => arr.reduce((a, b) => a + b));
filters.define('avg', (arr: Array<number>) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length));
filters.define('getProp', (arr: Array<any>, prop: number) => arr.map((v) => v[prop]));
// Calculate ratio of defined values in an array
filters.define('defRatio', (booleans: Array<boolean>) => booleans.filter((x) => x).length / booleans.length);
filters.define('percentage', (number: number) => Math.round(number * 100));
filters.define('size', size);
// Project specific filters
filters.define('joinStacksName', (stacks: Array<rawStack>) => stacks.map((s) => namings[s].name).join(', '));
