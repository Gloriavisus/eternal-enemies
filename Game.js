'use strict';

function Game(canvas) {
  this.player = null;
  this.enemies = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.onGameOver = null;
}

Game.prototype.startGame = function() {
  // inicializar jugador y pelota
  this.player = new this.player(this.canvas);
  var loop = () => {

    if(Math.random() > 0.97) {
      var randomY = Math.random() * this.canvas.height - 10;
      var newPelota = new EnemÇPelotay(this.canvas, randomY);
      this.pelota.push(newPelota);
    }

    this.update();
    this.clear();
    this.draw();
    this.checkCollisions()
    if(!this.isGameOver) {
      requestAnimationFrame(loop)
    } else {
      this.onGameOver();
    }
  };
  loop();
}

Game.prototype.update = function() {
  this.player.move();
  this.pelota.forEach(function(pelota) {
    pelota.move();
  })
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.player.draw();
  this.pelota.forEach(function(pelota) {
    pelota.draw();
  })
}

Game.prototype.checkCollisions = function() {
  this.pelota.forEach((pelota, index) => {
    var rightLeft = this.player.x + this.player.width >= pelota.x;
    var leftRight = this.player.x <= pelota.x + pelota.width;
    var bottomTop = this.player.y + this.player.height >= pelota.y;
    var topBottom = this.player.y <= pelota.y + pelota.height;

    if (rightLeft && leftRight && bottomTop && topBottom) {
      this.pelota.splice(index, 1);
      this.player.lives --;
      if(this.player.lives === 0) {
        this.isGameOver = true;
      }
    }
  })
}

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
}