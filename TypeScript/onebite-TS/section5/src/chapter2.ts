/**
 * 선언 합침
 */

interface Person {
  name: string;
}

interface Person {
  age: number;
}

interface Developer extends Person {
  name: 'Hello';
}

const person: Person = {
  name: '',
  age: 28,
};

/**
 * 모듈 보강
 */

interface Lib {
  a: number;
  b: number;
}

interface Lib {
  c: string;
}

const lib: Lib = {
  a: 1,
  b: 2,
  c: 'hello',
};
