window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};

window.gatedown.src.MissionTypes = {};


window.gatedown.src.MissionTypes.clearArea = {
  texts: [
    "Our long range scans have detected that a group of enemy scouts inside of our defensive lines. ",
    "We are sending you to intercept the enemy and make sure they don't do whatever they intend to do.",
    "You can expect nothing but light armored scout ships. Have a happy hunt"
  ],
  objetives: [
  // 0:
    { "text": "Kill all enemy ships",
      "condition": function() {
        var remaining = this.remainingShips()
        var enemyFaction = this.playerShip.userFaction === 1? 2:1;
        return remaining[enemyFaction] == 0
      }
    },
  // 1:
    { "text": "Keep at least 75% of your ships",
      "condition": function() {
        var remaining = this.remainingShips()
        if(!this.initialShips) {
          this.initialShips = remaining[this.playerShip.faction]
        }
        return remaining[this.playerShip.faction] > 3 * this.initialShips / 4;
      }
    }
  ],
  enemyForces: function(level) {
    level = level? level: 1;
    var scoutSquadrons = 2 * level;
    var forces = [];
    var initPoint = [
      5000 - Math.random() * 10000,
      5000 - Math.random() * 10000
    ];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 2,
        number: 3,
        faction: this.enemyFaction,
        name: 'tralara',
        mission: {
          type: "attack",
          where: { center: initPoint,radius: 8000}
        },
        initPoint: shipInitPoint
      })
    }
    return forces;
  },
  alliedForces: function(level) {
    level = level? level: 1;
    var scoutSquadrons = 3 - level;
    var forces = [];
    var initPoint = [
      5000 - Math.random() * 10000,
      5000 - Math.random() * 10000
    ];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 1,
        faction: this.userFaction,
        number: 3,
        mission: {
          type: "attack",
          where: { center: initPoint,radius: 8000}
        },
        initPoint: shipInitPoint
      })
    }
    return forces;
  }
}


window.gatedown.src.MissionTypes.shootDownSatellite = {
  texts: [
    "The enemy has placed an armoured satellite just next to gravity lane our suply ships",
    "use to reach our deep space station that guards the outer planets",
    "With that satellite, we can't resuply the station and we will probably lost the control of the farest sections of the system.",
    "We need to shoot it down as soon as possible. We aware that it will be protected by guardian ships."
  ],
  objetives: [
  // 0:
    { "text": "Shot down the armored satellite",
      "condition": function() {
        return this.objectiveShip.hullIntegrity <= 0
      }
    },
  // 1:
    { "text": "Kill all enemy ships",
      "condition": function() {
        var remaining = this.remainingShips()
        var enemyFaction = this.playerShip.userFaction === 1? 2:1;
        return remaining[enemyFaction] == 0
      }
    },

    { "text": "Keep at least 75% of your ships",
      "condition": function() {
        var remaining = this.remainingShips()
        if(!this.initialShips) {
          this.initialShips = remaining[this.playerShip.faction]
        }
        return remaining[this.playerShip.faction] > 3 * this.initialShips / 4;
      }
    }
  ],
  enemyForces: function(level) {
    level = level? level: 1;
    var scoutSquadrons = 3;
    var fighterSquadrons = 2;
    var forces = [];
    var initPoint = [
      5000 - Math.random() * 10000,
      5000 - Math.random() * 10000
    ];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    this.objectiveShip = Crafty.e('Station1').at(initPoint[0],initPoint[1])

    this.objectiveShip.faction = 1;

    for(var i =1; i <= 4; i++) {
      var gunner = new window.gatedown.src.gunner();
      // debugger;
      gunner.assignTurret(this.objectiveShip['turret'+i])
    }
    this.ships.push(this.objectiveShip)
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + 200 + i * 100, initPoint[1] + 200];
      forces.push({
        type: 2,
        number: 3,
        faction: this.enemyFaction,
        name: 'tralara',
        mission: {
          type: "defend",
          where: { center: initPoint,radius: 1000}
        },
        initPoint: shipInitPoint
      })
    }
    for(var i = fighterSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + 200 + i * 100, initPoint[1] + 500];
      forces.push({
        type: 3,
        number: 2,
        faction: this.enemyFaction,
        name: 'tralara',
        mission: {
          type: "defend",
          where: { center: initPoint,radius: 1000}
        },
        initPoint: shipInitPoint
      })
    }
    return forces;
  },
  alliedForces: function(level) {
    level = level? level: 1;
    var scoutSquadrons = 3 - level;
    var forces = [];
    var initPoint = [
      5000 - Math.random() * 10000,
      5000 - Math.random() * 10000
    ];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 1,
        faction: this.userFaction,
        number: 3,
        mission: {
          type: "attack",
          where: { center: initPoint,radius: 55000}
        },
        initPoint: shipInitPoint
      })
    }
    return forces;
  }
}

