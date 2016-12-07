Crafty.sprite('assets/fighter2.png', {sprFighter2: [0,0,200,150]})


Crafty.c('Fighter2', {
  acceleration: 1,
  turningRadius: 5,
  baseTurningRadius: 2,
  velocity: 0 ,
  hullIntegrity: 4,
  maxVelocity: 15,
  heading: 0,
  centered: false,
  outOfControl: 0,
  init: function() {
    this.requires('Ship, Color, sprFighter2')
      .color('transparent')
    this.hull = this.requires('Hull1');
    this.hull.resize(14,14)
    this.initBindings();
    this.counter = 0;
    this.initComponents();
    this.setMaxvelocity(15)
  },
  initComponent: function(name, component, position) {
    this.components[name] = Crafty.e(component);
    this.components[name].assignOwner(this);
    this.components[name].position = position;
  },
  initComponents: function() {
    this.components = {};
    this.initComponent('engine','Engine', [-5, 5]);
    this.initComponent('cannon1', 'ShootingPoint', [14, 2]);
    this.initComponent('cannon2','ShootingPoint', [14, 9]);
  },
  shoot: function() {
    this.components['cannon1'].shoot();
    this.components['cannon2'].shoot();
  }
});
