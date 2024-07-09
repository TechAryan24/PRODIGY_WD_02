const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");
const lapContainer = document.querySelector("#lapContainer");
const laps = document.querySelector("#laps");
const clearLapsBtn = document.querySelector("#clearLapsBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalID;
let hrs = 0;
let mins = 0;
let secs = 0;
let mili = 0;

// Initialize lap container to be hidden
lapContainer.style.display = 'none';
clearLapsBtn.style.display = 'none';

// Start Button Function
startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalID = setInterval(updateTime, 10);
    }
});

// Pause button Function
pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalID);
    }
});

// Reset Button Function
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalID);

    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;

    hrs = 0;
    mins = 0;
    secs = 0;
    mili = 0;

    timeDisplay.textContent = "00:00:00:00";
    laps.innerHTML = '';
    lapContainer.classList.remove('active');
    lapContainer.style.display = 'none';
    clearLapsBtn.style.display = 'none';
});

lapBtn.addEventListener("click", () => {
    if (!paused) {
        recordLapTime();
    }
    lapContainer.style.display = 'block';
    clearLapsBtn.style.display = 'block';
});

clearLapsBtn.addEventListener("click", () => {
    laps.innerHTML = '';
    lapContainer.classList.remove('active');
    lapContainer.style.display = 'none';
    clearLapsBtn.style.display = 'none';
});

function updateTime() {
    elapsedTime = Date.now() - startTime;

    mili = Math.floor((elapsedTime % 1000) / 10);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    mili = pad(mili, 2);
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${mili}`;
}

function pad(unit, length = 2) {
    return unit.toString().padStart(length, "0");
}

function recordLapTime() {
    const laptime = `${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(mili, 2)}`;
    const lapElement = document.createElement("div");
    lapElement.textContent = laptime;
    lapElement.className = "lap";
    laps.appendChild(lapElement);
    lapContainer.classList.add('active');
}
