$(document).ready(function() {
    var menuOpen = false;
    $('#menu').click(function () {
        if (menuOpen) {
            $('#layer-list').fadeOut();
            menuOpen = false;
        } else {
            $('#layer-list').fadeIn();
            menuOpen = true;
        }
    });
});