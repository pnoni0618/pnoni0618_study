// 기본 변수 할당
// let colors = ['green', 'blue', 'purple'];

// // let c1 = colors[0];
// // let c2 = colors[1];
// // let c3 = colors[2];

// let [c1, c2, c3] = colors;

// console.log(c1, c2, c3);

// 선언 분리 할당
// let c1, c2;
// [c1, c2, c3] = ['green', 'blue'];

// console.log(c1);
// console.log(c2);
// console.log(c3);

// 기본값 할당

// let c1, c2, c3, c4, c5, c6;
// [c1, c2, c3, c4, c5, c6 = 'yellow'] = ['green', 'blue', 'purple'];

// console.log(c1);
// console.log(c2);
// console.log(c3);
// console.log(c4);
// console.log(c5);
// console.log(c6);

//변수 값 교환하기
let a = 10;
let b = 5;
// let tmp;
// console.log(a, b);

// tmp = a;
// a = b;
// b = tmp;

[a, b] = [b, a];
// console.log(a, b);

// 객체의 구조분해 할당
// 1.1 기본 할당

let colors = {
  c1: 'green',
  c2: 'blue',
  c3: 'purple',
};

// let c1 = colors.c1;
// let c2 = colors.c2;
// let c3 = colors.c3;

// let { c1, c2, c3 } = colors;

// console.log(c1, c2, c3);

// spread
// 객체

const toy = {
  type: 'bear',
  price: 15000,
};

const blueToy = {
  ...toy,
  color: 'blue',
};

const yellowToy = {
  ...toy,
  color: 'yellow',
};

// console.log(blueToy);
// console.log(yellowToy);

// 배열

let color1 = ['red', 'orange', 'yellow'];
let color2 = ['blue', 'navy', 'purple'];

const rainbow = [...color1, 'green', ...color2];
// console.log(rainbow);

// rest
// 객체

// const { type, ...rest } = blueToy;

// console.log(type);
// console.log(rest);

// 배열
// let color = ['red', 'orange', 'yellow', 'green'];
// const [c1, c2, ...rest1] = color;
// console.log(c1);
// console.log(c2);
// console.log(rest1);

// 함수
// const print = (a, b, ...rest) => {
//   console.log(a);
//   console.log(b);
//   console.log(rest);
// };

// print(1, 2, 3, 4, 5, 6, 7);

// const print = (a, b, c, d, e, f) => {
//   console.log(a, b, c, e, d, f);
// };

// const numbers = [1, 2, 3, 4, 5, 6];
// print(...numbers);

const print = (...rest) => {
  console.log(rest);
};

const numbers = [1, 2, 3, 4, 5, 6];
print(...numbers);
