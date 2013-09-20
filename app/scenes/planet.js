window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};
window.gatedown.app.scenes = window.gatedown.app.scenes || {};

window.gatedown.app.scenes.planet = {};

Crafty.scene('Planet', (function() {
  var self = this;
  this.bg = Crafty.e("2D, Canvas, Image")
             .attr({x:-25000, y: -25000, w: 50000, h:50000})
             .image("http://fc09.deviantart.net/fs71/i/2011/078/a/a/simplistic_space_background_by_swordkirby9999-d3c04tz.jpg", "repeat");

  this.createEnemyShip = function() {
    var ship = Crafty.e('EnemyShip').at(5000 * Math.random() -2500, 5000 * Math.random() -2500);
    ship.faction = 1;
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(ship)
    self.ships.push(ship);
    self.pilots.push(pilot);
  }
  this.createShip = function(type, pos, faction) {
    var ship = Crafty.e(type).at(pos[0], pos[1]);
    ship.faction = faction;
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(ship)
    self.ships.push(ship);
    self.pilots.push(pilot);
  }

  this.playerShip = Crafty.e('Ship').at(0,0);
  this.playerShip.faction = 2;
  this.playerShip.humanPlayer();
  this.pilots = [];
  this.ships = [];
  for(var i = 0; i < 8; i++) {
    this.createShip('Ship', [0, 35 + 35*i], 2);
  }
  for(var i = 0; i < 8; i++) {
    this.createEnemyShip();
  }
  window.ships = self.ships;

}).bind(window.gatedown.app.scenes.planet ),
function() {

});
