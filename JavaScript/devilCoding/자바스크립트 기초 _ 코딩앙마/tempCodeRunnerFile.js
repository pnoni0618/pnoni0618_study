const userList = [
  {
    name: 'Mike',
    age: 30,
    hegiht: 180,
    weight: 180,
  },
  {
    name: 'bingjoo',
    age: 40,
    hegiht: 160,
    weight: 50,
  },
  {
    name: 'seulkee',
    age: 20,
    hegiht: 200,
    weight: 200,
  },
  {
    name: 'jjwunggHWaw',
    age: 18,
    hegiht: 170,
    weight: 48,
  },
];

console.log(userList.length);
console.log(userList);

for (let index = 0; index < userList.length; index++) {
  console.log(userList[index]);
}

console.log('\n\n\n\n\n');
console.log('연습문제2');

// for (const user of userList) {
//   //console.log(user);
//   for (let key in user) {
//     console.log(`His ${key} is ${user[key]}.`);
//   }
// //   console.log('\n');
// }

for (const user of userList) {
  for (let key in user) {
    console.log(`His ${key} is ${user[key]}.`);
  }
  console.log('\n');
}
