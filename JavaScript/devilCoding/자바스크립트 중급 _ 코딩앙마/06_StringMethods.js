let list = [
  '01. 들어가며',
  '02. JS의 역사',
  '03. 자료형',
  '04, 함수',
  '05, 배열',
];
// for문을 이용해 숫자는 제외하고 글자들만 찍어보자

let newList = [];

for (let i = 0; i < list.length; i++) {
  // list.length만큼 돌면서 newList에 넣어주게 된다
  newList.push(list[i].slice(4));
}

console.log(newList);

// 금칙어 : 콜라 (욕을 사용할 수 없으니까 ㅋㅋ)

function hasCola(str) {
  if (str.indexOf('콜라') > -1) {
    console.log('금칙어가 있습니다.');
  } else {
    console.log('통과');
  }
}

hasCola('와 사이다가 짱이야!'); // -1
hasCola('무슨소리, 콜라가 최고!');
hasCola('콜라'); // 0

// includes
// 문자가 있으면 true
// 없으면 false 반환

function hasCola(str) {
  if (str.includes('콜라')) {
    console.log('금칙어가 있습니다 ');
  } else {
    console.log('통과');
  }
}

hasCola('와 사이다가 짱이야!');
hasCola('무슨소리, 콜라가 최고!');
hasCola('콜라');
