const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;

function getStoredMinutes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? Number(saved) : DEFAULT_MINUTES;
}

let remainingSeconds = getStoredMinutes() * 60;
let timerId = null;

const timeDisplay = document.getElementById("timeDisplay");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }
    remainingSeconds--;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getStoredMinutes() * 60;
  updateDisplay();
}

updateDisplay();
