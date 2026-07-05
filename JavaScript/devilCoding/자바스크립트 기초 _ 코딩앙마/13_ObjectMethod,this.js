// 객체 (Object)_ method, this
// 객체에 method와 method 작성시 this의 변화


// let boy = {
//     name : "Mike",
//     showName : function () {
//         console.log(boy.name)
//     }
// };


let boy = {
    name : "Mike",
    showName : function () {
        console.log(this.name) // 메소드에서는 객체명 (boy)를 직접 써주는 것보다 this를 써주는게 좋다!!
    }
};

boy.showName();

let man = boy; // 사람은 Mike 한 명인데 별명이 2개 (man, boy)

// man.name = "TOM";
// console.log(boy.name); => TOM으로 찍힘

// man.showName (); => "Mike"로 잘 찍힘

boy = null; // boy값이 사라졌음 
man.showName(); // 에러발생 


// method 화살표 함수

// let boy = {
//     name : "Mike",
//     sayThis : function () {
//         console.log(this)
//     }
// };

// boy1.sayThis(); // 콘솔에 객체 내용 잘 찍힘 

let boy1 = {
    name : "Mike",
    sayThis : () => {
        console.log(this)
    }
};

boy1.sayThis();

// 화살표 함수로 메소드를 작성하면,
// this는 boy1을 가리키는게 아니라 window(전역객체)를 가리키게 된다
// 객체에 메소드를 작성할 때는 화살표 함수로 작성하지 않는게 좋다 


