// const hour = document.querySelector('.hour');
// const min = document.querySelector('.min');
// const sec = document.querySelector('.sec');

// function clock() {
//   const now = new Date();

//   hour.innerText = now.getHours();
//   min.innerText = now.getMinutes();
//   sec.innerText = now.getSeconds();
// }

const times = document.querySelectorAll('.time');

function format(num) {
  return String(num).padStart(2, '0');
}

function clock() {
  const now = new Date();

  times.forEach((el) => {
    if (el.classList.contains('hour')) {
      el.innerText = format(now.getHours());
    }
    if (el.classList.contains('min')) {
      el.innerText = format(now.getMinutes());
    }
    if (el.classList.contains('sec')) {
      el.innerText = format(now.getSeconds());
    }
  });
}

clock();
setInterval(clock, 1000);
