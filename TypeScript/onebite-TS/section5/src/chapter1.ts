/**
 * 인터페이스의 확장
 */

interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  isBark: boolean;
}
const dog: Dog = {
  name: '',
  color: '',
  isBark: true,
};

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}

interface DogCat extends Dog, Cat {}

// 다중확장

const dogCat: DogCat = {
  name: '',
  color: '',
  isBark: true,
  isScratch: true,
};

// 타입별칭보다는 되도록 인터페이스를 사용하도록 하자 