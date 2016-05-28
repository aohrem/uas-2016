
var mymap = L.map('map1').setView([51.94507172512329, 7.572884559631348], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'birhane.06gdmml4',
    accessToken: 'pk.eyJ1IjoiYmlyaGFuZSIsImEiOiJjaW9objJzazIwMDZldXVreGRjbnBzZ2pxIn0.5yKMPLe-kdTjZY_jzY-APw'
}).addTo(mymap);

var control = L.control.geonames({
    username: 'birhaneguesh2015@gmail.com',  // Geonames account username.  Must be provided
    zoomLevel: 6,  // Max zoom level to zoom to for location.  If null, will use the map's max zoom level.
    maxresults: 5,  // Maximum number of results to display per search
    className: 'fa fa-crosshairs',  // class for icon
    workingClass: 'fa-spin',  // class for search underway
    featureClasses: ['A', 'H', 'L', 'P', 'R', 'T', 'U', 'V'],  // feature classes to search against.  See: http://www.geonames.org/export/codes.html
    baseQuery: 'isNameRequired=true',  // The core query sent to GeoNames, later combined with other parameters above
    position: 'topleft',
    markNames: true // show a marker at the location of each geoname found, with an associated popup which shows the name
});
mymap.addControl(control);

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhZ29uc2t5IiwiYSI6Inl1TGc5eVUifQ.sMGhI3VW_pQRIqGViDXbCw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
    center: [7.572884559631348, 51.94507172512329], // starting position
    zoom: 16 // starting zoom
});



