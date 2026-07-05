// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입

enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}

enum Language {
  korean = 'ko',
  english = 'en',
}

const user1 = {
  name: '이슬기',
  role: Role.ADMIN, // 0 <- 관리자
  language: Language.korean,
};

const user2 = {
  name: '채병주',
  role: Role.USER, // 1 <- 일반유저
  language: Language.english,
};

const user3 = {
  name: '채승환',
  role: Role.GUEST, // 2 <- 게스트
  language: Language.english,
};

console.log(user1, user2, user3);
