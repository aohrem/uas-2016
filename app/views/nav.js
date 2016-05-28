var layerListOpen = false;

$(document).ready(function() {
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
});

function menuClick() {
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
    $('#map').fadeOut(function () {
        $('#page').fadeIn();
    });
    $('#menu').attr("src", "images/ic_keyboard_arrow_left_white_48dp.png");
    menuBackClick();
    $('#page-box').load('pages/' + item + '.html');
}

function openMap() {
    $('#page').fadeOut(function () {
        $('#map').fadeIn();
    });
    $('#menu').attr("src", "images/ic_menu_white_48dp.png");
    menuClick();
}