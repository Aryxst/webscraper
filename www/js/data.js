/// <reference lib="DOM"/>
/// <reference lib="DOM.Iterable"/>
/* import * as d3 from 'd3';
import data from '../out.json' with { type: 'json' };
// set the dimensions and margins of the graph
var margin = { top: 70, right: 30, bottom: 40, left: 80 },
 width = 460 - margin.left - margin.right,
 height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const stats = document.getElementById('stats');
const minMax = data.reduce(
 (acc, [, value]) => {
  acc.min = Math.min(acc.min, value);
  acc.max = Math.max(acc.max, value);
  return acc;
 },
 { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
);
console.log(minMax);
stats.innerHTML = `Min: ${minMax.min} Max: ${minMax.max}`; */
document.addEventListener('DOMContentLoaded', () => {
 console.log('Loaded');
});
