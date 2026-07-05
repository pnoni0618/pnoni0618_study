let arr = [
  {
    name: '채승환',
    age: 9,
    stockList: ['S&P 500', '나스닥', '삼성'],
    address: '감이동',
  },
  {
    name: '최승환',
    age: 6,
    stockList: ['엔비디아', '스피어'],
    address: '둔촌동',
  },
  { name: '김승환', age: 3, stockList: ['s&p500'], address: '거여동' },
  { name: '박승환', age: 4, stockList: ['타이거국채'], address: '마천동' },
  { name: '윤정화', age: 40, stockList: [], address: '미국' },
  { name: '허성신', age: 50, stockList: [], address: '성남' },
  {
    name: '임시은',
    age: 9,
    stockList: ['네이버', '카카오', '토스', '구글', '아마존', '애플'],
    address: '분당',
  },
  {
    name: '된장국슬기',
    age: 49,
    stockList: [
      '네이버',
      '카카오',
      '토스',
      '구글',
      '아마존',
      '애플',
      '버크셔',
      '블랙록',
    ],
    address: '강남',
  },
  {
    name: '미역국슬기',
    age: 60,
    stockList: ['네이버', '카카오'],
    address: '하남',
  },
];

const mySort = (paramArr, key, type = 'asc') => {
  const resultSu = type === 'asc' ? 1 : -1;

  return [...paramArr].sort((a, b) => {
    let compare1 = null;
    let compare2 = null;

    // age 정렬
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      compare1 = a[key] > b[key]; // a를 뒤로보낸다
      compare2 = a[key] < b[key]; // a를 앞으로 보낸다
    } // name, address 정렬
    else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      const compareString = a[key].localeCompare(b[key]);
      compare1 = compareString > 0; // 양수일 경우
      compare2 = compareString < 0; // 음수일 경우
    } else if (typeof a[key] === 'object' && typeof b[key] === 'object') {
      if (Array.isArray(a[key]) && Array.isArray(b[key])) {
        compare1 = a[key].length > b[key].length;
        compare2 = a[key].length < b[key].length;
      }
    }
    if (compare1) {
      return resultSu;
    } else if (compare2) {
      return resultSu * -1;
    } else {
      return 0;
    }
  });
};

const ageAsc = mySort(arr, 'age', 'asc');
console.log(`\n나이 오름차순`);
console.log(ageAsc);

const ageDesc = mySort(arr, 'age', 'desc');
console.log(`\n나이 내림차순`);
console.log(ageDesc);

const nameAsc = mySort(arr, 'name', 'asc');
console.log(`\n이름 오름차순`);
console.log(nameAsc);

const nameDesc = mySort(arr, 'name', 'desc');
console.log(`\n이름 내림차순`);
console.log(nameDesc);

const addressAsc = mySort(arr, 'address', 'asc');
console.log(`\n주소 오름차순`);
console.log(addressAsc);

const addressDesc = mySort(arr, 'address', 'desc');
console.log(`\n주소 내림차순`);
console.log(addressDesc);

const stockAsc = mySort(arr, 'stockList', 'asc');
console.log(`\n보유주식 갯수 오름차순`);
console.log(stockAsc);

const stockDesc = mySort(arr, 'stockList', 'desc');
console.log(`\n보유주식 갯수 내림차순`);
console.log(stockDesc);
