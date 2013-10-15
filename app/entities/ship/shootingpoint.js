Crafty.sprite(10, 20, 'assets/shootingpoint.png', {
  sprShootingPoint: [0,0]
});

Crafty.c('ShootingPoint', {
  init: function() {
    var self = this;
    this.requires('ShipComponent, sprShootingPoint')
      .resize(2,4)
  },
  shoot: function() {
    if(!this.lastShot || this.counter - this.lastShot > 5) {
      this.lastShot = this.counter;
      var activateBulletAfter = 15;
      Crafty.e('Bullet').shoot(this.owner, activateBulletAfter, this).color('#FF0000');
    }

  }
});
