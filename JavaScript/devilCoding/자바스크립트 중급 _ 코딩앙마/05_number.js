// toString() 문자열로 변환, 특정 진수로 바꾸는 코드

let num = 10;

num.toString();
num.toString(2);

let num2 = 255;

num2.toString(16);

console.log(num.toString());
console.log(num.toString(2));
console.log(num2.toString(16));

console.log(typeof num.toString());
console.log(typeof num.toString(2));
console.log(typeof num2.toString(16));

console.log(Math.PI);

// Math.ceil 올림

let num3 = 5.1;
let num4 = 5.8;

console.log(Math.ceil(num3));
console.log(Math.ceil(num4));

// Math.floor() 내림

let num5 = 5.1;
let num6 = 5.8;

console.log(Math.floor(num5));
console.log(Math.floor(num6));

// Math.round() 반올림

console.log(Math.round(num5));
console.log(Math.round(num6));

// 소수점 자릿수 표현법
// 100을 곱하고 반올림 해준 뒤 다시 100을 나누면 됨

let userRate = 30.1234;
// userRate = Math.round(userRate * 100) / 100;

// 또는 toFixed() 사용하면 됨 (단, 문자열로 반환되므로 숫자로 변환!)

userRate = Number(userRate.toFixed(2));

console.log(userRate);

// isNaN() NaN인지 아닌지 판단해준다

let x = Number('x');
console.log(x == NaN);
console.log(x === NaN);
console.log(NaN == NaN);

console.log(isNaN(x));
console.log(isNaN(3));

console.log(typeof x);
console.log(x);

// parseInt() 문자열을 숫자로 바꿔준다
// Number와 다른 점은 문자와 혼용돼있어도 동작을 한다

let margin = '10px';

console.log(parseInt(margin));
console.log(typeof margin); // 원래 margin은 문자열인데
console.log(typeof parseInt(margin)); // pareInt 변환해서 숫자로 바뀜

let redColor = 'f3';
console.log(parseInt(redColor)); // 읽을 수 있는 부분까지는 읽고 (숫자),
//  문자를 만나면 숫자로 반환한다. 그래서 숫자로 시작하지 않으면 NaN 반환

// parseInt는 두번째 인수를 받아서 진수를 표현할 수 잇다

console.log(parseInt(redColor, 16));
console.log(parseInt('11', 2));

// parseFloat() 는 parseInt와 동일하게 작동하지만,
// 부동 소수점을 반환한다
// parseInt는 정수만 반환한다

let padding = '18.5%';

console.log(parseInt(padding));
console.log(parseFloat(padding));

// Math.random() 0~1사이 무작위 숫자 생성

console.log(Math.random());
console.log(Math.random());
console.log(Math.random());

// 만약 1에서 100까지 임이의 숫자를 뽑고 싶다면?

let mathRandom = Math.floor(Math.random() * 100) + 1;
console.log(mathRandom); // 실행할 때마다 다른 값이 나옴

// 인수들 중 최대값, 최소값 구하기

let mathMax = Math.max(1, 4, -1, 5, 10, 9, 5.54);
let mathMin = Math.min(1, 4, -1, 5, 10, 9, 5.54);

console.log(mathMax, mathMin); // 10, -1

// Math.abs() 절대값 구하기

console.log(Math.abs(-4));

// Math.pow(n, m) 거듭제곱 구하기

console.log(Math.pow(2, 10));

// Math.sqrt() 제곱근 구하기

console.log(Math.sqrt(16));
