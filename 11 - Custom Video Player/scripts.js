/*ELEMENTS*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*FUNCTIONS*/
function togglePlay(){
    video[video.paused ? 'play' : 'pause']();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRageUpdate(){
    video[this.name] = this.value;
}

function hangleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;      
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/*EVENT LISTENERS*/

/* Video */
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',hangleProgress);

/* Toggle (Play/Pause) */
toggle.addEventListener('click',togglePlay);

/* Skyp Buttons */
skipButtons.forEach(skipButton =>{
    skipButton.addEventListener('click',skip);
});

/* Ranges */
ranges.forEach(range => {
    range.addEventListener('change',handleRageUpdate);
    range.addEventListener('mousemove',handleRageUpdate);
});

/* Progress Bar */
let mouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',()=>{ if(mouseDown) scrub()});
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup',() => mouseDown = false);



