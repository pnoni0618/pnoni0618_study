/**
 * 타입 단언
 */

type Person = {
  name: string;
  age: number;
};

let person = {} as Person;
person.name = '이슬기';
person.age = 30;

type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: '돌돌이',
  color: 'brown',
  breed: '진도',
} as Dog;

/**
 * 타입 단언의 규칙
 * 값 as 단언 <- 단언식
 * A as B
 * A가 B의 슈퍼 타입이거나
 * A가 B의 서브타입이어야 함
 */

let num1 = 10 as never;
let num2 = 10 as unknown;

let num3 = 10 as unknown as string; // 다중 단언

/**
 * const 단언
 */

let num4 = 10 as const;

let cat = {
  name: '야옹이',
  color: 'yellow',
} as const;

// 모든 프로퍼티를 readonly로 바꿀수 있어서 유용하다

/** Non Null 단언
 *
 */

type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: '게시글1',
  author: '쓸맘',
};

const len: number = post.author!.length;
// 옵셔널 체이닝
// ? -> ! 로 바꿔줌
