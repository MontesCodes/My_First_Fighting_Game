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
  imageSrc: './img/background.png',
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6,
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
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.75,
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

decreaseTimer();
/// Animation for my players
function animate() {
  window.requestAnimationFrame(animate);
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
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
    document.querySelector('#player2HealthBar1').style.width =
      player2.health + '%';
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
    document.querySelector('#player1HealthBar2').style.width =
      player.health + '%';
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
