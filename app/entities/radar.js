Crafty.c('Radar', {
  playerColor: 'rgb(255,255,255)',
  alliedColor: 'rgb(100,255,255)',
  enemyColor: 'rgb(255,100,100)',
  textToDisplay: 'radar',
  pointSize: 1,
  init: function() {
    this.requires('2D, Canvas')
    this.xPos = window.gatedown.config.width - 70;
    this.yPos = window.gatedown.config.height - 70;
    this.ready = true;
    this.bind('Draw', this._draw.bind(this))
    this.context = Crafty.canvas.context;
    this.ready = true;

  },
  text: function(text) {
    this.textToDisplay = text;
    return this;
  },
  at: function(x,y) {
    this.xPos = x;
    this.yPos = y;
    return this;
  },
  scale: function(sc) {
    this.scale = sc;
    if(this.scale < 100) {
      this.pointSize = 2;
    }
    return this;
  },
  followShips: function(ships, playerShip){
    this.ships = ships;
    this.player = playerShip;
    return this;
  },
  _draw: function(ctx) {
    this.x = this.xPos - Crafty.viewport.x;
    this.y = this.yPos - Crafty.viewport.y;
    var ctx = this.context;
    ctx.save();
    ctx.fillStyle = 'rgba('+(150 + Math.floor(Math.random() * 55))+',255,255,0.3)';
    ctx.beginPath();
    ctx.arc(
       this.x,
       this.y,
       50,
       0,
       Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = this.playerColor;
    ctx.fillRect(25,25,2,2)
    var xPoint, yPoint;
    for(var i = 0, l = this.ships.length; i < l; i++) {
      var distanceX = this.ships[i].x - this.player.x;
      var distanceY = this.ships[i].y - this.player.y;
      distanceX = distanceX > 50 * this.scale? 50 * this.scale: distanceX;
      distanceX = distanceX < -50 * this.scale? -50 * this.scale: distanceX;
      distanceY = distanceY > 50 * this.scale? 50 * this.scale: distanceY;
      distanceY = distanceY < -50 * this.scale? -50 * this.scale: distanceY;
      if(this.ships[i].hullIntegrity > 0) {
        var pointSizeCorrector = this.ships[i].w > 30? 2: 1;
        if(this.ships[i].faction === -1) {
          // planet
          ctx.fillStyle = '#CCAA33';
          pointSizeCorrector = 4;
          console.log('aaa');
        } else if(this.ships[i].faction === this.player.faction) {
          ctx.fillStyle = this.alliedColor;
        } else {
          ctx.fillStyle = this.enemyColor;
        }
        xPoint = this.x + distanceX / this.scale;
        yPoint = this.y + distanceY / this.scale
        ctx.fillRect(xPoint,yPoint,this.pointSize * pointSizeCorrector, this.pointSize * pointSizeCorrector)
      }
    };
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "normal 10px Arial";
  ctx.fillText(this.textToDisplay, this.x - 30, this.y + 60);

  }

});
