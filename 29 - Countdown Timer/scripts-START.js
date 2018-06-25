/* CONST AND VARIABLES */
let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('[data-time]');

/* FUNCTIONS */
function startTimer(){
    const seconds = parseInt(this.dataset.time) ; 
    timer(seconds);
}

function timer(seconds){
    const now = Date.now();
    const then = now + (seconds * 1000);
    clearInterval(countDown);
    displayTimeLeft(seconds);
    displaEndTime(then);
    countDown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft <= 0){
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const display = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displaEndTime(timeStamp){
    const end = new Date(timeStamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

/* EVENTS */
timerButtons.forEach(timerButton =>{
    timerButton.addEventListener('click',startTimer);
});

document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    minutes = this.minutes.value;
    seconds = minutes * 60;
    timer(seconds);
    this.reset();
});