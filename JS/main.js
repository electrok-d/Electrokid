
'use strict';


const classArray = ['#robotwithin', '#disorderly', '#kboo', '#whoadang'];

const viewPlayer = (id) => {
  if ($(`${id}`).hasClass('hidden')) {
    $(`${id}`).removeClass('hidden').addClass('visible');
    $(`${id}BTN`).hide();
  }
};

$('#robotwithinBTN').on('click', (x) => {
  const robotIds = '#disorderly, #kboo, #whoadang';
  const robotBtnIds = '#disorderlyBTN, #kbooBTN, #whoadangBTN';
  const robotext = 'robotwithin';

  viewPlayer(classArray[0]);

  if ($(`${robotIds}`).hasClass('visible') === true) {
    $(`${robotIds}`).removeClass('visible').addClass('hidden');
    $(`${robotIds} div`).empty();
    $(`${robotBtnIds}`).show();
    player.pause();
  }
});

$('#disorderlyBTN').on('click', (x) => {
  const disorderlyIds = '#robotwithin, #kboo, #whoadang';
  const disorderlyBtnIds = '#robotwithinBTN, #kbooBTN, #whoadangBTN';
  const disorderlytext = 'disorderly';

  viewPlayer(classArray[1]);

  if ($(`${disorderlyIds}`).hasClass('visible') === true) {
    $(`${disorderlyIds}`).removeClass('visible').addClass('hidden');
    $(`${disorderlyIds} div`).empty();
    $(`${disorderlyBtnIds}`).show();
    player.pause();
  }
});

$('#kbooBTN').on('click', (x) => {
  const kbooIds = '#robotwithin, #disorderly, #whoadang';
  const kbooBtnIds = '#robotwithinBTN, #disorderlyBTN, #whoadangBTN';
  const kbootext = 'kboo';

  viewPlayer(classArray[2]);

  if ($(`${kbooIds}`).hasClass('visible') === true) {
    $(`${kbooIds}`).removeClass('visible').addClass('hidden');
    $(`${kbooIds} div`).empty();
    $(`${kbooBtnIds}`).show();
    player.pause();
  }
});

$('#whoadangBTN').on('click', (x) => {
  const whoadangIds = '#robotwithin, #disorderly, #kboo';
  const whoadangBtnIds = '#robotwithinBTN, #disorderlyBTN, #kbooBTN';
  const whoadangtext = 'whoadang';

  viewPlayer(classArray[3]);

  if ($(`${whoadangIds}`).hasClass('visible') === true) {
    $(`${whoadangIds}`).removeClass('visible').addClass('hidden');
    $(`${whoadangIds} div`).empty();
    $(`${whoadangBtnIds}`).show();
    player.pause();
  }
});

function hideDecks(clickResult) {
  const linkResult = clickResult;

  // alert(linkResult);
  if (document.querySelector('#mixDecks').classList[1] === 'hidden' && linkResult === 0) {
    document.querySelector('#mixDecks').classList.remove('hidden');
    document.querySelector('#socialDecks').classList.add('hidden');
    document.querySelector('#contactDecks').classList.add('hidden');
  } else if (document.querySelector('#socialDecks').classList[1] === 'hidden' && linkResult === 1) {
    document.querySelector('#socialDecks').classList.remove('hidden');
    document.querySelector('#mixDecks').classList.add('hidden');
    document.querySelector('#contactDecks').classList.add('hidden');
  } else if (document.querySelector('#contactDecks').classList[1] === 'hidden' && linkResult === 2) {
    document.querySelector('#contactDecks').classList.remove('hidden');
    document.querySelector('#mixDecks').classList.add('hidden');
    document.querySelector('#socialDecks').classList.add('hidden');
  }
}
