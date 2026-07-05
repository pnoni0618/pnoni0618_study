// void
// void -> 공허 -> 아무것도 없다.
// void -> 아무것도 없음을 의미하는 타입

function func1(): string {
  return 'Hello';
}

function func2(): void {
  console.log("Hello")
}

let a: void;
a = undefined;


// never
// never -> 존재하지 않는
// 불가능한 타입

function func3(): never {
  while (true) {}
}

function func4() : never {
  throw new Error();
}

let anyVar: any;

let b: never;
// b = undefined;
// b = null;
// b = anyVar;

