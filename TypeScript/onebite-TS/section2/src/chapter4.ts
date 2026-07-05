// 타입 별칭

type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};

let user: User = {
  id: 1,
  name: '이슬기',
  nickname: '쓸맘',
  birth: '1987.06.18',
  bio: '안녕',
  location: '하남시',
};

let user2: User = {
  id: 2,
  name: '채병주',
  nickname: '승환아빠',
  birth: '1985.06.05',
  bio: '안녕',
  location: '하남시',
};

// 인덱스 시그니처

type CountryCodes = {
  [key: string]: string;
};

let countryCodes: CountryCodes = {
  Korea: 'ko',
  UnitedState: 'us',
  UnitedKingdom: 'uk',
};

type CountryNumberCodes = {
  [key: string]: number;
  Korea: number;
};

let countryNumberCodes: CountryNumberCodes = {
  Korea: 410,
  UnitedStates: 840,
  UnitedKingdom: 826,
};
