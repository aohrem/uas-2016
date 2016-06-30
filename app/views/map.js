mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhZ29uc2t5IiwiYSI6Inl1TGc5eVUifQ.sMGhI3VW_pQRIqGViDXbCw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/basic-v8',
    zoom: 14,
    center: [7.5728, 51.9450]
});

var layerList = document.getElementById('baselayers');
var inputs = layerList.getElementsByClassName('base-layer-input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    if (layerId.toString().indexOf('-input') > -1) {
        layerId = layerId.toString().replace('-input', '');
    }
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v8');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.on('load', function () {

    map.addSource("videoPoints", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "https://api.myjson.com/bins/2mytz",
        cluster: false,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addSource("circleVideo", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [51.94514694, 7.57292539]
                },
                "properties": {
                    "title": "Abhasha"
                }
            }]
        }
    });

    map.addLayer({
        "id": "videoPoints",
        "type": "symbol",
        "source": "videoPoints",
        "layout": {
            "icon-image": "marker-15"
        }
    });

    map.addLayer({
        'id': 'circleVideo',
        'type': 'circle',
        'source': 'circleVideo',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 5
            }
        }
    });


});
