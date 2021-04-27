'use strict';

var sound;
const progressBarAnimation = () => {
  console.log($('#progress').width());
  $('#progress').width();
  $('#progressBar').animate({ width: `${$('#progress').width()}px` }, { duration: sound.duration() * 1000, easing: 'linear' });
};

const Player = function (mix) {
  this.mix = mix[0].file; // deal with playlist object
};

Player.prototype = {
  play: function () {
    if (typeof sound === 'undefined') {
      sound = new Howl({
        src: [`https://www.electrokid.com/audio/${this.mix}.mp3`],
        html5: true,
        onplay: function () {
          const convertTime = () => {
            const seconds = Math.floor(sound.seek());
            const minutes = Math.floor(sound.seek() / 60);
            const hours = Math.floor(minutes / 60);

            return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds - minutes * 60 < 10 ? '0' : ''}${seconds < 60 ? seconds : seconds - minutes * 60}`;
          };

          setInterval(() => {
            $('#counter').text(`${convertTime()} / ${Math.floor(sound.duration() / 60)}:${sound.duration() / 1000 < 60 ? '0' : ''}${Math.floor(sound.duration() / 1000)}`);
          }, sound.duration() / 1000);

          progressBarAnimation();
        },
        onpause: function () {
          $('#progressBar').clearQueue();
          $('#progressBar').stop();
        },
        onend: function () {
          console.log('Finished!');
        },
      });

      sound.play();
    } else {
      sound.play();
    }
  },
  pause: function () {
    $('#progressBar').clearQueue();
    $('#progressBar').stop();
    sound.pause();
  },
  seek: function (x) {
    $('#progressBar').clearQueue();
    $('#progressBar').stop();
    x > 0 ? sound.seek(sound.seek() + x) : sound.seek(sound.seek() + x);
    const currentProgBarWidth = $('#progress').width();
    $('#progressBar').width(`${(currentProgBarWidth / sound.duration()) * sound.seek()}px`);
  },
};

const player = new Player([
  {
    title: 'Electrokid - The Robot Within',
    file: 'electrokid_robotwithin_256kbps',
    howl: null,
  },
  {
    title: 'Jed Black - Mixed live on Kboo Radio',
    file: 'JedBlack_KbooRadio_Live_320kbps',
    howl: null,
  },
]);

$('#play').on('click', () => {
  player.play();
});

$('#pause').on('click', () => {
  player.pause();
});

$('#seekBck').mousedown(() => {
  player.seek(-60);
  $('#seekBck').mouseup(() => {
    progressBarAnimation();
  });
});

$('#seekFwd').mousedown(() => {
  player.seek(60);
  $('#seekFwd').mouseup(() => {
    progressBarAnimation();
  });
});
