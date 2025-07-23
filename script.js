let startTime, interval;
let running = false;
let elapsed = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const h = String(date.getUTCHours()).padStart(2, '0');
  const m = String(date.getUTCMinutes()).padStart(2, '0');
  const s = String(date.getUTCSeconds()).padStart(2, '0');
  const msStr = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${h}:${m}:${s}.${msStr}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  display.textContent = formatTime(diff);
}

startBtn.onclick = () => {
  if (!running) {
    running = true;
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
  }
};

stopBtn.onclick = () => {
  if (running) {
    running = false;
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
  }
};

resetBtn.onclick = () => {
  running = false;
  clearInterval(interval);
  elapsed = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true;
};

lapBtn.onclick = () => {
  if (running) {
    const lapTime = formatTime(Date.now() - startTime + elapsed);
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
    laps.appendChild(li);
  }
};
