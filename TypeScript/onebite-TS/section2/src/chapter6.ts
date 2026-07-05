// any
// 특정 변수의 타입을 우리가 확실히 모를때

let anyVar: any = 10;
anyVar = 'Hello';

// unknown

let unknownVar: unknown;
unknownVar = '';
unknownVar = 1;
unknownVar = () => {};
