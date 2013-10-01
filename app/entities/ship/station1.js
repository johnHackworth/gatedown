Crafty.sprite('assets/station1.png', {sprStation: [0,0,150,146]})


Crafty.c('Station1', {
  acceleration: 0,
  turningRadius: 0,
  baseTurningRadius: 0,
  velocity: 0 ,
  hullIntegrity: 60,
  maxVelocity: 0,
  heading: 0,
  centered: false,
  outOfControl: 0,
  init: function() {
    this.requires('Ship, HugeHull, Color, sprStation')
      .color('transparent')
    this.hull = this.requires('');
    this.hull.resize(110,110)
    this.counter = 0;
    this.collision(
      new Crafty.circle(55,55,55)
    );
    this.initComponents();
  },
  initComponent: function(component, name, position, rotation) {
    this.components[name] = Crafty.e(component);

    this.components[name].attach(this);
    this.components[name].rotation = rotation;
  },
  shoot: function() {
    if(this.counter % 10 === 0) {
      this.turret1.shoot();
      this.turret2.shoot();
      this.turret3.shoot();
      this.turret4.shoot();
    }
  },
  initComponents: function() {
    this.components = {};
    this.turrets = [];
    this.turret1 = Crafty.e('Turret1').at(110,55)
    this.turret1.set(55,55,0,this);

    this.turret2 = Crafty.e('Turret1').at(110,55)
    this.turret2.set(55,55,270,this);

    this.turret3 = Crafty.e('Turret1').at(110,55)
    this.turret3.set(55,55,90,this);

    this.turret4 = Crafty.e('Turret1').at(110,55)
    this.turret4.set(55,55,180,this);

    this.turrets.push(this.turret1);
    this.turrets.push(this.turret2);
    this.turrets.push(this.turret3);
    this.turrets.push(this.turret4);
  },
});
