/**
 *  기본 타입간의 호환성
 */

let num1: number = 10;
let num2: 10 = 10;

num1 = num2;

/**
 * 객체 타입간의 호환성
 * -> 어떤 객체타입을 다른 객체타입으로 취급해도 괜찮은가?
 */

type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: '기린',
  color: 'yellow',
};

let dog: Dog = {
  name: '돌돌이',
  color: 'brown',
  breed: '진도',
};

animal = dog;
// dog = animal

type ProgramingBook = {
  name: string;
  price: number;
  skill: string;
};

let book: Book;
let programingBook: ProgramingBook = {
  name: '코딩책',
  price: 30000,
  skill: 'TS',
};

book = programingBook;
// programingBook = book

/**
 * 초과 프로퍼티 검사
 */

type Book = {
  name: string;
  price: number;
};

let book2: Book = {
  name: '책이름',
  price: 33000,
  // skill: "ts" 개체 리터럴은 알려진 속성만 지정할 수 있으며 'Book' 형식에 'skill'이(가) 없습니다.
};

let book3: Book = programingBook;

function func(book: Book) {}
func({
  name: '책이름',
  price: 2000,
  // skill: 'ts',
});
func(programingBook);
