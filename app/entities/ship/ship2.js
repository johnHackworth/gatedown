Crafty.sprite('assets/little_ship2.png', {sprShip2: [0,0,15,11]})

Crafty.c('Ship2', {
  acceleration: 2,
  turningRadius: 4,
  baseTurningRadius: 4,
  velocity: 0 ,
  hullIntegrity: 3,
  maxVelocity:  5,
  heading: 0,
  centered: false,
  outOfControl: 0,
  init: function() {
    this.requires('Hull1, Ship, Color, sprShip2')
      .color('transparent')
    this.path = [];
    // this.initComponents();
  },
  shoot: function() {
    // console.log(1);
    if(!this.lastShot || this.counter - this.lastShot > 5) {
      this.lastShot = this.counter;
      // console.log(2);
      var activateBulletAfter = 15;
      Crafty.e('Bullet').shoot(this, activateBulletAfter).color('#FF0000');
    }
  },
  initComponents: function() {
    this.components = {};
    this.initComponent('Engine', [-5, 2]);
  }
});
