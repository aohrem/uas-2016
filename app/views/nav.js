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

function showVideo(index) {
    if (videoPreviewOpen) {
        $('#video-preview').fadeOut();
        $('#video-controls').fadeOut();
        $('#layer-item-click-test'+lastIndex).removeClass('active');
        $('#layer-list-check-test'+lastIndex).attr('src', 'images/icons/ic_check_box_outline_grey_24dp.png');

        var videoUrl = String(videoArray[0][index].videourl);
        $('#video-preview').attr('src', videoUrl);
        $('#video-preview').fadeIn();
        $('#video-controls').fadeIn();
        $('#layer-item-click-test'+index).addClass('active');
        $('#layer-list-check-test'+index).attr('src', 'images/icons/ic_check_box_green_24dp.png');
        videoPreviewOpen = true;
    } else {
        var videoUrl = String(videoArray[0][index].videourl);
        $('#video-preview').attr('src', videoUrl);
        $('#video-preview').fadeIn();
        $('#video-controls').fadeIn();
        $('#layer-item-click-test'+index).addClass('active');
        $('#layer-list-check-test'+index).attr('src', 'images/icons/ic_check_box_green_24dp.png');
        videoPreviewOpen = true;
    }
    lastIndex = index;
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
    $('#menu').attr('src', 'images/icons/ic_menu_white_48dp.png');
    menuClick();
}

function loadVideosFromFTP(){

    var url = 'https://api.myjson.com/bins/29d02';

    $.getJSON( url,function(data) {
        videoArray.push(data.videos);

        $.each(videoArray[0], function(index, video) {
            // In this point the
            $('#video-list').append('<li id="layer-item-click-test'+index+'" onClick="showVideo('+index+')">' +
                '<img src="images/icons/ic_check_box_outline_grey_24dp.png" width="45" height="45" alt="Inactive"' +
                ' class="layer-list-image" id="layer-list-check-test'+index+'"/>' +
                '<img src="images/icons/ic_movie_grey_48dp.png" width="45" height="45" alt="Video Layer"' +
                ' class="layer-list-image" id="layer-list-type-test'+index+'"/>' + video.name.substring(0, 16) +
                '<img src="images/layers/preview/video_layer_1_inactive.png" width="45" height="45"' +
                ' alt="Video Layer Preview" class="video-layer-preview" id="layer-list-video-preview-test'+index+'"/>' +
                '<img src="images/icons/ic_play_arrow_white_48dp.png" width="45" height="45" alt="Video Preview"' +
                ' class="video-layer-preview"/>'+
                '</li>');

        });
    });

}