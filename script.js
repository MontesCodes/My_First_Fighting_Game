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
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.75,
  offset: {
    x: 215,
    y: 185,
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8,
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6,
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4,
    },
  },
  attackBox: {
    offset: {
      x: 143,
      y: 50,
    },
    width: 160,
    height: 50,
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
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.75,
  offset: {
    x: 215,
    y: 200,
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4,
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4,
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3,
    },
  },
  attackBox: {
    offset: {
      x: -165,
      y: 50,
    },
    width: 165,
    height: 50,
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
    player.switchSprite('run');
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  ///player Jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  } else if (player.velocity.y > 0) {
    player.switchSprite('jump');
  }

  /// player2 Movement
  if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
    player2.velocity.x = -5;
    player2.switchSprite('run');
  } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
    player2.velocity.x = 5;
    player2.switchSprite('run');
  } else {
    player2.switchSprite('idle');
  }

  ///player2 Jumping
  if (player2.velocity.y < 0) {
    player2.switchSprite('jump');
  } else if (player2.velocity.y > 0) {
    player2.switchSprite('jump');
  }

  /// Detect for Collision onto player 2
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: player2,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    player2.takeHit();
    player.isAttacking = false;

    document.querySelector('#player2Health').style.width = player2.health + '%';
    console.log('player_Collision');
  }

  /// if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  /// Detect for Collision onto player 1
  if (
    rectangularCollision({
      rectangle1: player2,
      rectangle2: player,
    }) &&
    player2.isAttacking &&
    player2.framesCurrent === 2
  ) {
    player.takeHit();
    player2.isAttacking = false;

    document.querySelector('#player1Health').style.width = player.health + '%';
    console.log('player2_Collision');
  }

  /// if player2 misses
  if (player2.isAttacking && player2.framesCurrent === 2) {
    player2.isAttacking = false;
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
