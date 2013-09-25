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
  this.ships = [];
  this.createEnemyShip = function() {
    var ship = Crafty.e('EnemyShip').at(5000 * Math.random() -2500, 5000 * Math.random() -2500);
    ship.faction = 1;
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(ship);
    pilot.setAreaOfAction({x:0, y:0}, 40000);
    self.ships.push(ship);
    self.pilots.push(pilot);
    return ship;
  }
  this.createShip = function(type, pos, faction) {
    var ship = Crafty.e(type).at(pos[0], pos[1]);
    ship.faction = faction;
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(ship);
    pilot.setAreaOfAction({x:0, y:0}, 40000);

    self.ships.push(ship);
    self.pilots.push(pilot)
    return ship;
  }
  this.createGroup = function(type, pos, number, faction, leaderShip) {
    if(!leaderShip) {
      leaderShip = this.createShip(type, pos, faction);
      this.ships.push(leaderShip);
    }
    for(var i = 1; i < number; i++) {
      var ship = this.createShip(type, [pos[0], pos[1] + 35*i], faction);
      ship.pilot.assignSquadron(leaderShip.pilot);
      this.ships.push(ship);
    }
  }

  this.playerShip = Crafty.e('Ship').at(0,0);
  this.playerShip.faction = 2;
  var pilot = new window.gatedown.src.pilot();
  pilot.assignShip(this.playerShip)
  this.playerShip.humanPlayer();
  this.playerShip.centerOfAction();
  this.pilots = [];

  this.createGroup('Ship', [20,20], 3, 2, this.playerShip);
  this.createGroup('Ship', [-50,20], 3, 2);

  this.createGroup('EnemyShip', [Math.floor(Math.random() * 8000),Math.floor(Math.random() * 6000)], Math.floor(Math.random() * 6), 1);
  this.createGroup('EnemyShip', [Math.floor(Math.random() * 8000),Math.floor(Math.random() * 6000)], Math.floor(Math.random() * 6), 1);

  window.ships = self.ships;


  this.radar = Crafty.e("Radar")
    .at(window.gatedown.config.width - 70, window.gatedown.config.height - 70)
    .scale(100)
    .text('Long distance')
    .followShips(this.ships, this.playerShip);

  this.radar = Crafty.e("Radar")
    .at(70, window.gatedown.config.height - 70)
    .scale(10)
    .text('Short distance')
    .followShips(this.ships, this.playerShip);


}).bind(window.gatedown.app.scenes.planet ),
function() {

});
