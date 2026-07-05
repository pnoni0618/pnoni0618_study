/**
 * keyof 연산자
 */

import { Key } from 'node:readline';

// interface Person {
//   name: string;
//   age: number;
// }

type Person = typeof person;

function getPropertyKey(person: Person, key: keyof typeof person) {
  return person[key];
}

const person = {
  name: '쓸맘',
  age: 40,
};

getPropertyKey(person, 'name');
