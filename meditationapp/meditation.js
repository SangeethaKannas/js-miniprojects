const meditationApp = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");

    const outline = document.querySelector(".moving-outline circle");
    const outlineLength = outline.getTotalLength();

    const video = document.querySelector(".video-container video");   

    const timeDisplay = document.querySelector(".time-display");

    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Attach Events
    play.addEventListener('click', () => checkPlaying(song));

    function checkPlaying( song) {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './resources/svg/pause.svg'
        } else {
            song.pause();
            video.pause();
            play.src = './resources/svg/play.svg'
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        
        let progress = outlineLength - ( currentTime / fakeDuration ) * outlineLength;
        outline.style.strokeDashoffset = progress; 

        //mm:ss
        let elapsed  = fakeDuration - currentTime;
        timeDisplay.textContent = `${Math.floor(elapsed / 60)}:${Math.floor(elapsed % 10)}`

        if (currentTime >= fakeDuration ) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }

    };

    //Adding event handlers for time selectors
    const timeSelectors = document.querySelectorAll(".time-select button");

    function timeSelectorClickHandler(target){        
        fakeDuration = target.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    }

    timeSelectors.forEach(option => {
        option.addEventListener('click', timeSelectorClickHandler.bind(this, option) )
    });

    //Adding event handlers for sound selectors
    const sounds = document.querySelectorAll(".sound-picker button");

    function soundsClickHandler(sound) {
        
        song.src = sound.getAttribute('data-sound')
        video.src = sound.getAttribute('data-video')

        checkPlaying(song);
    }

    sounds.forEach(option => {
        option.addEventListener('click', soundsClickHandler.bind(this, option));
    });
}

meditationApp();