Crafty.sprite('assets/planets/planet2.png', {sprPlanet2: [0,0,996,991]})


Crafty.c('Planet', {
  init: function() {
    this.size = 900;
    this.requires('Entity, sprPlanet2, Solid, Collision')
      .resize(this.size,this.size)
    this.z = -100;
    this.collision(
      new Crafty.circle(this.size/2,this.size/2,this.size -5)
    );
  }

});
