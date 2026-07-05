// 1 부터 10까지 로그

for(let i = 1; i <= 10; i++){
    console.log(i)
}

// while

let a = 0;

while(a < 10){
    console.log(a);
    a++;
}

// do.. while

let b = 0;

do{
    console.log(b);
    b++;
}while(b <= 10)


// break

// while(true){
//     let answer = confirm('계속할까요?');
//     if(!answer){
//         break;
//     }
// }

// while(true)는 무한반복되는 코드라서 주의해서 사용!!

// continue
// 짝수만

for(let i = 0; i <= 10; i++){
    if(i % 2){
        continue;
    }
    console.log(i);
}