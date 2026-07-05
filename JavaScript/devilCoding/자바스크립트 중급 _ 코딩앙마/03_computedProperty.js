let n = 'name';
let a = 'age';

const user = {
  [n]: 'Mike',
  [a]: 30,
  [1 + 4]: 5,
};

console.log(user);

// 어떤게 키가 될지 모르는 객체를 만들 때 유용한 함수

function makeObj(key, val) {
  return {
    [key]: val,
  };
}

const obj = makeObj('나이', 33);
console.log(obj);

const user1 = {
  name: '채승환',
  age: 7,
};

const user2 = Object.assign({}, user1);
user2.name = '채병주';

console.log(user1);
console.log(user2);

const result = Object.keys(user1); // 키 값만 반환
const result1 = Object.values(user1); // value값만 반환
console.log(result);
console.log(result1);

// key, value 둘 다 얻고 싶으면?

const result3 = Object.entries(user1);
console.log(result3);

let arr = [
  ['mom', '월'],
  ['tue', '화'],
];

const result4 = Object.fromEntries(arr);
console.log(result4);
