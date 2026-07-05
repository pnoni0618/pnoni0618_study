// math 모듈

export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

// Common JS 방식
// module.exports = {
//   add,
//   sub,
// };

// ES Module 방식
// export { add, sub };

export default function multiply(a, b) {
  return a * b;
}
