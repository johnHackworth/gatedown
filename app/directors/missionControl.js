window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};

var shipType = {
  "1": "Ship1",
  "2": "Ship2",
  "3": "Fighter2"
}

window.gatedown.src.MissionControl = function() {
  this.missionGenerator = new window.gatedown.src.MissionGenerator(this);
};
window.gatedown.src.MissionControl.prototype = {
  pilots: [],
  ships: [],
  userFaction: 2,
  enemyFaction: 1,
  squadronNames: {
    1: ['Red', 'Blue', 'Yellow', 'Purple', 'Black', 'White'],
    2: ['Phoenix', 'Dragon', 'Salamander', 'Badger', 'Eagle', 'Fox']
  },
  options: {
    size: [50000, 50000]
  },
  initializeObjetives: function(primary, secondary) {
    window.missionControl = this;
    this.primaryObjetive = primary;
    this.secondaryObjetive = secondary;
    this.objetiveInterval = setInterval(this.checkObjetives.bind(this), 3000);
  },
  checkObjetives: function() {
    var self = this;
    if(this.primaryObjetive.condition.apply(this) && !this.primaryCompleted) {
      this.sayStatusWindow('Primary objetive completed')
      this.primaryCompleted = true;
      setTimeout(function() {
        self.finishedMissionWindow = Crafty.e('MissionFinishedWindow')
        self.finishedMissionWindow.initialize({
          primaryObjetive: self.primaryObjetive.condition.apply(self),
          secondaryObjetive: self.secondaryObjetive.condition.apply(self),
          shipDestroyed: false
        })
      }, 2000)
    }
    if(this.secondaryObjetive.condition.apply(this) && !this.secondaryCompleted) {
      this.secondaryCompleted = true;
    }
    if(this.playerShip.hullIntegrity <= 0) {
      this.sayStatusWindow('Your ship has been destroyed')
      setTimeout(function() {
        self.finishedMissionWindow = Crafty.e('MissionFinishedWindow')
        self.finishedMissionWindow.initialize({
          primaryObjetive: self.primaryObjetive.condition.apply(self),
          secondaryObjetive: self.secondaryObjetive.condition.apply(self),
          shipDestroyed: true
        })
      }, 2000)
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
  createAsteroids: function(n) {
    this.asteroids = []
    if(!this.asteroidFieldLimits) {
      this.asteroidFieldLimits = [[-2500, -2500], [2500,2500]];
    }
    var radius = [
      this.asteroidFieldLimits[1][0] - this.asteroidFieldLimits[0][0],
      this.asteroidFieldLimits[1][1] - this.asteroidFieldLimits[0][1]
    ]
    for(var i = 0; i < n; i++) {
      var asteroid = Crafty.e('Asteroid');
      var x = this.asteroidFieldLimits[0][0] + Math.random() * radius[0];
      var y = this.asteroidFieldLimits[0][1] + Math.random() * radius[1];
      // console.log(x,y);
      asteroid.at(x,y)
      this.asteroids.push(asteroid);
    }
  },
  createShip: function(type, pos, faction, mission) {
    var ship = Crafty.e(type).at(pos[0], pos[1]);
    ship.faction = faction;
    ship.actionArea = this.options.size;
    ship.bind('destroyShip', this.shipDestroyed.bind(this));
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(ship);
    pilot.mission = mission;
    console.log(mission);
    this.ships.push(ship);
    this.pilots.push(pilot)
    return ship;
  },
  createGroup: function(type, pos, number, faction, mission, leaderShip) {
    var sqName = this.squadronNames[faction][Math.floor(Math.random()*this.squadronNames[faction].length)];
    if(!leaderShip) {
      leaderShip = this.createShip(type, pos, faction, mission);
      this.ships.push(leaderShip);
    }
    leaderShip.pilot.name = sqName + ' Leader'
    leaderShip.pilot.squadronName = sqName + ' Squadron'
    for(var i = 1; i < number; i++) {
      var ship = this.createShip(type, [pos[0], pos[1] + 35*i], faction, mission);
      ship.pilot.assignSquadron(leaderShip.pilot);
      ship.pilot.name = sqName + ' ' +i;
      this.ships.push(ship);
    }
  },
  sayStatusWindow: function(text) {
    var self = this;
    if(!self.playerShip.statusWindow) {
      self.playerShip.statusWindow = Crafty.e('ShipStatusWindow')
    }
    self.playerShip.statusWindow.clear();
    self.playerShip.statusWindow.say(text)
  },
  createPlayerShip: function() {
    var self = this;

    this.playerShip = Crafty.e('Ship1').at(0,0);
    this.playerShip.faction = 2;
    this.playerShip.actionArea = this.options.size;
    var pilot = new window.gatedown.src.pilot();
    pilot.assignShip(this.playerShip)
    this.playerShip.humanPlayer();
    this.playerShip.centerOfAction();

    this.playerShip.bind('leavingActionArea1', function(){self.sayStatusWindow('Leaving the mission area in 3')});
    this.playerShip.bind('leavingActionArea2', function(){self.sayStatusWindow('Leaving the mission area in 2')});
    this.playerShip.bind('leavingActionArea3', function(){self.sayStatusWindow('Leaving the mission area in 1')});
    this.playerShip.bind('jumpingOut', function() {self.sayStatusWindow('Jumped back to base');});
    this.playerShip.bind('returnedToActionArea', function(){self.sayStatusWindow('');});


  },

  createPlayerGroup: function(type, pos, number, faction) {
    this.createPlayerShip();
    this.playerShip.at(pos[0], pos[1])
    this.createGroup(type, pos, number, faction, null, this.playerShip);

  },

  createMission: function(level, missionType) {
    var type = this.missionGenerator.types[missionType];
    console.log(missionType);
    var enemyForces = type.enemyForces.call(this, level);
    var alliedForces = type.alliedForces.call(this, level);
    for(var i = 0, l = enemyForces.length; i < l; i++) {
      this.createGroup(shipType[enemyForces[i].type],
        enemyForces[i].initPoint,
        enemyForces[i].number,
        enemyForces[i].faction,
        enemyForces[i].mission
      );
    }
    this.texts = type.texts;
    this.createPlayerGroup('Ship1', alliedForces[0].initPoint, alliedForces[0].number, alliedForces[0].faction);
    for(var i = 1, l = alliedForces.length; i < l; i++) {
      this.createGroup(shipType[alliedForces[i].type],
        alliedForces[i].initPoint,
        alliedForces[i].number,
        alliedForces[i].faction,
        alliedForces[i].mission
      );
    }
    if(this.planetPos) {
      this.planet = Crafty.e('Planet').at(this.planetPos[0], this.planetPos[1]);
      this.planet.faction = -1;
      this.ships.push(this.planet);
    }
    if(type.asteroids) {
      this.createAsteroids(type.asteroids);
    }

    this.initializeObjetives(type.objetives[0], type.objetives[1]);

  },
  clearAreaMission: function (level) {
    return this.createMission(level, 'clearArea');
  },
  shootDownSatellite: function (level) {
    return this.createMission(level, 'showDownSatellite');
  },
  scortFreighterMission: function(level) {
    return this.createMission(level, 'scortFreighter')
  },
  asteroidHuntMission: function (level) {
    return this.createMission(level, 'asteroidFieldHunt')
  },
}
