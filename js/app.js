// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  /*setting x and y*/
  this.x = x;
  this.y = y;
  /*setting the speed of the enemies to be random */
  this.speed = Math.floor(Math.random() * 5 + 5);
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  /*assaigning random speed to each enemy object*/
  for (enemy of allEnemies) {
    this.x += this.speed * dt;
  }
  /*restarting enemy positions once they leave  the canvas*/
  if (this.x > 505) {
    this.x = Math.floor(Math.random() * 100 - 200);
  }
  /*collision handling*/
  if (player.x - this.x <= 78 && player.x - this.x >= -68 && player.y - this.y <= 60 && player.y - this.y >= -60) {
    player.x = 202;
    player.y = 400;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/* adding a player object*/
const Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-cat-girl.png';
  this.move = 0;
}

Player.prototype.update = function() {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  /*return the player to the initial point after reaching the end of the canvas*/
  if (this.y <= 5) {
    this.x = 202;
    this.y = 400;
    /*counting how many times the player crosses the road*/
    this.move++;

    /*win and count message*/
    const results = document.createElement('div');
    results.setAttribute('id', 'results');
    document.body.appendChild(results);
    document.body.style.backgroundColor = '#77aa55';
    /* different message depending of times the player crosses*/
    if (this.move == 1) {
      document.getElementById('results').innerHTML = ` Well done, you did it ${this.move} time! `;
    } else {
      document.getElementById('results').innerHTML = ` Well done, you did it ${this.move} times! `;
    }

  }
};
/*key handling and assuring the player can]t exit the canvas*/
Player.prototype.handleInput = function(key, dt) {
  if (this.x > 0 && key == 'left') {
    (this.x += -30) * dt;
  }
  if (this.x < 400 && key == 'right') {
    (this.x += 30) * dt;
  }
  if (this.y > 0 && key == 'up') {
    (this.y += -30) * dt;
  }
  if (this.y < 405 && key == 'down') {
    (this.y += 30) * dt;
  }
}

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
/*setting inital position for each object*/
const enemy1 = new Enemy(-80, 60);
const enemy2 = new Enemy(-320, 140);
const enemy3 = new Enemy(-160, 220);
const enemy4 = new Enemy(-400, 60);
const enemy5 = new Enemy(-640, 140);
const player1 = new Player(202, 400);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Place the player object in a variable called player
const player = player1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
