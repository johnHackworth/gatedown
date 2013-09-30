window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};


window.gatedown.src.MissionControl = function() {

};
window.gatedown.src.MissionControl.prototype = {
  pilots: [],
  ships: [],
  squadronNames: {
    1: ['Red', 'Blue', 'Yellow', 'Purple', 'Black', 'White'],
    2: ['Phoenix', 'Dragon', 'Salamander', 'Badger', 'Eagle', 'Fox']
  },
  createShip: function(type, pos, faction) {
    var ship = Crafty.e(type).at(pos[0], pos[1]);
    ship.faction = faction;
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(ship);
    pilot.setAreaOfAction({x:0, y:0}, 40000);

    this.ships.push(ship);
    this.pilots.push(pilot)
    return ship;
  },
  createGroup: function(type, pos, number, faction, leaderShip) {
    var sqName = this.squadronNames[faction][Math.floor(Math.random()*this.squadronNames[faction].length)];
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
  },
  createPlayerShip: function() {
    this.playerShip = Crafty.e('Ship1').at(0,0);
    this.playerShip.faction = 2;
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(this.playerShip)
    this.playerShip.humanPlayer();
    this.playerShip.centerOfAction();
  },

  randomEncounter: function() {
    var friendlySquadronNumber = Math.ceil(Math.random() * 2);
    var foeSquadronNumber = Math.ceil(Math.random() * 3);

    this.createPlayerShip();
    this.playerShip.at(-3100, -3000)
    this.createGroup('Ship1', [-3100,-3000], 3, 2, this.playerShip);
    for(friendlySquadronNumber; friendlySquadronNumber; friendlySquadronNumber--) {
      this.createGroup('Ship1', [-3100 + 100 * friendlySquadronNumber, -3000], 3, 2);
    }

    for(foeSquadronNumber; foeSquadronNumber; foeSquadronNumber--) {
      this.createGroup('Ship2', [Math.floor(Math.random() * 6000),Math.floor(Math.random() * 6000)], 3, 1);
    }

    var station = Crafty.e('Station1').at(-40,-40)
    station.faction = 1;
    for(var i =1; i <= 4; i++) {
      var gunner = new window.gatedown.src.gunner();
      // debugger;
      gunner.assignTurret(station['turret'+i])
    }
    // station.pilot.name = 'Station leader';
    this.ships.push(station);
  },
  stationAttackTest: function() {

    this.createPlayerShip();
    this.playerShip.at(-200, -0)

    // var station = this.createShip('Station1', [0,0], 2);
    // station.pilot.name = 'Station leader';

    var station = Crafty.e('Station1').at(-40,-40)
    for(var i =1; i <= 4; i++) {
      var gunner = new window.gatedown.src.gunner();
      // debugger;
      gunner.assignTurret(station['turret'+i])
    }

  }
}
