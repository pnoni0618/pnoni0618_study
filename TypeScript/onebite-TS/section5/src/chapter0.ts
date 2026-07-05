/**
 * 인터페이스
 */

interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void; // sayHi :() => void; 이렇게도 가능
  sayHi(a: number, b: number): void;
}

const person: Person = {
  name: '쓸맘',
  sayHi: function () {
    console.log('Hi');
  },
};

person.sayHi();
person.sayHi(1, 2);
// person.name = '승환맘';
