// const moduleData = require('./math');

// console.log(moduleData.add(1, 2));
// console.log(moduleData.sub(1, 2));

// Common JS 방식
// const { add, sub } = require('./math');

// ES Module 방식
// import mul from './math.js';
// import { add, sub } from './math.js';

// 깔끔하게 변형
import mul, { add, sub } from './math.js';
import randomColor from 'randomcolor';

const color = randomColor();
console.log(color);

// console.log(add(1, 2));
// console.log(sub(1, 2));
// console.log(mul(2, 3));
