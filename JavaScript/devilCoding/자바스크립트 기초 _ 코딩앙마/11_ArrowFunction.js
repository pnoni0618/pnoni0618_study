// 함수 선언문 

function sayHello(){
    console.log("Hello");
}

sayHello();


// 함수 표현식 

let sayHello1 = function(){
    console.log("Hello");
}

sayHello1();


// 화살표 함수 arrow Function
// 지금까지 배웠던 함수를 보다 간결하게 작성 가능

let add = function(num1, num2){
    return num1 + num2;
}

let add2 = (num1, num2) => {
    return num1 + num2;
}

// function이 사라지고 괄호 뒤에 화살표가 생김

let add3 = (num1, num2) => (
    num1 + num2
)

// 함수표현식

// showError();

// let showError = function(){
//     console.log('error');
// }

// 함수 선언문

showError();

function showError(){
    console.log("error");
}

// 위의코드를 화살표 함수로 변경


let showError1 = () => {
    console.log("error");
}


const sayHello2 = (name2) => {
    const msg = `Hello, ${name2}`;
    console.log(msg);
}

sayHello2();


const add4 = function (num1, num2){
    const result = num1 + num2;
    return num1 + num2;
}

const add5= (num1, num2) =>  num1 + num2;
