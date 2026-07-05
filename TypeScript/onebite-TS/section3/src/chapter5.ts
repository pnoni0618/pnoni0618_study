/**
 * 타입 추론
 */

let a = 10;
let b = 'hello';
let c = {
  id: 1,
  name: '이슬기',
  profile: {
    nickname: '쓸맘',
  },
  eMail: ['pnoni0618@gmail.com'],
};

let { id, name, profile } = c;
let [one, two, three] = [1, 'Hello', true];

function func(message = 'Hello') {
  return 'Hello';
}

let d;
d = 10;
d.toFixed();

d = 'hello';
d.toUpperCase();
// d.toFixed()

const num = 10;
const str = 'hello';

let arr = [1, 'string'];
