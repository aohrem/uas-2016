const baseLayers = ['streets', 'satellite', 'light'];
var layerListOpen = false;
var videoPreviewOpen = false;
var videoArray =[];

$(document).ready(function() {
    var moreMenuOpen = false;

    loadVideosFromFTP();
    menuClick();

    $('html').click(function () {
        if (moreMenuOpen) {
            $('#more-menu').fadeOut(function () {
                moreMenuOpen = false;
            });
        }
    });

    $('#more').click(function () {
        if (!moreMenuOpen) {
            $('#more-menu').fadeIn(function () {
                moreMenuOpen = true;
            });
        }
    });

    $('#more-menu-links').click(function () {
        openPage('links');
    });

    $('#more-menu-info').click(function () {
        openPage('info');
    });

    $('#more-menu-help').click(function () {
        openPage('help');
    });

    $('#more-menu-contact').click(function () {
        openPage('contact');
    });
    
    var baseLayerCallback = function (event) {
        var baseLayer = event.currentTarget.id;
        if ($('#' + baseLayer + '-input').attr('src') != 'images/icons/ic_radio_button_checked_green_24dp.png') {
            $('#' + baseLayer + '-input').attr('src', 'images/icons/ic_radio_button_checked_green_24dp.png');
        }

        $.each(baseLayers, function (index, layer) {
            if (layer != baseLayer) {
                $('#' + layer + '-input').attr('src', 'images/icons/ic_radio_button_unchecked_grey_24dp.png');
            }
        });
    };

    $.each(baseLayers, function (index, baseLayer) {
        $('#' + baseLayer).click(baseLayerCallback);
    });
});

var lastIndex

/*function toggleVideo(index) {
    if (videoPreviewOpen) {
        $('#video-preview').fadeOut();
        $('#video-controls').fadeOut();
        $('#layer-item-click-test'+lastIndex).removeClass('active');
        $('#layer-list-check-test'+lastIndex).attr('src', 'images/icons/ic_radio_button_unchecked_grey_24dp.png');

        var videoUrl = String(videoArray[0][index].videourl);
        $('#video-preview').attr('src', videoUrl);
        $('#video-preview').fadeIn();
        $('#video-controls').fadeIn();
        $('#layer-item-click-test'+index).addClass('active');
        $('#layer-list-check-test'+index).attr('src', 'images/icons/ic_radio_button_checked_green_24dp.png');
        videoPreviewOpen = true;
    } else {
        var videoUrl = String(videoArray[0][index].videourl);
        $('#video-preview').attr('src', videoUrl);
        $('#video-preview').fadeIn();
        $('#video-controls').fadeIn();
        $('#layer-item-click-test'+index).addClass('active');
        $('#layer-list-check-test'+index).attr('src', 'images/icons/ic_radio_button_checked_green_24dp.png');
        videoPreviewOpen = true;
    }
    lastIndex = index;
}*/

var player;

function toggleVideo() {
     if (videoPreviewOpen) {
         $('#video-preview').fadeOut(function () {
             $('#video-preview').remove();
             $('#youtube-script').remove();
             $('#www-widgetapi-script').remove();
             $('#video-container').html('<div id="video-preview" class="shadow-medium"></div>');
         });
         //$('#video-controls').fadeOut();
         $('#layer-item-click-test').removeClass('active');
         $('#layer-list-check-test').attr('src', 'images/icons/ic_radio_button_unchecked_grey_24dp.png');
         $('#layer-list-type-test').attr('src', 'images/icons/ic_movie_grey_48dp.png');
         $('#layer-list-video-preview-test').attr('src', 'images/layers/preview/video_layer_1_inactive.png');
         window['YT'] = null;
         videoPreviewOpen = false;
     } else {
         /*var videoUrl = "videos/video.mp4";
         $('#video-preview').attr('src', videoUrl);*/

         var tag = document.createElement('script');
         tag.src = "https://www.youtube.com/iframe_api";
         tag.id = "youtube-script";
         var firstScriptTag = document.getElementsByTagName('script')[0];
         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

         //$('#video-controls').fadeIn();
         $('#layer-item-click-test').addClass('active');
         $('#layer-list-check-test').attr('src', 'images/icons/ic_radio_button_checked_green_24dp.png');
         $('#layer-list-type-test').attr('src', 'images/icons/ic_movie_darkgrey_48dp.png');
         $('#layer-list-video-preview-test').attr('src', 'images/layers/preview/video_layer_1_active.png');
     }
 }

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-preview', {
        height: '390',
        width: '640',
        videoId: 'KlTNR7jBi-I',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    videoPreviewOpen = true;
    $('#video-preview').fadeIn();
    event.target.playVideo();
}

