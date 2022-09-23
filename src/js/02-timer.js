import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let currentTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {    
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return
        } 
        startBtn.disabled = false;
        // console.log(selectedDates[0]);
        currentTime = selectedDates[0];
        // console.log(currentTime);
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', () => {
    timer.start();
})

const timer = {
    start() {
        startBtn.disabled = true;
        setInterval(() => {
            const currentTimeInInterval = Date.now();
            const deltaTime = currentTime - currentTimeInInterval;
            const time = convertMs(deltaTime);
            updateTimer(time)
            // console.log(time)
        }, 1000);
    }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

}