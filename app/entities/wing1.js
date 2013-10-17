Crafty.sprite(60, 60, 'assets/fighter1_wing.png', {
  sprLeftWing1: [0,0],
  sprRightWing1: [0,1]
});

Crafty.c('RightWing1', {
  init: function() {
    var self = this;
    this.requires('ShipComponent, sprRightWing1')
      .resize(4,4)
  },
  shoot: function() {
    if(!this.lastShot || this.counter - this.lastShot > 5) {
      this.lastShot = this.counter;
      var activateBulletAfter = 15;
      Crafty.e('Bullet').shoot(this.owner, activateBulletAfter, this).color('#FF0000');
    }

  }
});
Crafty.c('LeftWing1', {
  init: function() {
    var self = this;
    this.requires('ShipComponent, sprLeftWing1')
      .resize(4,4)
  },
  shoot: function() {
    if(!this.lastShot || this.counter - this.lastShot > 5) {
      this.lastShot = this.counter;
      var activateBulletAfter = 15;
      Crafty.e('Bullet').shoot(this.owner, activateBulletAfter, this).color('#FF0000');
    }

  }
});
