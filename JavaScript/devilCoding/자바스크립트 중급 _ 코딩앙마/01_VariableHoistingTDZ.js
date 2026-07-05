// Javascript Intermediate Class 
// 변수 let const var

// var는 한번 선언된 변수를 다시 선언할 수 있다
// let은 변수가 중복되면 안된다 

console.log(name); // ReferenceError
let name = 'Mike';

//let, const도 호이스팅 된다
// 그런데 왜 var처럼 동작하지 않고 Error가 날까?


console.log(name1); // Temporal Dead Zone
const name1 = "Mike"; // 함수 선언 및 할당
console.log(name1); // 사용가능



// 바로, TDZ (Temporal Dead Zone) 영역에 있는 변수는 사용할 수 없기 때문

// let과 const는 TDZ의 영향을 받는다
// 할당을 하기 전에는 사용할 수 없다.
// => 코드를 예측 가능하게 하고, 잠재적인 버그를 줄일 수 있다 


let age = 30;

function showAge () {
    console.log(age);
}

showAge();

// 위의 코드는 문제가 없다 


let age1 = 30;

function showAge1 () {
    console.log(age1);
    let age1 = 20;
}

showAge1 ();

// let은 호이스팅 되지 않는구나~ 하고 생각할 수 있지만,
// 호이스팅은 스코프 단위로 일어난다 
// 스코프는 함수 내부

// let으로 선언한 두번 째 age 변수가 호이스팅을 일으킨다.
// 만약 호이스팅이 되지 않았다면,
// 함수 바깥에서 선언한 age1 = 30이 정상적으로 찍혀야 한다 


// 변수의 생성과정
// 1. 선언 단계 2. 초기화 단계 3. 할당 단계

// let은 선언 단계와 초기화 단계가 분리되어 진행
// 호이스팅 되면서 선언 단계가 진행되지만,
// 초기화 단계는 실제 코드에 도달했을 때 진행되기 때문에
// 레퍼런스 에러가 발생

// const는 선언과 할당이 동시에 진행


let name2;
name2 = "Mike";

var age2;
age = 30;

// const gender; // // 오류떠서 주석처리함
gender = 'male'; // Error, 선언하면서 바로 할당하지 않았기 때문


// 블록 스코프는 모든 코드 블록내에서 선언된 변수는
// 코드 블록 내에서만 유요하며,
// 외부에서 접근할 수 없다는 의미이다
// => 지역변수 
// (함수, if문, for문, while문, try / catch문 등 )

const age3 = 30;
if (age3 > 19) {
    var txt = '성인';
}

console.log(txt); //성인 찍힘
// if문 안에서 var로 선언된 지역 변수는 
// if문 밖에서도 사용가능

// let과 constsms 함수 {중괄호} 내부에서만 사용할 수 있다 
// => 블록 스코프 