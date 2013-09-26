Crafty.c('Ship', {
  init: function() {

    this.bind('destroyShip', this.destroyComponents.bind(this));
  },
  destroyComponents: function() {
    if(this.components) {
      for(var name in this.components) {
        this.components[name].destroy();
      }
    }
    this.pilot.breakFormation();
  }
});


