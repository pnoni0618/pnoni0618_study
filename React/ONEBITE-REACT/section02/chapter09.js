// 5가지의 배열 변형 메서드
// 1. filter
// 기존 배열에서 조건을 만족하는 요소들만 필터링하여 새로운 배열로 반환

let arr1 = [
  { name: '이정환', hobby: '테니스' },
  { name: '김효빈', hobby: '테니스' },
  { name: '홍길동', hobby: '독서' },
];

const tennisPeople = arr1.filter((item) => item.hobby === '테니스');

// console.log(tennisPeople);

// 2. map
// 배열의 모든 요소를 순회하면서, 각각 콜백함수를 실행하고 그 결과값들을 모아서 새로운 배열로 반환

let arr2 = [1, 2, 3];
const mapResult = arr2.map((item, idx, arr) => {
  return item * 2;
});

// console.log(mapResult);

let names = arr1.map((item) => item.name);
// console.log(names);

// 3. sort
// 배열을 사전순으로 정렬하는 메서드

let arr3 = [10, 3, 5];
arr3.sort((a, b) => {
  if (a > b) {
    // a가  b앞에 와라
    return -1;
  } else if (a < b) {
    //  b가 a 앞에 와라
    return 1;
  } else {
    // 두 값의 자리를 바꾸지 마라 (순서유지)
    return 0;
  }
});

// console.log(arr3);

let arr4 = [
  {
    name: '채승환',
    age: 9,
    stockList: ['s&p500', '나스닥', '삼성'],
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

const mySort = (paramArr, key, direction = 'asc') => {
  const resultSu = direction === 'asc' ? 1 : -1;

  return [...paramArr].sort((a, b) => {
    let compare1 = null;
    let compare2 = null;

    // console.log(typeof a[key]);
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      compare1 = a[key] > b[key];
      compare2 = a[key] < b[key];
    }
    // 이름 주소 모두 정렬가능해!
    else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      const compareString = a[key].localeCompare(b[key]);
      compare1 = compareString > 0;
      compare2 = compareString < 0;
    }
    // 가지고 있는 주식의 갯수대로 정렬
    else if (typeof a[key] === 'object' && typeof b[key] === 'object') {
      // 객체, 배열, 함수 [], {} 둘다 obeject로 떨어진다.

      // 배열일때 Array.isArray 가 true로 나오기때문에 이렇게 한번 감싸주면된다
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

    // 아래는 겁나 못난이 개발자 (몸무게나 키 정렬 추가 해달라고하면?? 여기에 또 if문 추가할래??? 경각심을 가지세요)
    /*
    if (key === 'age') {
      // 단순히 나이만 비교 가능했던 이프문!
      if (a[key] > b[key]) {
        return resultSu;
      } else if (a[key] < b[key]) {
        return resultSu * -1;
      } else {
        return 0;
      }
    } else if (key === 'name') {
      // 단순히 이름만 비고가능했던 이프문!
      const compare = a.name.localeCompare(b.name);
      if (compare > 0) {
        return resultSu;
      } else if (compare < 0) {
        return resultSu * -1;
      } else {
        return 0;
      }
    }
    // 단순히 주소만 비교 가능했던 이프문!
    else if (key === 'address') {
      const compare = a.address.localeCompare(b.address);
      if (compare > 0) {
        return resultSu;
      } else if (compare < 0) {
        return resultSu * -1;
      } else {
        return 0;
      }
    }
    // 단순히 주식갯수만 비교 가능했던 이프문!
    else if (key === 'stockList') {
      if (a[key].length > b[key].length) {
        return resultSu;
      } else if (a[key] < b[key]) {
        return resultSu * -1;
      } else {
        return 0;
      }
    }*/

    // 몸무게나 키 정렬 추가 해달라고하면?? 여기에 또 if문 추가할래??? 경각심을 가지세요
  });
};

// const ageAsc = mySort(arr4, 'age', 'asc');
// console.log('\n나이 오름차순 정렬');
// console.log(ageAsc);

// const ageDesc = mySort(arr4, 'age', 'desc');
// console.log('\n나이 내림차순 정렬');
// console.log(ageDesc);

// const nameAsc = mySort(arr4, 'name', 'asc');
// console.log('\n이름 오름차순 정렬');
// console.log(nameAsc);

// const nameDesc = mySort(arr4, 'name', 'desc');
// console.log('\n이름 내림차순 정렬');
// console.log(nameDesc);

// const addressAsc = mySort(arr4, 'address', 'asc');
// console.log('\n주소 오름차순 정렬');
// console.log(addressAsc);

// const addressDesc = mySort(arr4, 'address', 'desc');
// console.log('\n주소 내림차순 정렬');
// console.log(addressDesc);

// const stockAsc = mySort(arr4, 'stockList', 'asc');
// console.log('\n보유주식 갯수 오름차순 정렬');
// console.log(stockAsc);

// const stockDesc = mySort(arr4, 'stockList', 'desc');
// console.log('\n보유주식 갯수 내림차순 정렬');
// console.log(stockDesc);
