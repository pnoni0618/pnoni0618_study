const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // 폼이 제출될 때 새로고침 되는걸 막아주는 메소드

  if (input.value !== '') {
    const li = document.createElement('li');
    li.innerText = input.value;
    ul.appendChild(li);

    input.value = '';
  }
});
