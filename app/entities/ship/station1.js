Crafty.sprite('assets/station1.png', {sprStation: [0,0,150,146]})


Crafty.c('Station1', {
  acceleration: 0,
  turningRadius: 0,
  baseTurningRadius: 0,
  velocity: 0 ,
  hullIntegrity: 30,
  maxVelocity: 0,
  heading: 0,
  centered: false,
  outOfControl: 0,
  init: function() {
    this.requires('Ship, HugeHull, Color, sprStation, WiredHitBox')
      .color('transparent')
    this.hull = this.requires('');
    this.hull.resize(150,146)
    this.counter = 0;
    this.collision(
      new Crafty.polygon([0,0], [150,0], [150,150], [0, 150])
    );
  },
  at: function(x,y) {
    this.x = x - 150;
    this.y = y - 146;
  }
});
