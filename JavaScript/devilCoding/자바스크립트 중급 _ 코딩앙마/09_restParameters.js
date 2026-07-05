/*****************************
 * 나머지 매개변수
 * 전달 받은 모든 수를 더해야 함
 ******************************/

// function add(...numbers) {
//   let result = 0;
//   numbers.forEach((num) => (result += num));
//   console.log(result);
// }

add(1, 2, 3);
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

function add(...numbers) {
  let result = numbers.reduce((prev, cur) => prev + cur);
  console.log(result);
}

/***********************************************
 * user 객체를 만들어 주는 생성자 함수를 만들어보자
 **********************************************/

function User(name, age, ...skills) {
  this.name = name;
  this.age = age;
  this.skills = skills;
}

const user1 = new User('Mike', 30, 'html', 'css');
const user2 = new User('Tom', 20, 'JS', 'React');
const user3 = new User('Jane', 10, 'English');

console.log(user1);
console.log(user2);
console.log(user3);

/***********************************************
 * 전개구문
 * arr1을 [4, 5, 6, 1, 2, 3] 으로
 **********************************************/

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// arr2를 루프로 돌면서 arr1에 넣어주면 되겠죠?

arr2.reverse().forEach((num) => {
  arr1.unshift(num);
});

// 위에 꺼가 너무 복잡하니까 간단하게 전개구문으로

arr1 = [...arr2, ...arr1];

console.log(arr1);


/***********************
 * 전개구문
 * 객체에서도 사용해보자 
 ***********************/

let user = { name: "Mike"};
let info = { age: 30};
let fe = ["JS", "React"];
let lang = ["Korean", "English"];

user = Object.assign({},
  
)
