// 타입스크립트가 해당 값을 바탕으로 추론을 수행하는 두 가지 핵심 개념을 소개하겠다
// 유니언 Union _ 값에 허용된 두 개 이상의 가능한 타입으로 확장하는것
// 내로잉 Narrowing _ 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히는 것

// 1. 유니언 타입
// 아래의 mathematician의 타입은 무엇일까요?
let methematician = Math.random() > 0.5 ? undefined : '슬기';

// 둘 다 잠재적인 타입이긴 하지만, 무조건 undefined 이거나 혹은 string인 것도 아니다
// mathmetician은 undefined이거나 string일 수 있다. 이렇게 "이거 혹은 저거"와 같은 타입을 유니언이라고 한다

// 유니언 타입은 값이 정학히 어떤 타입인지 모르지만 두 개 이상의 옵션 중 하나라는 것을 알고 있는 경우에 코드를 처리하는 훌륭한 개념이다

// 1-1. 유니언 타입의 선언
// 유니언 타입 선언의 순서는 중요하지 않다
let user1: string | null = null;
let user2: null | string = null;

// 1-2. 유니언 속성
// 값이 유니언 타입일 때, 타입스크립트는 유니언으로 선언한 모든 가능한 타입에 존재하는 멤버 속성에만 접근할 수 있다.
// 유니언 외의 타입에 접근하려고 하면 타입 검사 오류가 발생한다.

let developer = Math.random() > 0.5 ? '슬기' : 1000;
developer.toString(); // Ok
// developer.toUpperCase(); // 'string | number' 형식에 'toFixed' 속성이 없습니다.
// developer.toFixed(); //'string | number' 형식에 'toFixed' 속성이 없습니다.

// 2. 내로잉 Narrowing
// 값의 정이, 선언 혹은 이전에 유추된 것보다 더 구체적인 타입임을 코드에서 유추하는 것이다.
// 타입스크립트가 값의 타입이 이전에 알려진 것보다 더 좁혀졌다는 것을 알게 되면 값을 더 구체적인 타입으로 취급한다.
// 타입을 좁히는데 사용할 수 있는 논리적 검사를 타입 가드(Type Guard)라고 한다.

// 2-1. 값 할당을 내로잉

let scientist: string | number;
scientist = '슬기';
scientist.toString();
// scientist.toFixed(); // Error

let inventor: number | string = '슬기'; // 값을 할당하는 자체가 narrowing 과정 중 하나다
inventor.toString();
// inventor.toFixed(); // Error
inventor.toUpperCase();

// 2-2. 조건 검사를 통한 내로잉

let teacher = Math.random() > 0.5 ? 'Franklin' : 51;

if (teacher === 'Franklin') {
  teacher.toUpperCase();
}
// teacher.toUpperCase(); // 'string | number' 형식에 'toUpperCase' 속성이 없습니다.

// 2-3. typeof 검사를 통한 내로잉
let researcher = Math.random() > 0.5 ? 'Franklin' : 51;

if (typeof researcher === 'string') {
  researcher.toUpperCase();
} else {
  researcher.toFixed();
}

if (!(typeof researcher === 'string')) {
  researcher.toFixed();
} else {
  researcher.toUpperCase();
}

typeof researcher === 'string'
  ? researcher.toUpperCase()
  : researcher.toFixed();

// 3. 리터럴 타입

const planner = '슬기';
let designer = '슬기';

let lifespan: number | 'ongoing' | 'uncertain';

lifespan = 10;
lifespan = 'ongoing';
lifespan = 'uncertain';
// lifesapn = true; // Error: 'true' 형식은 'number' | "ongoing" | "uncertain" 형식에 할당할 수 없다.

// 4. 초깃값이 없는 변수

let physicist: string;
// physicist.length; // Error : 'physicist' 변수가 할당되기 전에 사용되었습니다.
physicist = 'Mark Goldberg';
physicist.length; // ok

let biologist: string | undefined;
biologist?.length; // ok
