'use strict';
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

canvasContext.fillRect(0, 0, canvas.width, canvas.height);
class Sprite {
  constructor(position) {
    this.position = position;
  }

  draw() {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(this.position.x, this.position.y, 50, 150);
  }
}

const player = new Sprite({
  x: 0,
  y: 0,
});
player.draw();
console.log(player);
