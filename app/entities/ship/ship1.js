Crafty.sprite('assets/little_ship1.png', {sprShip: [0,0,10,9]})


Crafty.c('Ship1', {
  acceleration: 1,
  turningRadius: 3,
  baseTurningRadius: 3,
  velocity: 0 ,
  hullIntegrity: 3,
  maxVelocity: 4,
  heading: 0,
  centered: false,
  outOfControl: 0,
  init: function() {
    this.requires('Ship, Color, sprShip')
      .color('transparent')
    this.hull = this.requires('Hull1');
    this.hull.resize(10,9)
    this.initBindings();
    this.counter = 0;
    this.initComponents();
  },
  initComponent: function(component, position) {
    this.components[component.toLowerCase()] = Crafty.e(component);
    this.components[component.toLowerCase()].assignOwner(this);
    this.components[component.toLowerCase()].position = position;
  },
  initComponents: function() {
    this.components = {};
    this.initComponent('Engine', [-5, 2]);
    this.initComponent('LeftWing1', [0, -3]);
    this.initComponent('RightWing1', [0, 7 ]);
  },
  shoot: function() {
    this.components['rightwing1'].shoot();
    this.components['leftwing1'].shoot();
  }
});
