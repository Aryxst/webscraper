import { recurseProp } from './src/lib/render/parser';

console.log(recurseProp([1, ['ciao', { hello: 'world' }]], '1.1'));
