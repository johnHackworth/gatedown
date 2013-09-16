window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};
window.gatedown.app.scenes = window.gatedown.app.scenes || {};

window.gatedown.app.scenes.planet = {};

Crafty.scene('Planet', (function() {

  this.bg = Crafty.e("2D, Canvas, Image")
             .attr({x:-5000, y: -5000, w: 10000, h:10000})
             .image("http://fc09.deviantart.net/fs71/i/2011/078/a/a/simplistic_space_background_by_swordkirby9999-d3c04tz.jpg", "repeat");

  this.playerShip = Crafty.e('Ship').at(0,0);
  this.playerShip.faction = 2;
  this.playerShip.humanPlayer();

  this.alliedShip = Crafty.e('Ship').at(50,50);
  this.alliedShip.faction = 2;
  this.pilot0 = new window.gatedown.src.pilot();
  this.pilot0.assignShip(this.alliedShip)

  console.log =function(){}

  this.alliedShip2 = Crafty.e('Ship').at(90,50);
  this.alliedShip2.faction = 2;
  this.pilot3 = new window.gatedown.src.pilot();
  this.pilot3.assignShip(this.alliedShip2)

  this.otherShip = Crafty.e('EnemyShip').at(130,130);
  this.otherShip.faction = 1;
  this.pilot1 = new window.gatedown.src.pilot();
  this.pilot1.assignShip(this.otherShip)

  this.anotherShip = Crafty.e('EnemyShip').at(230,230);
  this.anotherShip.faction = 1;
  this.pilot2 = new window.gatedown.src.pilot();
  this.pilot2.assignShip(this.anotherShip)




}).bind(window.gatedown.app.scenes.planet ),
function() {

});
