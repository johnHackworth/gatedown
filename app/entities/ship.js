Crafty.c('Ship', {
  init: function() {
    this.requires('Entity, Fourway, Color, Solid')
      .fourway(4)
      .color('#FFFFFF');
    this.initBindings();
  },
  speed: 0,
  heading: 0,
  initBindings: function() {
    this.bind("EnterFrame", this.inertia.bind(this));
  },
  inertia: function() {
    this.x++;
  }
});

