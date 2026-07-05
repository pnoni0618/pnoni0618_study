// object
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: '이슬기',
};

user.id;

let dog: {
  name: string;
  color: string;
} = {
  name: '돌돌이',
  color: 'brown',
};

let config: {
  // readonly
  apiKey: string;
} = {
  apiKey: 'MY API KEY',
};

config.apiKey = 'hacked';
