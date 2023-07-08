// 1. Встановити бібліотекі
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// 2.Ініціалізація змінних
const refs = {
    btn: document.querySelector('[data-start'),
    day: document.querySelector('[data-days]'),
    hour: document.querySelector('[data-hours]'),
    min: document.querySelector('[data-minutes]'),
    sec: document.querySelector('[data-seconds]'),
} 

let timerId = null; 

refs.btn.disabled = true;

// 3.Функція встановлення дати
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future'); 
    } else {      
      refs.btn.disabled = false;
      Notiflix.Notify.success('Ok, please click Start',
      {
         timeout: 1000,
      },
    )}
    // console.log(selectedDates[0]);
  },
};
 
const flPickr = flatpickr("#datetime-picker", options);

refs.btn.addEventListener('click', onStartClick);

function onStartClick() {
  // console.log(`click on button`);
  // const selectedDate = flPickr.selectedDates[0];
  const selectedDate = flPickr.selectedDates[0].getTime();
  // console.log(`selectedDate`, selectedDate);

  timerId = setInterval(() => {
    // const currentDate = new Date();
    const currentDate = Date.now();
    // console.log(`currentDate`, currentDate);
    const timeTimer = selectedDate - currentDate;
    // console.log(selectedDate - currentDate);
    // console.log(`timeTimer`, timeTimer);
    refs.btn.disabled = true;

    const { days, hours, minutes, seconds } = convertMs(timeTimer);

    refs.day.textContent = addLeadingZero(days);
    refs.hour.textContent = addLeadingZero(hours);
    refs.min.textContent = addLeadingZero(minutes);
    refs.sec.textContent = addLeadingZero(seconds);

    if (timeTimer < 1000) {
      clearInterval(timerId);
      refs.btn.disabled = false;
    return
    }
  }, 1000)
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
} 
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}