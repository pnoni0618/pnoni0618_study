// 1) DOM 요소 가져오기 (화면에서 조작할 대상들

// 페이지에 있는 모든 button 요소를 전부 선택해서 NodeList로 가져옴
const buttons = document.querySelectorAll('button');

// 컴퓨터 선택을 표시할 영역
const computerChoice = document.querySelector('.computer-choice');

// 사용자 선택을 표시할 영역
const userChoice = document.querySelector('.user-choice');

// 승패 결과 메시지를 표시할 영역
const winner = document.querySelector('.result');

// 2) 게임에서 사용할 데이터

// 컴퓨터가 랜덤으로 고를 수 있는 선택지 3개를 배열로 저장

const result = ['가위', '바위', '보'];

// 3) 화면에 결과를 출력해주는 함수(표시 담당)

// show 함수 : 사용자/ 컴퓨터가 뭘 냈는지 + 결과 문구를 화면에 보여줌
// user : 사용자가 낸 값 (가위/바위/보)
// computer : 컴퓨터가 낸 값 (가위/바위/보)
// result : 결과 메시지 (무승부/사용자 승리!/컴퓨터 승리!)

const show = (user, computer, result) => {
  // 컴퓨터가 낸 값을 화면의 computerChoice 영역에 텍스트로 출력
  computerChoice.innerText = computer;

  // 사용자가 낸 값을 화면의 userChoice 영역에 텍스트로 출력
  userChoice.innerText = user;

  // 승패 결과 메시지를 화면의 winner 영역에 텍스트로 출력
  winner.innerText = result;
};

// 4) 승패를 판단하는 함수 (게임 규칙 담당)

// game 함수 : 사용자 선택과 컴퓨터 선택을 받아서 승/패/무를 결정

const game = (user, computer) => {
  // message 변수 : 최종 결과 문구를 담아둘 변수 (나중에 show에서 출력)
  let message;

  // 사용자의 선택과 컴퓨터의 선택이 같으면 무승부
  if (user === computer) {
    message = '무승부';
  } else {
    // 서로 다를 때는 switch로 케이스를 나눠 처리
    // user + computer : 문자열을 붙여서 한 덩어리로 만들어 비교하기 편하게 함
    // 예 : user = '가위', conmputer = '보'면 '가위보'가 됨
    switch (user + computer) {
      // 사용자가 이기는 경우들
      // 가위 vs 보 => 가위 승
      // 바위 vs 가위 => 바위 승
      // 보 vs 바위 => 보 승
      case '가위보':
      case '바위가위':
      case '보바위':
        // 위 케이스 중 하나라도 걸리면 사용자 승리 메시지를 저장
        message = '사용자 승리!';
        break;

      // 컴퓨터가 이기는 경우들
      case '가위바위':
      case '바위보':
      case '보가위':
        // 위 케이스 중 하나라도 걸리면 컴퓨터 승리 메시지를 저장
        message = '컴퓨터 승리!';
        break;
    }
  }

  // 판단이 끝났으니, show를 호출해서 화면에 user/computer/message를 출력
  show(user, computer, message);
};

// 5) 버튼 클릭 시 실행되는 함수 (한 판 진행 담당)
// play 함수 : 버튼 클릭 이벤트가 발생하면 실행됨
// event : 클릭 이벤트 정보(어떤 버튼이 눌렸는지 등)를 담고 있음
const play = (event) => {
  // 사용자가 클릭한 버튼의 글자를 가져옴(버튼에 '가위' / '바위' / '보' 라고 써있다.)
  // event.target: 실제로 클릭된 요소 (여기서는 button)
  // innerText : 그 버튼에 적힌 텍스트
  const user = event.target.innerText;

  // 0~2 사이의 랜덤 정수를 만들기 위해 Math.random()을 사용
  // Math.random() : 0 이상 1 미만의 실수(예: 0.1234)
  // * 3: 0이상 3미만으로 범위를 확장
  // Math.floor: 소수점 버리고 내림 => 0, 1, 2 중 하나가 됨
  const randomIndex = Math.floor(Math.random() * 3);

  // result 배열에서 랜덤 인덱스로 컴퓨터의 선택을 뽑음
  // 예: randomIndex=2면 result[2] => '보'
  const computer = result[randomIndex];

  // user와 computer가 정해졌으니, 승패 판단 함수 game을 호출

  game(user, computer);
};

// 6) 모든 버튼에 클릭 이벤트 달기 (이벤트 연결)

// buttons는 여러 개이므로 forEach로 하나씩 꺼내서 이벤트를 붙임
buttons.forEach((button) => {
  // 각 버튼이 클릭될 때마다 play 함수가 실행되도록 등록
  // 'click' 이벤트가 발생하면 play(event)가 자동 호출됨
  button.addEventListener('click', play);
});
