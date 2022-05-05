// const $geolocateButton = document.getElementById('geolocation-button');

// $geolocateButton.addEventListener('click', geolocate);


// function geolocate() {
//     if (window.navigator && window.navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
//     }
// }

// function onGeolocateSuccess(coordinates) {
//     const { latitude, longitude } = coordinates.coords;
//     console.log('Found coordinates: ', latitude, longitude);
// }

// function onGeolocateError(error) {
//     console.warn(error.code, error.message);
//     if (error.code === 1) {
//         // they said no 
//     } else if (error.code === 2) {
//         // position unavailable
//     } else if (error.code === 3) {    // timeout 
//     }
// }
'use strict';

(() => {
    let latitude = 0;
    let longitude = 0;
    document.addEventListener("DOMContentLoaded", function () {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert("Your browser is out of fashion. There is no geo location!")
        }

        function success(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude
            console.log(`Your latitude is ${latitude} and your longitude is ${longitude}`)
            return (latitude, longitude);
        }

        function error() {
            alert("Can't detect your location. Try again later.")
        }

        handleEvents();
    });

    const handleEvents = () => {
        document.getElementById("takeLoanBtn").addEventListener("click", handleTakeLoanBtn);

    }

    const handleTakeLoanBtn = () => {
        const loanAmtValue = document.getElementById("loanAmtInput").value;
        if(!loanAmtValue || loanAmtValue.length == 0) {
            alert("Please provide a loan amount value");
            
        } else {
            const INTEREST = 10;
        const amount = parseInt(loanAmtValue) + (loanAmtValue * 10 / 100);
        document.querySelector('.principal').innerText = loanAmtValue;
        document.querySelector('.interest').innerText = INTEREST + "%";
        document.querySelector('.amount').innerText = amount;
        }
        
        
    }


})()
