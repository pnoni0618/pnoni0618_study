// 비교연산자
// < 크다, > 작다, <= 크거나 같다, >= 작거나 같다, == 같다, != 다르다
// true, false로 반환


console.log(10 < 5);
console.log(10 == 5); // 동등 연산자
console.log(10 != 5);

// 동등 연산자 

const a = 1;
const b = "1";

console.log(a == b);
console.log(a === b); // 일치연산자, 타입까지 비교 

// 조건문 if

const age = 19;

if(age > 19){
    console.log('환영합니다.');
} else if(age === 19){
    console.log('수능 잘 치세요.');
} else{
    console.log('안녕히 가세요.');
}