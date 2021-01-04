const apiKey = `AIzaSyCzxySezBCaiSh2_G56GCerZR4FOMzPaZU`;
const lat = 10.314919;
const lng = 79.273392;
const zoom = 8;

const mapElement = document.getElementById(`map`); // a <div>


//TODO: Replace with open street map
const script = document.createElement(`script`);
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
script.async = true;
script.defer = true;
script.onload = function () {
    new google.maps.Map(mapElement, {
        center: { lat, lng },
        zoom
    });
};
mapElement.insertBefore(script, null);