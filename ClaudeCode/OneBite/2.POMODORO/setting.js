const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const timeInput = document.getElementById("timeInput");
const saveBtn = document.getElementById("saveBtn");

function getStoredMinutes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? Number(saved) : DEFAULT_MINUTES;
}

function updateSaveBtnState() {
  saveBtn.disabled = timeInput.value === "";
}

timeInput.value = getStoredMinutes();
updateSaveBtnState();

timeInput.addEventListener("input", updateSaveBtnState);

function saveTime() {
  if (timeInput.value === "") return;

  const minutes = Number(timeInput.value);

  if (minutes < MIN_MINUTES || minutes > MAX_MINUTES) {
    alert(`타이머 시간은 ${MIN_MINUTES}분 이상 ${MAX_MINUTES}분 이하로 설정해주세요.`);
    return;
  }

  localStorage.setItem(STORAGE_KEY, minutes);
  location.href = "index.html";
}
