'use strict';
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
// canvas.width = 1904;
// canvas.height = 776;

canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: '././img/background.png',
});

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
});
// player.draw();

const player2 = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0,
  },
});
// player2.draw();
// console.log(player);

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}
function determineWinner({ player, player2, timerId }) {
  clearTimeout(timerId);
  document.querySelector('#tie-displayText').style.display = 'flex';
  if (player.health === player2.health) {
    document.querySelector('#tie-displayText').innerHTML = 'Tie';
  } else if (player.health > player2.health) {
    document.querySelector('#tie-displayText').innerHTML = 'Player 1 Wins';
  } else if (player.health < player2.health) {
    document.querySelector('#tie-displayText').innerHTML = 'Player 2 Wins';
  }
}

/// Timer Decreasing
let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector('#timer').innerHTML = timer;
  }
  /// Tie match indicator

  if (timer === 0) {
    determineWinner({ player, player2, timerId });
  }
}
decreaseTimer();
/// Animation for my players
function animate() {
  window.requestAnimationFrame(animate);
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  player2.update();
  player.velocity.x = 0;
  player2.velocity.x = 0;
  /// player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }
  /// player2 Movement
  if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
    player2.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
    player2.velocity.x = 5;
  }
  /// Detect for Collision onto player 2
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: player2,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    player2.health -= 20;
    document.querySelector('#player2Health').style.width = player2.health + '%';
    console.log('player_Collision');
  }
  /// Detect for Collision onto player 1
  if (
    rectangularCollision({
      rectangle1: player2,
      rectangle2: player,
    }) &&
    player2.isAttacking
  ) {
    player2.isAttacking = false;
    player.health -= 20;
    document.querySelector('#player1Health').style.width = player.health + '%';
    console.log('player2_Collision');
  }
  /// End Game based on Health
  if (player2.health <= 0 || player.health <= 0) {
    determineWinner({ player, player2, timerId });
  }
}
animate();

window.addEventListener('keydown', event => {
  // console.log(event.key);
  switch (event.key) {
    ///Player 1 key stroke movement
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case ' ':
      player.attack();
      break;
    ///Player 2 key stroke movement
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      player2.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      player2.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      player2.velocity.y = -20;
      break;
    case 'ArrowDown':
      player2.attack();
      break;
  }
  // console.log(event.key);
});
///Player 1 key stroke movement - Player 1 keyUp
window.addEventListener('keyup', event => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
  }

  ///Player 2 key stroke movement - Player 2 keyUp
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
  // console.log(event.key);
});
