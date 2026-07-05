// 1. 배열의 구조 분해 할당

let arr = [1, 2, 3];

let [one, two, three, four = 4] = arr;

// 객체의 구조 분해 할당

let person = {
  name: '쓸맘',
  age: 40,
  hobby: 'piano',
};

let { name, age: myAge, hobby, extra = 'hello' } = person;

// 3. 객체 구조 분해 할당을 이용해서 함수의 매개변수를 받는 방법

const funct = ({ name, age, hobby, extra }) => {
  console.log(name, age, hobby, extra);
};

funct(person);
