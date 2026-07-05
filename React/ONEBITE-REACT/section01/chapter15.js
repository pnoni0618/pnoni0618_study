// 1. 객체 생성

let obj1 = new Object(); // 객체 생성자
let obj2 = {}; // 객체 리터럴 (대부분 사용)

// 2. 객체 프로퍼티 (객체 속성)
// key : value
let person = {
  name: '쓸맘',
  age: 40,
  hobby: '피아노',
  10: 20,
  'like cat': true,
};

// 3. 객체 프로퍼티를 다루는 방법
// 3.1 특정 프로퍼티에 접근 (점 표기법, 괄호 표기법)

let name = person.name;
let age = person['age'];

let property = 'hobby';
let hobby = person[property];

// 3.2 새로운 프로퍼티를 추가하는 방법
person.job = 'fe developer';
person['favoriteFood'] = '떡볶이';

// 3.3 프로퍼티를 수정하는 방법
person.job = 'educater';
person['favoriteFood'] = '초콜릿';

// 3.4 프로퍼티를 삭제하는 방법
delete person.job;
delete person['favoriteFood'];

// 3.5 프로퍼티의 존재 유무를 확인하는 방법 (in 연산자)
let result1 = 'name' in person; // true
let result2 = 'cat' in person; // false