function onPlayerStateChange(event) {

}

function menuClick() {
    layerListOpen = false;
    $('#menu').unbind();
    $('#menu').click(function () {
        if (layerListOpen) {
            $('#layer-list').fadeOut();
            layerListOpen = false;
        } else {
            $('#layer-list').fadeIn();
            layerListOpen = true;
        }
    });
}

function menuBackClick() {
    $('#menu').unbind();
    $('#menu').click(function () {
        openMap();
    });
}

function openPage(item) {
    if (layerListOpen) {
        $('#layer-list').fadeOut();
        if (videoPreviewOpen) {
            $('#video-preview').fadeOut();
        }
    }
    $('#geocoder-container').fadeOut();
    $('#map').fadeOut(function () {
        $('#page').fadeIn();
    });
    $('#menu').attr('src', 'images/icons/ic_keyboard_arrow_left_white_48dp.png');
    menuBackClick();
    $('#page-box').load('pages/' + item + '.html');
}

function openMap() {
    $('#geocoder-container').fadeIn();
    $('#page').fadeOut(function () {
        $('#map').fadeIn();
    });
    if (videoPreviewOpen) {
        $('#video-preview').fadeIn();
    }
    $('#menu').attr('src', 'images/icons/ic_menu_white_48dp.png');
    menuClick();
}

function loadVideosFromFTP(){

    $('#video-list').append('<li id="layer-item-click-test" onClick="toggleVideo()">' +
        '<img src="images/icons/ic_radio_button_unchecked_grey_24dp.png" width="45" height="45" alt="Inactive"' +
        ' class="layer-list-image" id="layer-list-check-test"/>' +
        '<img src="images/icons/ic_movie_grey_48dp.png" width="45" height="45" alt="Video Layer"' +
        ' class="layer-list-image" id="layer-list-type-test"/> Test Flight 360°' +
        '<img src="images/layers/preview/video_layer_1_inactive.png" width="45" height="45"' +
        ' alt="Video Layer Preview" class="video-layer-preview" id="layer-list-video-preview-test"/>' +
        '<img src="images/icons/ic_play_arrow_white_48dp.png" width="45" height="45" alt="Video Preview"' +
        ' class="video-layer-preview"/>'+
        '</li>');

    /*var url = 'https://api.myjson.com/bins/2jv68';

    $.getJSON( url,function(data) {
        videoArray.push(data.videos);

        $.each(videoArray[0], function(index, video) {
            // In this point the
            $('#video-list').append('<li id="layer-item-click-test'+index+'" onClick="toggleVideo('+index+')">' +
                '<img src="images/icons/ic_radio_button_unchecked_grey_24dp.png" width="45" height="45" alt="Inactive"' +
                ' class="layer-list-image" id="layer-list-check-test'+index+'"/>' +
                '<img src="images/icons/ic_movie_grey_48dp.png" width="45" height="45" alt="Video Layer"' +
                ' class="layer-list-image" id="layer-list-type-test'+index+'"/>' + video.name.substring(0, 16) +
                '<img src="images/layers/preview/video_layer_1_inactive.png" width="45" height="45"' +
                ' alt="Video Layer Preview" class="video-layer-preview" id="layer-list-video-preview-test'+index+'"/>' +
                '<img src="images/icons/ic_play_arrow_white_48dp.png" width="45" height="45" alt="Video Preview"' +
                ' class="video-layer-preview"/>'+
                '</li>');

        });
    });*/
}
var urlGjson = 'https://api.myjson.com/bins/53dp0';

/*$.getJSON( urlGjson,function(data) {
    var geojson = data
    var route = new mapboxgl.GeoJSONSource({data: geojson });
    map.addSource("route",route);

    map.addLayer({
        "id": "routePath",
        "type": "line",
        "source": "route",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#00BFFF",
            "line-width": 10
        }
    });

    map.addLayer({
        "id": "routePoints",
        "type": "symbol",
        "source": "route",
        "layout": {
            "icon-image": "marker-11",
            "text-field": "{name}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });

   map.on('click', function (e) {
        // Use queryRenderedFeatures to get features at a click event's point
        // Use layer option to avoid getting results from other layers
        var features = map.queryRenderedFeatures(e.point, { layers: ['routePoints'] });
        // if there are features within the given radius of the click event,
        // fly to the location of the click event
        if (features.length) {
            // Get coordinates from the symbol and center the map on those coordinates
            map.flyTo({center: features[0].properties.coordinates});
        }
    })

    //map.flyTo({center: });
});*/

console.log(map.sources);