var mediaPlayer;

$(document).ready(function() {
    initMediaPlayer();
    
    $('#play-pause-button').click(function () {
        togglePlayPause();
    });
});

function initMediaPlayer() {
    mediaPlayer = document.getElementById('video-preview');
    mediaPlayer.controls = false;
    mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);

}

function togglePlayPause() {
    var btn = document.getElementById('play-pause-button');
    if (mediaPlayer.paused || mediaPlayer.ended) {
        btn.style.backgroundImage = 'none';
        btn.className = 'pause';
        mediaPlayer.play();
    }
    else {
        btn.style.background = "url('images/icons/ic_play_arrow_white_128dp.png') no-repeat center";
        btn.className = 'play';
        mediaPlayer.pause();
    }
}

function updateProgressBar() {
    var progressBar = document.getElementById('progress-bar');
    var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime).valueOf();
    progressBar.value = percentage;
    progressBar.innerHTML = percentage + '% played';
}
function onPlayerStateChange(event) {
    if (event.data == -1) {
        // unstarted
    } else if (event.data == 0) {
        // ended
    } else if (event.data == 1) {
        // playing
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