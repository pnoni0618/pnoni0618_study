// 비동기처리

// setTimeout(() => {
//   console.log('3초만 기다리세요');
// }, 3000);

// console.log('종료');

// const work = (callback) => {
//   setTimeout(() => {
//     console.log('3초만 기다리세요');
//     callback();
//   }, 3000);
// };

// work(() => {
//   console.log('종료');
// });

// const work = (callback) => {
//   console.log('A');
//   setTimeout(() => {
//     console.log('B');
//     callback();
//   }, 3000);
// };

// work(() => {
//   console.log('C');
// });

const workA = (value, callback) => {
  setTimeout(() => {
    callback(value);
  }, 5000);
};

const workB = (value, callback) => {
  setTimeout(() => {
    callback(value);
  }, 3000);
};

const workC = (value, callback) => {
  setTimeout(() => {
    callback(value);
  }, 1000);
};

const workD = (value, callback) => {
  setTimeout(() => {
    callback(value);
  });
};

workA('workA', (res) => {
  console.log(res);
});

workB('workB', (res) => {
  console.log(res);
});

workC('workC', (res) => {
  console.log(res);
});

workD('workD', (res) => {
  console.log(res);
});
