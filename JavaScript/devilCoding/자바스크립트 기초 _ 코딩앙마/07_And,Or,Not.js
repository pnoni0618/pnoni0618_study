// OR
// 이름이 TOM 이거나, 성인이면 통과

const name = "TOM"
const age = 30

if(name === "TOM" || age > 19){
    console.log('통과');
} else{
    console.log('돌아가');
}

// AND
// 이름이 MIKE이고, 성인이면 통과

const name1 = "Mike";
const age1 = 30;

if(name1 === "Mike" && age1 >19){
    console.log('통과');
} else{
    console.log('돌아가')
}

// 우선순위
// 남자이고, 이름이 Mike 이거나 성인이면 통과

const gender = 'F';
const name3 = 'jane';
const isAdult = true;

if(gender === 'M' && (name3 === "Mike" || isAdult)){
    console.log('통과');
} else {
    console.log('돌아가')
}