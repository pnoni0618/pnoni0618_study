// // 함수 작성

{function showError(){
    console.log('에러가 발생했습니다. 다시 시도해주세요');
}

showError();
}

// // 매개변수가 있는 함수
// // 반복을 줄여주는 편리한 함수 
// // 함수를 한 번 만들어 놓으면 매개변수를 바꿔가면서 다양하게 대응이 가능

{function sayHello(name){
    const msg = `Hello, ${name}`;
    console.log(msg);
}

sayHello('Mike.');
sayHello('Jane.');
sayHello('Tom.');
}

// // 로그인 하지 않아서 사용자 이름을 모를때?

{function sayHello1(name){
    const msg = `Hello, ${name}`;
    console.log(msg);
}

sayHello();}

// 
{
function sayHello(name){
    let msg = `Hello`;
    if (name){
        msg += `, ${name}`;
    }
    console.log(msg);
}

sayHello();
sayHello("Mike");
}

// 전역함수 
{
console.log("전역함수 실습")
let msg = 'Hello'; // 어디서나 접근 가능한 변수, 전역변수!
// global varable
console.log(msg);

function sayHello(name){
    if(name){
        msg += `, ${name}`;
    }
    console.log("함수 내부")
    console.log(msg);
}

sayHello("Mike");
console.log("함수 호출 후");
console.log(msg);

}

// 전역 변수와 지역 변수,서로 간섭받지 않는다 

console.log("전역변수와 지역변수 실습")
{let msg = "Welcom"; // 전역변수 

function sayHello(name){
    let msg = "Hello" // 지역변수 
    console.log(msg + ' ' + name);
}

sayHello('Mike');
console.log(msg);
}

// 예제2

let name = "Mike";

function sayHello(name){
    console.log(name)
}

sayHello();
sayHello('Jane');

// OR

function sayHello(name){
    let newName = name || 'friend';
    let msg = `Hello, ${newName}`;
    console.log(msg)
}

sayHello();
sayHello('Jane');

// default value
// 위 예제를 더 깔끔하게 default값으로 수정

function sayHello(name = 'friend'){
    let msg = `Hello, ${name}`
    console.log(msg)
}

sayHello();
sayHello('Jane');

// return 으로 값 반환

function add(num1, num2){
return num1 + num2;
}

const result = add(2, 3);
console.log(result);

// returen 2

function showError(){
    console.log('에러발생');
    returen;
}

const result1 = showError();
console.log(result1);

// 주의사항

// 함수 function
// - 한번에 한 작업에 집중
// - 읽기 쉽고 어떤 동작인지 알 수 있게 네이밍

// showError 에러를 보여줌
// getName 이름을 얻어옴
// createUserData 유저 데이터 생성
// checkLogin 로그인 여부 체크 

