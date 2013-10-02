window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};


window.gatedown.src.MissionControl = function() {
  this.missionGenerator = new window.gatedown.src.MissionGenerator(this);
};
window.gatedown.src.MissionControl.prototype = {
  pilots: [],
  ships: [],
  squadronNames: {
    1: ['Red', 'Blue', 'Yellow', 'Purple', 'Black', 'White'],
    2: ['Phoenix', 'Dragon', 'Salamander', 'Badger', 'Eagle', 'Fox']
  },
  options: {
    size: [50000, 50000]
  },
  initializeObjetives: function(primary, secondary) {
    this.primaryObjetive = primary;
    this.secondaryObjective = secondary;
    alert(this.primaryObjetive.text);
    this.objetiveInterval = setInterval(this.checkObjetives.bind(this), 3000);
  },
  checkObjetives: function() {
    if(this.primaryObjetive.condition() && !this.primaryCompleted) {
      alert('primary objetive completed');
      this.primaryCompleted = true;
    }
    if(this.secondaryObjective.condition() && !this.secondaryCompleted) {
      alert('secondary objetive completed')
      this.secondaryCompleted = true;
    }
  },
  shipDestroyed: function() {

  },
  remainingShips: function() {
    var ships = Crafty('Ship');
    var ship = null;
    var playerFaction = this.playerShip.faction;
    var remainingShips = [0,0,0,0]
    for(var i = ships.length - 1; i >= 0; i--) {
      ship = Crafty(ships[i]);
      remainingShips[ship.faction]++;
    }
    return remainingShips;
  },
  createShip: function(type, pos, faction) {
    var ship = Crafty.e(type).at(pos[0], pos[1]);
    ship.faction = faction;
    ship.actionArea = this.options.size;
    ship.bind('destroyShip', this.shipDestroyed.bind(this));
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
    var self = this;
    var sayStatusWindow = function(text) {
      if(!self.playerShip.statusWindow) {
        self.playerShip.statusWindow = Crafty.e('ShipStatusWindow')
      }
      self.playerShip.statusWindow.clear();
      self.playerShip.statusWindow.say(text)
    }

    this.playerShip = Crafty.e('Ship1').at(0,0);
    this.playerShip.faction = 2;
    this.playerShip.actionArea = this.options.size;
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(this.playerShip)
    this.playerShip.humanPlayer();
    this.playerShip.centerOfAction();

    this.playerShip.bind('leavingActionArea1', function(){sayStatusWindow('Leaving the mission area in 3')});
    this.playerShip.bind('leavingActionArea2', function(){sayStatusWindow('Leaving the mission area in 2')});
    this.playerShip.bind('leavingActionArea3', function(){sayStatusWindow('Leaving the mission area in 1')});
    this.playerShip.bind('jumpingOut', function() {sayStatusWindow('Jumped back to base');});
    this.playerShip.bind('returnedToActionArea', function(){sayStatusWindow('');});
  },

  createPlayerGroup: function(type, pos, number, faction) {
    this.createPlayerShip();
    this.playerShip.at(pos[0], pos[1])
    this.createGroup(type, pos, number, faction, this.playerShip);

  },

  randomEncounter: function(options) {
    this.options = options;
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
  },
  clearAreaMission: function (level) {
    var type = this.missionGenerator.types.clearArea;
    var enemyForces = type.enemyForces(level);
    var alliedForces = type.alliedForces(level);
    for(var i = 0, l = enemyForces.length; i < l; i++) {
      this.createGroup('Ship2',
        enemyForces[i].initPoint,
        enemyForces[i].number,
        enemyForces[i].faction
      );
      console.log(enemyForces[i].faction);
    }
    this.createPlayerGroup('Ship1', alliedForces[0].initPoint, alliedForces[0].number, alliedForces[0].faction);
    for(var i = 1, l = alliedForces.length; i < l; i++) {
      this.createGroup('Ship1',
        alliedForces[i].initPoint,
        alliedForces[i].number,
        alliedForces[i].faction
      );
      console.log(alliedForces[i].faction);
    }

    this.initializeObjetives(type.objetives[0], type.objetives[1]);
  }
}
