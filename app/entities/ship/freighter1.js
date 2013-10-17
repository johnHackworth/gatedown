Crafty.sprite('assets/freighter.png', {sprFreighter: [0,0,200,49]})


Crafty.c('Freighter1', {
  acceleration: 1,
  turningRadius: 1,
  baseTurningRadius: 1,
  velocity: 0 ,
  hullIntegrity: 20,
  maxVelocity: 2,
  heading: 0,
  centered: false,
  outOfControl: 0,
  init: function() {
    this.requires('Ship, Color, sprFreighter')
      .color('transparent')
    this.hull = this.requires('Hull1');
    this.hull.resize(100,25)
    this.initBindings();
    this.counter = 0;
    this.initComponents();
    this.setMaxvelocity(2)
  },
  initComponent: function(component, position) {
    this.components[component.toLowerCase()] = Crafty.e(component);
    this.components[component.toLowerCase()].assignOwner(this);
    this.components[component.toLowerCase()].position = position;
  },
  initComponents: function() {
    this.components = {};
    this.initComponent('Engine', [-5, 15]);
  },
  shoot: function() {
  }
});
