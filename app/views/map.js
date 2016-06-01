
var map = L.map('map1').setView([51.94507172512329, 7.572884559631348], 13);

/*mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhZ29uc2t5IiwiYSI6Inl1TGc5eVUifQ.sMGhI3VW_pQRIqGViDXbCw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
    center: [7.572884559631348, 51.94507172512329], // starting position
    zoom: 16 // starting zoom
});*/

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'birhane.06gdmml4',
    accessToken: 'pk.eyJ1IjoiYmlyaGFuZSIsImEiOiJjaW9objJzazIwMDZldXVreGRjbnBzZ2pxIn0.5yKMPLe-kdTjZY_jzY-APw'
}).addTo(map);


 new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.OpenStreetMap()
}).addTo(map);



