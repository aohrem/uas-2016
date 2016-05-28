$(document).ready(function() {
    var layerListOpen = false;
    var moreMenuOpen = false;

    $('#menu').click(function () {
        if (layerListOpen) {
            $('#layer-list').fadeOut();
            layerListOpen = false;
        } else {
            $('#layer-list').fadeIn();
            layerListOpen = true;
        }
    });

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

    $('#more-menu').click(function (event) {
        event.stopPropagation();
    })
});