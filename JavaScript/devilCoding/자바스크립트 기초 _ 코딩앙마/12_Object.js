// 객체 Object
// {} 중괄호로 작성하고, 
// name (키, key) : 'clark' (값, value)으로 작성된 프로퍼티가 들어감 
// 각 프로퍼티는 , 쉼표로 구분함 
// 마지막 프로퍼티도 ,작성해야 수정, 이동, 삭제에 용이

const superman = {
    name : 'clark',
    age : 33,
}

// Object - 접근, 추가, 삭제 
// . 점과 [] 대괄호 사용

// 접근

superman.name // 'clark'
supernam['age']

// 추가

superman.gender = 'male';
superman['hairColor'] = 'black';

// 삭제
delete superman.hairColor;

// 단축 프로퍼티 

const name1 = 'clark';
const age1 = 33;

// const superman1 = {
//     name2, //name : name,
//     age2, //age : age,
//     gender : 'male',
// }

// 프로퍼티 존재 여부 확인

superman.brithDay;
// undefiend

// in 연산자를 사용하면 프로퍼티가 있는지 확인할 수 있다 
// . 이나 []를 사용하면 될텐데, 언제 in을 쓸까?
// 어떤 값이 나올지 확신할 수 없을때 사용
// 함수 인자로 받거나, API 통신을 통해 데이터를 받을 때 

'birthDay' in superman;
// false

'age' in superman;
//true

// for ... in 반복문
// 객체를 순회하며 값을 얻을 수 있다 

for (let key in superman){
    console.log(key)
    console.log(superman[key])
}

// ==============실습==================

// 객체 예제

const superman = {
    name : 'clark',
    age : 30,
}

console.log(superman.name)
console.log(superman['age'])

// 객체 추가 

superman.hairColor = "black";
superman['hobby'] = 'football';

console.log(superman);

// 객체 삭제 

delete superman.age;
console.log(superman);


// 객체 

function makeobject(name, age) {
    return{
        name,
        age,
        hobby : 'football',
    }
}

const Mike = makeobject('Mike', 30);
console.log(Mike);


// 객체 in을 활용해 프로퍼티 존재하는지 확인

console.log('age' in Mike); // true
console.log('birthday' in Mike); // false


// 나이를 확인하고 성인인지 구분해주는 함수,
// 인수를 user 객체로 받고, 

function isAdult(user) {
    if(user.age < 20){
        return false;
    } 
    return true;
}

const Mike1 = {
    name : 'Mike',
    age : 30
}

const Jane = {
    name : "Jane",
}

console.log(isAdult(Mike1))
console.log(isAdult(Jane))
// 나이를 입력하지 않았는데 true가 나오면 안됨!

// 수정버전


function isAdult(user) {
    if(!('age' in user) || // user에 age가 없거나,
    user.age <20) { // 20살 미만이거나
        return false;
    }
    return true;
}

console.log("수정 후")
console.log(isAdult(Mike1))
console.log(isAdult(Jane))


// for ... in 예제

const Mike2 = {
    name : "Mike",
    age : 30,
}

for (X in Mike2) {
    console.log (X); // key값 나옴 
    console.log (Mike2[X]) // 문자열을 이용해서 값을 호출 
}