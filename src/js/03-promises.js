// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount.Під час кожного виклику 
// передай їй номер промісу(position), що створюється,  і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. 
// Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. Використовуй початковий код 
// функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', handlerStart);

function handlerStart(e) {
  e.preventDefault();

  let delayUser = Number(formEl.delay.value);
  // console.log(`delayUser1`, delayUser);
  for (let i = 1; i <= formEl.amount.value; i += 1) {
  createPromise(i, delayUser)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
      delayUser += Number(formEl.step.value);
  // console.log(typeof delayUser);
  }
}

function createPromise(position, delay) {
  const objPromise = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    setTimeout(() => {
  if (shouldResolve) {
    // Fulfill
    res(objPromise);
  } else {
    // Reject
    rej(objPromise);
  } 
}, delay)
  }
)}
