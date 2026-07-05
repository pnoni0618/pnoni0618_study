/********************************
arr.sort()
배열 재정렬
주의! 배열 자체가 변경됨
인수로 정렬 로직을 담은 함수를 받음 
*********************************/

let arr = [1, 5, 3, 4, 2];

arr.sort();
console.log(arr);

// 예제 2

let arr2 = ['a', 'c', 'd', 'e', 'b'];
arr2.sort();

console.log(arr2);

// 예제3

let arr3 = [27, 8, 5, 13];

function fn(a, b) {
  return a - b;
}

arr3.sort(fn);
console.log(arr3);

// 화살표 함수로 더 간략하게 표기하기

arr3.sort((a, b) => {
  console.log(a, b);
  return a - b;
});

console.log(arr3);

/****************************************
arr.reduce()
인수로 함수를 받음
(누적 계산값, 현재값) => { return 계산값 };
******************************************/

// 배열의 모든 수 합치기
let arr4 = [1, 2, 3, 4, 5];

let result = 0;
arr.forEach((num) => {
  result += num;
});

console.log(result);

// 위의 작업을 한번에 할 수 있는게 arr.reduce ()

const result2 = arr4.reduce((prev, cur) => {
  return prev + cur;
}, 100); // 초기값 100넣음

console.log(result2);

// userList에서 나이를 판단해 성인만 뽑아보기

let userList = [
  { name: 'Mike', age: 30 },
  { name: 'Tom', age: 10 },
  { name: 'Jane', age: 27 },
  { name: 'Sue', age: 26 },
  { name: 'Harry', age: 42 },
  { name: 'Steve', age: 60 },
];

let result3 = userList.reduce((prev, cur) => {
  if (cur.age > 19) {
    prev.push(cur.name);
  }
  return prev;
}, []);

console.log(result3);

// 나이의 합을 구하려면?

let result4 = userList.reduce((prev, cur) => {
  return (prev += cur.age);
}, 0);

console.log(result4);

// 이름이 3자인 사람만 찾아볼까?

let result5 = userList.reduce((prev, cur) => {
  if (cur.name.length === 3) {
    prev.push(cur.name);
  }
  return prev;
}, []);

console.log(result5);
