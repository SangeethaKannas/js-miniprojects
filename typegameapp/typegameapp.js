let time = 50;
let score =0;

let isPlaying;


const currentWord = document.querySelector('#current-word');
const wordInput = document.querySelector("#wordInput");
const timeDisplay = document.querySelector('#time');
const scoreDisplay = document.querySelector('#score');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
 'add',
 'salk', 
 'ass', 
 'ads',
 'lafgh',
 'gh',
 'lkg',
 'fgjh',
 'ask',
 'all',
];

// Initialize Game
function init() {

    // Load Word from Array
    showWord();

    //start matching on input
    wordInput.addEventListener('input', startMatch);

    //Start count down timer
    setInterval(countdownTime, 1000);

    //check status
    setInterval( checkStatus, 50);

}

//Pick and show a random word

function showWord() {
    //Choose a random array index
    const randomIndex = Math.floor(Math.random() * words.length);

    //output Inner html
    currentWord.innerHTML = words[randomIndex];

}

//Count downs the time
function countdownTime() {
    if( time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }

    //Show time
    timeDisplay.innerHTML = time;
}

function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!'
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

function startMatch() {
    
    if( matchWords() ) {
        wordInput.value = '';
        showWord();
        time = 51;
        score++;
        isPlaying = true;
        scoreDisplay.innerHTML = score < 0 ? '0' : score;
    }
}

function checkStatus() {
    if(!isPlaying && time === 0 ){
        message.innerHTML = 'Game Over!!!'
        score = -1
    }
}

document.addEventListener('DOMContentLoaded' , function() {
    init();
});
