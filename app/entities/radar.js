Crafty.c('Radar', {
  playerColor: '#FFFFFF',
  alliedColor: '#00AAAA',
  enemyColor: '#FF0000',
  textToDisplay: 'radar',
  pointSize: 1,
  init: function(a) {
    this.requires('2D, Canvas')
    this.xPos = window.gatedown.config.width - 70;
    this.yPos = window.gatedown.config.height - 70;
    this.ready = true;
    this.bind('Draw', this._draw.bind(this))
    this.context = Crafty.canvas.context;
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
    ctx.fillRect(this.x,this.y,1,1)
    for(var i = 0, l = this.ships.length; i < l; i++) {
      var distanceX = this.ships[i].x - this.player.x;
      var distanceY = this.ships[i].y - this.player.y;
      if(this.ships[i].distanceTo(this.player) < 50 * this.scale) {
        if(this.ships[i].faction === this.player.faction) {
          ctx.fillSyle = this.alliedColor;
        } else {
          ctx.fillStyle = this.enemyColor;
        }
        ctx.fillRect(this.x + distanceX / this.scale,this.y + distanceY / this.scale,this.pointSize, this.pointSize)
      }
    };
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "normal 10px Arial";
  ctx.fillText(this.textToDisplay, this.x - 30, this.y + 60);

  }

});
