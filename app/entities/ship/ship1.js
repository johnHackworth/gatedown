Crafty.sprite('assets/fighter1.png', {sprShip: [0,0,200,124]})


Crafty.c('Ship1', {
  acceleration: 1,
  turningRadius: 5,
  baseTurningRadius: 5,
  velocity: 0 ,
  hullIntegrity: 3,
  maxVelocity: 12,
  heading: 0,
  centered: false,
  outOfControl: 0,
  init: function() {
    this.requires('Ship, Color, sprShip')
      .color('transparent')
    this.hull = this.requires('Hull1');
    this.hull.resize(14,9)
    this.initBindings();
    this.counter = 0;
    this.initComponents();
    this.setMaxvelocity(12
  },
  initComponent: function(component, position) {
    this.components[component.toLowerCase()] = Crafty.e(component);
    this.components[component.toLowerCase()].assignOwner(this);
    this.components[component.toLowerCase()].position = position;
  },
  initComponents: function() {
    this.components = {};
    this.initComponent('Engine', [-5, 2]);
    this.initComponent('LeftWing1', [1, -4]);
    this.initComponent('RightWing1', [1, 9]);
  },
  shoot: function() {
    this.components['rightwing1'].shoot();
    this.components['leftwing1'].shoot();
  },
  secondaryShoot:function() {console.log(2)

    if(!this.lastSecondaryShot || this.counter - this.lastSecondaryShot > 50) {
      this.lastSecondaryShot = this.counter;
      // console.log(2);
      var activateBulletAfter = 15;
      Crafty.e('Proton').shoot(this, activateBulletAfter);
    }
  }
});
