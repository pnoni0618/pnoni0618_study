// 배열 Array

let days = ["mon", "tue", "wed"];

days[1] = '화요일' // 배열1 변경
console.log(days[1]); // 호출방법
console.log(days.length); // 배열 길이 호출 => 3
days.push('thu'); // 배열 맨 끝에 thu 추가
days.unshift('sun'); // 배열 맨 앞에 sun 추가

console.log(days);

// for문을 이용해 반복 실습

for(let index = 0; index < days.length; index++) {
    console.log(days[index])
}

//for ... of


let days1 = ["Mon", "Tue", "Wed"];

days1.push("Thu");
days1.unshift("Sun");

for (let index = 0; index < days1.length; index++) {
    console.log(days1[index])
}

for (let x of days1) {
    console.log(x)
}