'use strict';
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