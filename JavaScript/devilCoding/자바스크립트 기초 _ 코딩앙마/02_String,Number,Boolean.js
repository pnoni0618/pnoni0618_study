// 문자형 String

const name1 = "Mike";
const name2 = 'Mike';
const name3 = `Mike`;


const message = "I'm a boy.";
const message2 = 'I\'m a bay.'; 
// 작은 따옴표만 쓰고 싶다면 특수기호 앞에 역슬래시 입력

const message3 = `My name is ${name1}.`;
const message4 = `나는 ${30+1}살 입니다.`;
console.log(message3, message4);


// 숫자형 Number

const age = 30;
const PI = 3.14;

console.log(1 + 2); // 더하기
console.log(10 - 3); // 빼기
console.log(3 * 2); // 곱하기
console.log(6 / 3); // 나누기
console.log(6 % 4); // 나머지


const x = 1 / 0; // 1을 0으로 나누면?
console.log(x); // Infinity 

const name = "Mike";
const y = name / 2; // 문자를 숫자로 나누면 어떻게 될까? 
console.log(y); // NaN, Not a Number 

//논리형 Boolean

const a = true; // 참
const b = false; // 거짓

console.log(name == 'Mike')
console.log(age > 40)


// null과 undefined

let age1;
console.log(age1)

let user = null;
console.log(user)

// 객체형
// 심볼형

// typeof 연산자
// 변수의 자료형을 알아낼 수 있다

console.log(typeof 3);
console.log(typeof name1);
console.log(typeof true);
console.log(typeof "xxx");
console.log(typeof null); // "object" 객체가 나오지만 객체가 아니다 
console.log(typeof undefined);

// 주의사항

const message5 = `My name is ${name}`;
const message6 = "My name is ${name}"; 


console.log(message5);
console.log(message6);
// 큰 따옴표를 사용하면 변수명이 그대로 노출되는 점 주의


// 문자형도 수식이 가능

const a1 = "나는 ";
const b1 = " 입니다";

console.log(a1 + name + b1);

console.log(a1 + age + "살" + b1)