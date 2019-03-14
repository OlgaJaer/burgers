var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'ISOsErt6oQQ',
    playerVars: {
      controls: 0,
      disablekb: 0,
      modestbrending: 1,
      rel: 0,
      autoplay: 0,
      showinfo: 0,
      iv_load_policy: 3
    },
    events: {
      'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady() {
  const duration = player.getDuration();
  let interval;

  clearInterval(interval);
  interval = setInterval(() => {
    const completed = player.getCurrentTime();
    const percent = (completed / duration) * 100;

    changeBtnPosition(percent);
  }, 1000);
}


$('.player__start').on('click', e => {
  //-1 – воспроизведение видео не началось
  // 0 – воспроизведение видео завершено
  // 1 – воспроизведение
  // 2 – пауза
  // 3 – буферизация
  // 5 – видео находится в очереди

  const playerStatus = player.getPlayerState();

  if (playerStatus === 1) {
    player.pauseVideo();
    $('.player__start').removeClass('paused')
  } else {
    player.playVideo();
    $('.player__start').addClass('paused')
  }
});

$('.player__playback').on('click', e => {
  const bar = $(e.currentTarget);
  const newBtnPosition = e.pageX - bar.offset().left;
  const clickedPercent = (newBtnPosition / bar.width()) * 100;
console.log(e);
  changeBtnPosition(clickedPercent);
  console.log(e)
});

function changeBtnPosition(percent) {
  $('.player__playback-btn').css({
    left: `${percent}%`
  });
}