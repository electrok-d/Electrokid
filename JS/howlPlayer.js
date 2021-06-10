'use strict';

let sound;
let playerName;
let playerMixIndex;
let mixIndex;
let mix;
let progBarWidth = $('#progress').width();

const progBarJump = () => {
  $('#progressBar').width(`${(progBarWidth / sound.duration()) * sound.seek()}px`);
};

const progressBarAnimation = () => {
  setInterval(() => {
    updateWidth(); 
  },sound.duration() - sound.seek() * 1000);
  
  function updateWidth() {
    progBarWidth = $('#progress').width();
    $('#progressBar').width(`${(progBarWidth / sound.duration()) * sound.seek()}px`);
  }
  
};

const playerId = (x) => {
  if (sound) {
    sound.stop();
    sound.unload(); 
  }

  playerMixIndex = `${$(x).attr('value')}`;
  playerName = `${$(x).attr('id')}`;
  mixIndex = player.mixList[playerMixIndex].mixIndex;
  player.playerName = playerName;
  player.playerMixIndex = playerMixIndex;

  mix = player.mixList[`${mixIndex}`][`${playerName}`];

  sound = new Howl({
    src: [`https://www.electrokid.com/audio/${mix}.mp3`],
    html5: true,
    pool: 5,
    onplay: function () {
      $(document).ready(function () {
        const convertTime = () => {
          const seconds = Math.floor(sound.seek());
          const minutes = Math.floor(sound.seek() / 60);
          const minutesMod = minutes % 60;
          const hours = Math.floor(minutes / 60);

          if (minutes > 59) {
            return `${hours < 10 ? '0' : ''}${hours}:${`0${minutesMod}`}:${seconds - minutes * 60 < 10 ? '0' : ''}${seconds < 60 ? seconds : seconds - minutes * 60}`;
          } else {
            return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds - minutes * 60 < 10 ? '0' : ''}${seconds < 60 ? seconds : seconds - minutes * 60}`;
          }
        };

        const convertDuration = () => {
          const seconds = Math.floor(sound.duration());
          const minutes = Math.floor(sound.duration() / 60);
          const minutesMod = minutes % 60;
          const hours = Math.floor(minutes / 60);

          if (minutes > 59) {
            return `${hours < 10 ? '0' : ''}${hours}:${`0${minutesMod}`}:${seconds - minutes * 60 < 10 ? '0' : ''}${seconds < 60 ? seconds : seconds - minutes * 60}`;
          } else {
            return `${hours < 10 ? '0' : ''}${hours}:${`${minutes}`}:${seconds - minutes * 60 < 10 ? '0' : ''}${seconds < 60 ? seconds : seconds - minutes * 60}`;
          }
        };

        setInterval(() => {
          $('#counter').text(`${convertTime()} / ${convertDuration()}`);
        }, sound.duration() / 1000);
        progressBarAnimation();
      });
    },
    onpause: function () {
    },
    onseek: function () {
      progBarJump();
    },
    onend: function () {
      console.log('Thanks for listening!');
    },
  });

  $(document).ready(function () {
  playerHtml();
  });

  $(document).ready(function () {
  loadButtonObjects();
  });


  $(document).ready(function () {
    $('#counter').text(`00:00:00 / ${player.mixList[`${mixIndex}`].mixLength}`);
  });
};

const playerHtml = () => {
  $(document).ready(function () {
    return $(`#${playerName}`).html(
      "<div id='progress' class='progress' style='width: 100%' >" +
        "<div id='progressBar' style='width: 0px'" +
        "class='progress-bar progress-bar-striped progress-bar-animated ' role='progressbar'" +
        "aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'>" +
        '</div>' +
        '</div>' +
        "<div class='btn-group-sm' role='group' aria-label='Basic outlined example'>" +
        "<button id='seekBck' type='button' class='btn btn-outline-primary'>" +
        '<< </button>' +
        "<button id='play' type='button' class='btn btn-outline-primary' >Play</button>" +
        "<button id='pause' type='button' class='btn btn-outline-primary' >Pause</button>" +
        "<button id='seekFwd' type='button' class='btn btn-outline-primary' > >> </button>" +
        '</div>' +
        "<div id='counter'></div>"
    );
  });
};

const Player = function (mixList, playerName) {
  this.mixList = mixList;
  this.playerName = playerName;
};

Player.prototype = {
  play: function () {
    sound.play();
  },
  pause: function () {
    sound.pause();
  },
  seek: function (x) {
    x > 0 ? sound.seek(sound.seek() + x) : sound.seek(sound.seek() + x);
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
    mixLength: '01:02:00',
    howl: null,
  },
  {
    mixIndex: 1,
    title: 'Jed Black - Disorderly Conduct Radio Show - April 6, 2016',
    disorderly: 'Jed Black_Disorderly Conduct Radio_6April2016',
    mixLength: '00:59:29',
    howl: null,
  },
  {
    mixIndex: 2,
    title: 'Jed Black - Mixed live on Kboo Radio',
    kboo: 'JedBlack_KbooRadio_Live_320kbps',
    mixLength: '00:57.54',
    howl: null,
  },
  {
    mixIndex: 3,
    title: 'Electrokid - Live At Whoadang - November 15, 2013',
    whoadang: 'Electrokid - Live at Whoadang - 15Nov2013',
    mixLength: '01:00:41',
    howl: null,
  },
]);

function loadButtonObjects() {
  $(document).ready(function () {
    $('#seekBck').mousedown(() => {
      player.seek(-30);
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
    });
  });

  $(document).ready(function () {
    $('#progress').mousedown(function (event) {
      progBarWidth = $('#progress').width();
      const relX = event.pageX - $(this).offset().left;
      const seekNum = `${sound.duration()}` / `${progBarWidth}`;
      sound.seek(relX * seekNum);
      progBarJump();
    });
  });
}
