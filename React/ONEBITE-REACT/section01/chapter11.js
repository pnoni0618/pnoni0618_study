// 함수


let area1 = getArea(10, 20);


// 호이스팅
// -> 끌어올리다 라는 뜻

function getArea(width, height) {
  function another() {
    console.log('another');
  }

  another();
  let area = width * height;

  return area;

};