/**
 * Companion Javascript file for Keyboard 
 * 
 * 
 */

 window.addEventListener("load", () => {
    const sounds = document.querySelectorAll(".sound");

    function padClickHandler(index) {
        sounds[index].play();
    }

    const pads = document.querySelectorAll(".pads div");

    pads.forEach( ( pad, index ) => pad.addEventListener('click', padClickHandler));

 });