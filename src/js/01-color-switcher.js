const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onClickBtnStart);
stopBtn.addEventListener('click', onClickBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickBtnStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function onClickBtnStop() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
};
