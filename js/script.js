'use strict';
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

canvasContext.fillRect(0, 0, canvas.width, canvas.height);
class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(this.position.x, this.position.y, 50, 150);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
});
player.draw();

const enemy = new Sprite({
  x: 400,
  y: 100,
});
enemy.draw();
console.log(player);

function animate() {
  window.requestAnimationFrame(animate);
  //   checking animate loop
  console.log('animateLoop');
}

animate();
