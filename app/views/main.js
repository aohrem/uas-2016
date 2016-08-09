const baseLayers = ['basic', 'streets', 'satellite', 'light', 'orthographic', 'classification', 'ndvi', 'gli', 'ndwi'];
var layerListOpen = false;
var videoPreviewOpen = false;

$(document).ready(function () {
    var moreMenuOpen = false;

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

    $.each(baseLayers, function (index, baseLayer) {
        $('#' + baseLayer).click(baseLayerCallback);
    });
});

var player;

function toggleVideo() {
    if (videoPreviewOpen) {
        j = 0;
        tick_status = false;
        var visibility = map.getLayoutProperty('route', 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty('route', 'visibility', 'none');
        }
        var visibility_point = map.getLayoutProperty('marker_poi', 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty('marker_poi', 'visibility', 'none');
            map.setLayoutProperty('marker_poi', 'visibility', 'none');
        }
        var visibility_marker = map.getLayoutProperty('marker', 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty('marker', 'visibility', 'none');
            map.setLayoutProperty('marker', 'visibility', 'none');
        }
        $('#video-preview').fadeOut(function () {
            $('#video-preview').remove();
            $('#youtube-script').remove();
            $('#www-widgetapi-script').remove();
            $('#video-container').html('<div id="video-preview" class="shadow-medium"></div>');
        });
        $('#layer-item-click-test').removeClass('active');
        $('#layer-list-check-test').attr('src', 'images/icons/ic_radio_button_unchecked_grey_24dp.png');
        $('#layer-list-type-test').attr('src', 'images/icons/ic_movie_grey_48dp.png');
        $('#layer-list-video-preview-test').attr('src', 'images/layers/preview/video_layer_1_inactive.png');
        window['YT'] = null;
        videoPreviewOpen = false;
    }
    else {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.id = "youtube-script";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        $('#layer-item-click-test').addClass('active');
        $('#layer-list-check-test').attr('src', 'images/icons/ic_radio_button_checked_green_24dp.png');
        $('#layer-list-type-test').attr('src', 'images/icons/ic_movie_darkgrey_48dp.png');
        $('#layer-list-video-preview-test').attr('src', 'images/layers/preview/video_layer_1_active.png');
        videoPreviewOpen = true;
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
    event.target.mute();
}

function onPlayerStateChange(event) {
    if (event.data == -1) {
        // unstarted
    } else if (event.data == 0) {
        // ended

    } else if (event.data == 1) {
        // playing
        var visibility = map.getLayoutProperty('route', 'visibility');
        if (visibility === 'none') {
            map.setLayoutProperty('route', 'visibility', 'visible');
        }
        var visibility_marker = map.getLayoutProperty('marker_poi', 'visibility');
        if (visibility_marker === 'none') {
            map.setLayoutProperty('marker_poi', 'visibility', 'visible');
            map.setLayoutProperty('marker', 'visibility', 'visible');
        }
        tick_status=true;
        j=Math.round(player.getCurrentTime());
        tick();

    } else if (event.data == 2) {
        // paused
        tick_status=false;

    } else if (event.data == 3) {
        // buffering
    } else if (playerStatus == 5) {
        // video cued
    }
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
    }
    if (videoPreviewOpen) {
        $('#video-preview').fadeOut();
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