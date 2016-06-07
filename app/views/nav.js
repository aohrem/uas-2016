var layerListOpen = false;
var videoPreviewOpen = false;

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

    // TODO: remove this
    $('#layer-item-click-test').click(function () {
        if (videoPreviewOpen) {
            $('#video-preview').fadeOut();
            $('#layer-item-click-test').removeClass('active');
            $('#layer-list-check-test').attr('src', 'images/icons/ic_check_box_outline_grey_24dp.png');
            /*$('#layer-list-type-test').attr('src', 'images/icons/ic_movie_grey_48dp.png');
            $('#layer-list-video-preview-test').attr('src', 'images/layers/preview/video_layer_1_inactive.png');*/
            videoPreviewOpen = false;
        } else {
            $('#video-preview').fadeIn();
            $('#layer-item-click-test').addClass('active');
            $('#layer-list-check-test').attr('src', 'images/icons/ic_check_box_green_24dp.png');
            /*$('#layer-list-type-test').attr('src', 'images/icons/ic_movie_darkgrey_48dp.png');
            $('#layer-list-video-preview-test').attr('src', 'images/layers/preview/video_layer_1_active.png');*/
            videoPreviewOpen = true;
        }
    })
});

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
    $('#geo-search').fadeOut();
    $('#map').fadeOut(function () {
        $('#page').fadeIn();
    });
    $('#menu').attr('src', 'images/icons/ic_keyboard_arrow_left_white_48dp.png');
    menuBackClick();
    $('#page-box').load('pages/' + item + '.html');
}

function openMap() {
    $('#geo-search').fadeIn();
    $('#page').fadeOut(function () {
        $('#map').fadeIn();
    });
    $('#menu').attr('src', 'images/icons/ic_menu_white_48dp.png');
    menuClick();
}

function loadVideosFromFTP(){
    var videoArray =[];
    var url = 'https://api.myjson.com/bins/4v70e';

    $.getJSON( url,function(data) {
        videoArray.push(data);

        $.each(videoArray, function(index, video) {
            // In this point the
            $('#menu_list').append('');
        });
    });

}