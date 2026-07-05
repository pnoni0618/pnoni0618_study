// forEach

let arr = ['Mike', 'Tom', 'Jane'];

arr.forEach((name, index) => {
  console.log(name);
});

arr.forEach((name, index) => {
  console.log(`${index + 1}. ${name}`);
});

// find / findeIndex

let arr1 = [1, 2, 3, 4, 5];

const result = arr1.find((item) => {
  return item % 2 === 0; // 2로 나눴을 때 나머지가 0인 요소를 찾아냄 (짝수) 리턴 값이 트루일때 멈추고 값을 알려줌
});

console.log(result);

// 미성년자를 찾아보자

let userList = [
  { name: 'Mike', age: 30 },
  { name: 'Jane', age: 27 },
  { name: 'Tom', age: 10 },
];

const result2 = userList.find((user) => {
  if (user.age < 19) {
    return true;
  }
  return false;
});
console.log(result2);

// findIndex는 조건에 해당하는 객체의 인덱스를 반환
// 주의할 점은, 첫번째 true 값만 반환하고 끝나버린다

const result3 = userList.findIndex((user) => {
  if (user.age < 19) {
    return true;
  }
  return false;
});
console.log(result3);

// filter, 조건에 맞는 모든 요소 찾기

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];

const result4 = arr2.filter((item) => {
  return item % 2 === 0;
});

console.log(result4);

// arr.map()
// 매번 나이확인하기 귀찮아서 isAdult라는 프로퍼티를 추가한 새로운 배열 만들기

let newUserList = userList.map((user, index) => {
  return Object.assign({}, user, {
    id: index + 1,
    isAdult: user.age > 19,
  });
});

console.log(newUserList);

// 배열을 합쳐서 문자열을 만들려면 join을 사용하면 된다

let arr3 = ['안녕', '나는', '철수야'];

let result5 = arr3.join('-');
console.log(result5);

// split
// joint와 반대로 문자열을 쪼개서 나눠준다

const users = 'Mike, jane, Tom, Tony';

const result6 = users.split(',');

console.log(result6);

let str = 'Hello, My name is Mike.';
const result7 = str.split('');

console.log(result7);

// Arry.isArry()
// 배열인지 아닌지 확인할 때

let user2 = {
  name: 'Mike',
  age: 30,
};

// user2는 객체, userList2는 배열이다

let userList2 = ['Miek', 'Tom', 'Jane'];

console.log(typeof user2);
console.log(typeof userList2);

console.log(Array.isArray(user2));
console.log(Array.isArray(userList2));

let array = [1, 2];
console.log(array.concat([3, 4]));
console.log(array.concat(5, 6));
