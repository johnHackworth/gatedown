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
  this.squadronNames = ['Red', 'Phoenix', 'Dragon', 'Salamander', 'Blue', 'Eagle', 'Manila', 'Zulu', 'Tango', 'Fox']
  this.createGroup = function(type, pos, number, faction, leaderShip) {
    var sqName = this.squadronNames[Math.floor(Math.random()*this.squadronNames.length)];
    if(!leaderShip) {
      leaderShip = this.createShip(type, pos, faction);
      this.ships.push(leaderShip);
    }
    leaderShip.pilot.name = sqName + ' Leader'
    leaderShip.pilot.squadronName = sqName + ' Squadron'
    for(var i = 1; i < number; i++) {
      var ship = this.createShip(type, [pos[0], pos[1] + 35*i], faction);
      ship.pilot.assignSquadron(leaderShip.pilot);
      ship.pilot.name = sqName + ' ' +i;
      this.ships.push(ship);
    }
  }

  this.playerShip = Crafty.e('Ship1').at(0,0);
  this.playerShip.faction = 2;
  var pilot = new window.gatedown.src.pilot();
  pilot.assignShip(this.playerShip)
  this.playerShip.humanPlayer();
  this.playerShip.centerOfAction();
  this.pilots = [];


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

  this.radio = Crafty.e("Radio")
  this.radio.subscribeChannel(2);
  this.radio.subscribeChannel(0);

  this.createGroup('Ship1', [20,20], 3, 2, this.playerShip);
  this.createGroup('Ship1', [-50,20], 3, 2);

  this.createGroup('Ship2', [Math.floor(Math.random() * 3000),Math.floor(Math.random() * 3000)], Math.floor(Math.random() * 6), 1);
  this.createGroup('Ship2', [Math.floor(Math.random() * 3000),Math.floor(Math.random() * 3000)], Math.floor(Math.random() * 6), 1);
  this.createGroup('Ship2', [Math.floor(Math.random() * 3000),Math.floor(Math.random() * 3000)], Math.floor(Math.random() * 6), 1);
  this.createGroup('Ship2', [Math.floor(Math.random() * 3000),Math.floor(Math.random() * 3000)], Math.floor(Math.random() * 6), 1);
  this.createGroup('Ship2', [Math.floor(Math.random() * 3000),Math.floor(Math.random() * 3000)], Math.floor(Math.random() * 6), 1);



}).bind(window.gatedown.app.scenes.planet ),
function() {

});
