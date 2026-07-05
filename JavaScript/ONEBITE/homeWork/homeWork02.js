let arr = [1, 2, 3, 4, 5];

arr.forEach((elm, idx, array) => {
  // console.log(elm);
  // console.log(idx);
  // console.log(array);
});

// let newArray = [];

// for (let i = 0; i < arr.length; i++) {
//   newArray.push(arr[i] * 10);
// }
// console.log(newArray);

let newArray = arr.map((elm) => {
  return elm * 10;
});

// console.log(newArray);

let colors = [
  { id: 1, color: 'green' },
  { id: 2, color: 'blue' },
  { id: 3, color: 'purple' },
];
// console.log(colors.includes('blue', 2));
// console.log(colors.includes('blue', 1));

let idx = colors.findIndex((elm) => elm.color === 'purple');
// console.log(idx);
/*
colors.findIndex((elm, idx, array) =>
  console.log(`${idx}번째 값-id: ${elm.id}, color: ${elm.color}`),
);
colors.findIndex((elm, idx, array) => console.log(array));
*/

let filterArray = colors.filter((elm, idx, array) => elm.id > 1);
// console.log(filterArray);

//배열에 요소 추가
colors.push({ id: 4, color: 'yellow' });
// console.log(colors);

let sliceArray = colors.slice(1, 3);
// console.log(sliceArray);

let array1 = ['green', 'blue'];
let array2 = ['purple', 'yellow'];

// console.log(array1.concat(array2));

let color1 = ['green', 'blue', 'purple', 'yellow'];

// console.log(color1.join(' '));
// console.log(color1.sort);

let colors1 = ['green', 'blue', 'purple', 'yellow'];

const compare = (a, b) => {
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
};

colors1.sort(compare);
// console.log(colors1);

let numbers = [1, 100, 25, 50];

// const numberCompare = (a, b) => {
//   /* if (a > b) return 1;
//   else if (a < b) return -1;
//   else return 0;*/
//   a - b;
// };
// numbers.sort(compare);
// console.log(numbers.sort(compare));

/* let sum = 0;
numbers.forEach((elm) => {
  sum += elm;
}); */

// console.log(sum);

// let sum = numbers.reduce((acc, cur, idx) => {
//   console.log(acc, cur, idx);
//   return acc + cur;
// }, 0);

// console.log(sum);

console.log(Array.isArray([1, 100, 50, 3]));
console.log(Array.isArray({ id: 3, color: 'purple' }));
console.log(Array.isArray('string'));
console.log(Array.isArray(undefined));
