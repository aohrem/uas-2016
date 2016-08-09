mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhZ29uc2t5IiwiYSI6Inl1TGc5eVUifQ.sMGhI3VW_pQRIqGViDXbCw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/basic-v8',
    zoom: 14,
    center: [7.5728, 51.9450],
    preserveDrawingBuffer: true
});

var geocoder = new mapboxgl.Geocoder({
    container: 'geocoder-container'
});


var j;
var tick_status;
var interval;
var layerList = document.getElementById('baselayers');
var inputs = layerList.getElementsByClassName('base-layer-input');

map.addControl(geocoder);
// After the map style has loaded on the page, add a source layer and default
// styling for a single point.
map.on('load', function () {
    map.addSource('single-point', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });

    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    });

    // Listen for the `geocoder.input` event that is triggered when a user
    // makes a selection and add a marker that matches the result.
    geocoder.on('result', function (ev) {
        map.getSource('single-point').setData(ev.result.geometry);
    });

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

    //Image Overlay Layers
    $('#orthographic').click(function () {
        map.setStyle('./styles/basic-v8_orthographic.json');
        addRoute();
    });

    $('#classification').click(function () {
        map.setStyle('./styles/basic-v8_classification.json');
        addRoute();
    });

    $('#ndvi').click(function () {
        map.setStyle('./styles/basic-v8_NDVIndex.json');
        addRoute();
    });

    $('#gli').click(function () {
        map.setStyle('./styles/basic-v8_GLI.json');
        addRoute();
    });

    $('#ndwi').click(function () {
        map.setStyle('./styles/basic-v8_NDWI.json');
        addRoute();
    });

});

var point = geojson_point.features;
//Make geojson linestring from points
var path_geojson = {type: 'LineString', coordinates: []};
for (i = 0; i < point.length; i++) {
    //  console.log(point[i]);
    path_geojson.coordinates.push(point[i].geometry.coordinates);
}

//initiate flight marker
var point_route = {
    "type": "Point",
    "coordinates": [0, 0]
};

var source = new mapboxgl.GeoJSONSource({
    data: point_route
});

function addRoute() {
    map.on('load', function () {
        // Listen for the `geocoder.input` event that is triggered when a user
        // makes a selection and add a marker that matches the result.
        geocoder.on('result', function (ev) {
            map.getSource('single-point').setData(ev.result.geometry);
        });
        // add linestring
        map.addSource("UAV_route", {
            "type": "geojson",
            "data": path_geojson
        });

        map.addLayer({
            "id": "route",
            "type": "line",
            "source": "UAV_route",
            "layout": {
                "visibility": 'none',
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#8BC34A",
                "line-width": 6
            }
        });

        map.addSource("markers", source);
        map.addLayer({
            "id": 'marker',
            "type": "circle",
            "source": "markers",
            'paint': {
                'circle-radius': {
                    stops: [
                        [0, 0],
                        [20, 50 * 8.22714500187]
                    ],
                    base: 2
                },
                'circle-opacity': 0.35,
                "circle-color": '#00BCD4'
            }
        });
        map.addLayer({
            "id": 'marker_poi',
            "type": "symbol",
            "source": "markers",
            "layout": {
                "visibility": 'none',
                "icon-image": "airport-15"
            }
        });
    });

    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, {layers: ['route'], radius: 10});
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, {layers: ['route'], radius: 10});

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var coordinates = map.unproject(e.point);
        var p = getPointIndexByCoordinates(coordinates);
        player.seekTo(point[p].properties.time + 37, true);
    });
}

function getPointIndexByCoordinates(coordinates) {
    var minDist = null;
    var minDistPoint = null;
    for (i = 0; i < point.length; i++) {
        var lon = point[i].geometry.coordinates[0];
        var lat = point[i].geometry.coordinates[1];
        var distance = calculateDistance(parseFloat(lat), parseFloat(lon), parseFloat(coordinates.lat),
            parseFloat(coordinates.lng));
        if (minDist == null || distance < minDist) {
            minDist = distance;
            minDistPoint = i;
        }
    }
    return minDistPoint;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
}

addRoute();

function tick() {
    clearInterval(interval);
    interval = setInterval(movemarker, 1001)
}

function movemarker() {
    if (j < geojson_point.features.length && (tick_status == true)) {
        var r = point[j].geometry.coordinates[2] * Math.tan(70 * Math.PI / 180);
        point_route.coordinates[0] = geojson_point.features[j].geometry.coordinates[0];
        point_route.coordinates[1] = geojson_point.features[j].geometry.coordinates[1];
        source.setData(point_route);
        radius_value = {
            stops: [
                [0, 0],
                [20, r * 8.22714500187]
            ],
            base: 2
        };
        map.setPaintProperty('marker', 'circle-radius', radius_value);
        j++;
    }
    else {
        clearInterval(interval);
    }
}