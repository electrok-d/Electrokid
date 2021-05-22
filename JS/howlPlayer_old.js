'use strict';

let sound;
let playerName;
let playerMixIndex;
let mixIndex;
let mix;

const progressBarAnimation = () => {
  $('#progress').width();
  $('#progressBar').animate({ width: `${$('#progress').width()}px` }, { duration: sound.duration() * 1000, easing: 'linear' });
};

const playerId = (x) => {
  if (sound) {
    sound.stop();
    sound.unload();
  };
  
  playerMixIndex = `${$(x).attr('value')}`;
  playerName = `${$(x).attr('id')}`;
  mixIndex = player.mixList[playerMixIndex].mixIndex; // This requires hitting play. FAIL

  return [(player.playerName = playerName), (player.playerMixIndex = playerMixIndex), playerHtml(), loadButtonObjects()];
};

const playerHtml = () => {

  $(document).ready(function () {

  $(`#${playerName}`).html("<button id='robotwithinLoadBTN' class='btn btn-primary hidden' type='button' disabled>" + "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>" + 'Loading...' + '</button>');

  setTimeout(() => {
    return $(`#${playerName}`).html(
      "<div id='progress' class='progress' style='width: 100%'>" +
        "<div id='progressBar' style='width: 0px'" +
        "class='progress-bar progress-bar-striped progress-bar-animated ' role='progressbar'" +
        "aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'>" +
        '</div>' +
        '</div>' +
        "<div class='btn-group-sm' role='group' aria-label='Basic outlined example'>" +
        "<button id='seekBck' type='button' class='btn btn-outline-primary'>" +
        '<< </button>' +
        "<button id='play' type='button' class='btn btn-outline-primary' onclick='loadButtonObjects()'>Play</button>" +
        "<button id='pause' type='button' class='btn btn-outline-primary' >Pause</button>" +
        "<button id='seekFwd' type='button' class='btn btn-outline-primary' > >> </button>" +
        '</div>' +
        "<div id='counter'></div>"
    );
  }, 2000);

  });
};

const Player = function (mixList, playerName, playerMixIndex) {
  this.mixList = mixList;
  this.playerName = playerName;
};

Player.prototype = {
  play: function () {
    if (!sound || playerMixIndex !== mixIndex) {
      // This is a fautly way to do it
      mix = this.mixList[`${mixIndex}`][`${playerName}`];
      sound = new Howl({
        src: [`https://www.electrokid.com/audio/${mix}.mp3`],
        html5: true,
        pool: 5,
        autoplay: false,
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
        onstop: function () {},
        onend: function () {
          console.log('Finished!');
        },
      });

      sound.play();
    } else {
      if (sound.playing() !== true) sound.play();
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
  stop: function () {
    sound.stop();
  },
};

const player = new Player([
  {
    mixIndex: 0,
    title: 'Electrokid - The Robot Within',
    robotwithin: 'electrokid_robotwithin_256kbps',
    howl: null,
  },
  {
    mixIndex: 1,
    title: 'Jed Black - Disorderly Conduct Radio Show - April 6, 2016',
    disorderly: 'Jed Black_Disorderly Conduct Radio_6April2016',
    howl: null,
  },
  {
    mixIndex: 2,
    title: 'Jed Black - Mixed live on Kboo Radio',
    kboo: 'JedBlack_KbooRadio_Live_320kbps',
    howl: null,
  },
  {
    mixIndex: 3,
    title: 'Electrokid - Live At Whoadang - November 15, 2013',
    whoadang: 'Electrokid - Live at Whoadang - 15Nov2013',
    howl: null,
  },
]);

function loadButtonObjects() {
  $(document).ready(function () {
    $('#seekBck').mousedown(() => {
      player.seek(-30);
      $('#seekBck').mouseup(() => {
        progressBarAnimation();
      });
    });
  });

  $(document).ready(function () {
    $('#play').on('click', () => {
      if (!sound.playing()) {
        player.play();
      }
    });
  });

  $(document).ready(function () {
    $('#pause').on('click', () => {
      if (sound.playing()) {
        player.pause();
      }
    });
  });

  $(document).ready(function () {
    $('#seekFwd').mousedown(() => {
      player.seek(30);
      $('#seekFwd').mouseup(() => {
        progressBarAnimation();
      });
    });
  });
}
