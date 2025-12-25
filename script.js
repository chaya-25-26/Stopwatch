let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(time) {
    // Calculate hours, minutes, seconds, milliseconds
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10); // Convert to centiseconds (2 digits)

    // Pad with leading zeros
    let h = hours.toString().padStart(2, '0');
    let m = minutes.toString().padStart(2, '0');
    let s = seconds.toString().padStart(2, '0');
    let ms = milliseconds.toString().padStart(2, '0');

    return `${h}:${m}:${s}.${ms}`;
}

function updateDisplay() {
    const now = Date.now();
    const time = elapsedTime + (now - startTime);
    display.textContent = formatTime(time);
}

function start() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00.00";
}

// Event Listeners
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

// Initialize display
display.textContent = "00:00:00.00";
