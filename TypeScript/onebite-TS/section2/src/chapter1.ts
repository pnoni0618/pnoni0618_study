// number
let num1: number = 123;
let num2: number = -123;
let num3: number = 0.123;
let num4: number = -0.123;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;

// string

let str1: string = 'hello';
let str2: string = 'hello';
let str3: string = `hello`;
let str4: string = `hello ${num1}`;

// boolean
let bool1: boolean = true;
let bool2: boolean = false;

// null
let null1: null = null;

// undefined
let unde1: undefined = undefined;

// 리터럴 타입
// 값(리터럴) 그 자체가 타입이 되는 타입

let numA: 10 = 10;

let strA: 'hello' = 'hello';

let boolA: true = true;

// 튜플
// 길이와 타입이 고정된 배열
let tup1: [number, number] = [1, 2];
let tup2: [number, string, boolean] = [1, '2', true];

const users: [string, number][] = [
  ['이슬기', 1],
  ['채승환', 2],
  ['채병주', 3],
  //   [4, "박아무개"],
];
