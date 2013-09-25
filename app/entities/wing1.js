Crafty.sprite(11, 5, 'assets/ship1_wing.png', {
  sprRightWing1: [0,0],
  sprLeftWing1: [0,1]
});

Crafty.c('RightWing1', {
  init: function() {
    var self = this;
    this.requires('ShipComponent, sprRightWing1')
      .resize(11,5)
  },
  shoot: function() {
    if(!this.lastShot || this.counter - this.lastShot > 5) {
      console.log('bang')
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
      .resize(11,5)
  },
  shoot: function() {
    if(!this.lastShot || this.counter - this.lastShot > 5) {
      console.log('bang')
      this.lastShot = this.counter;
      var activateBulletAfter = 15;
      Crafty.e('Bullet').shoot(this.owner, activateBulletAfter, this).color('#FF0000');
    }

  }
});