window.gatedown.src.MissionTypes.asteroidFieldHunt = {
  texts: [
    "A squadron of enemy scouts has infiltrated our territory. They have been hunt by a couple of our frigates,",
    "but the manage to flee unscatered and hide themselves inside the asteroid belt.",
    "They know we can't send battleships inside there and we will need to hunt them with fighters",
    "So fellows... happy hunt"
  ],
  asteroids: 200,
  objetives: [
  // 0:
    { "text": "Kill all enemy ships",
      "condition": function() {
        var remaining = this.remainingShips()
        var enemyFaction = this.playerShip.userFaction === 1? 2:1;
        return remaining[enemyFaction] == 0
      }
    },

    { "text": "Keep at least 75% of your ships",
      "condition": function() {
        var remaining = this.remainingShips()
        if(!this.initialShips) {
          this.initialShips = remaining[this.playerShip.faction]
        }
        return remaining[this.playerShip.faction] > 3 * this.initialShips / 4;
      }
    }
  ],
  enemyForces: function(level) {
    level = level? level: 1;
    var scoutSquadrons = 4 * level;
    var forces = [];
    var initPoint = [
      1500 - Math.random() * 3000,
      1500 - Math.random() * 3000
    ];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 2,
        number: 3,
        faction: this.enemyFaction,
        name: 'tralara',
        mission: {
          type: "defend",
          where: { center: [0,0], radius: 3000}
        },
        initPoint: shipInitPoint
      })
    }
    return forces;
  },
  alliedForces: function(level) {
    level = level? level: 1;
    var scoutSquadrons = 3 - level;
    var forces = [];
    var initPoint = [
      5000 - Math.random() * 10000,
      5000 - Math.random() * 10000
    ];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 1,
        faction: this.userFaction,
        number: 3,
        mission: {
          type: "attack",
          where: { center: initPoint,radius: 55000}
        },
        initPoint: shipInitPoint
      })
    }
    return forces;
  }
}


window.gatedown.src.MissionTypes.scortFreighter = {
  texts: [
    "One of our freighters is arriving to the system. There has been reports of enemy scouts in the zone, ",
    "So your squadron is going to be scrambled to keep them safe.",
    "Protect them"  ],
  endMission: function() {
    window.obj = this.objectiveShip;
    if(this.objectiveShip.hit('Planet')) {
      return true;
    }
    if(this.playerShip.hullIntegrity <= 0) {
      return true;
    }
    if(this.objectiveShip.hullIntegrity <= 0) {
      return true;
    }
    return false;
  },
  objetives: [
  // 0:
    { "text": "Keep the freighter alive until it reach the planet base",
      "condition": function() {
        return this.objectiveShip.hullIntegrity > 0
      }
    },
  // 1:
    { "text": "Kill all enemy ships",
      "condition": function() {
        var remaining = this.remainingShips()
        var enemyFaction = this.playerShip.userFaction === 1? 2:1;
        return remaining[enemyFaction] == 0
      }
    },

    { "text": "Keep at least 75% of your ships",
      "condition": function() {
        var remaining = this.remainingShips()
        if(!this.initialShips) {
          this.initialShips = remaining[this.playerShip.faction]
        }
        return remaining[this.playerShip.faction] > 3 * this.initialShips / 4;
      }
    }
  ],
  enemyForces: function(level) {
    level = level? level: 1;
    var scoutSquadrons = 2;
    var fighterSquadrons = 2;
    var forces = [];
    var initPoint = [
      0 - Math.random() * 10000,
      0 - Math.random() * 10000
    ];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];

    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + 200 + i * 100, initPoint[1] + 200];
      forces.push({
        type: 2,
        number: 3,
        faction: this.enemyFaction,
        name: 'tralara',
        mission: {
          type: "attack",
          where: { center: initPoint,radius: 55000}
        },
        initPoint: shipInitPoint
      })
    }
    for(var i = fighterSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + 200 + i * 100, initPoint[1] + 500];
      forces.push({
        type: 3,
        number: 1,
        faction: this.enemyFaction,
        name: 'tralara',
        mission: {
          type: "attack",
          where: { center: initPoint,radius: 55000}
        },
        initPoint: shipInitPoint
      })
    }
    return forces;
  },
  alliedForces: function(level) {
    this.planetPos = [Math.random() * 5000 - 10000, Math.random()*10000 - 5000]
    level = level? level: 1;
    var scoutSquadrons = 3 - level;
    var forces = [];
    var initPoint = [
     this.planetPos[0] + Math.random() * 20000 - 10000,
     this.planetPos[1] + Math.random() * 20000 - 10000
    ];
    initPoint.x = initPoint[0];
    initPoint.y = initPoint[1];

    this.objectiveShip = Crafty.e('Freighter1').at(initPoint[0] - 200,initPoint[1])
    this.objectiveShip.faction = 2;
    var pilot = new window.gatedown.src.pilot();
    pilot.mission = {
          type: "goTo",
          where: { center: [this.planetPos[0] + 300, this.planetPos[1]+ 300] ,radius: 100}
        },
    pilot.assignShip(this.objectiveShip);
    this.ships.push(this.objectiveShip)


    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 1,
        faction: this.userFaction,
        number: 3,
        mission: {
          type: "defend",
          where: { ship: this.objectiveShip, radius: 500}
        },
        initPoint: shipInitPoint
      })
    }
    return forces;
  }
}




window.gatedown.src.MissionGenerator = function(options) {
  this.missionControl = options.missionControl;
  for(var n in this.types) {
    this.types[n].userFaction = this.userFaction;
    this.types[n].enemyFaction = this.enemyFaction;
  }
};
window.gatedown.src.MissionGenerator.prototype = {
  userFaction: 2,
  enemyFaction: 1,
  missionTypes: [
    'clearArea',
    'shootDownSatellite'
  ],
  types: window.gatedown.src.MissionTypes
}

