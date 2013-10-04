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
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 2,
        number: 3,
        faction: this.enemyFaction,
        name: 'tralara',
        mission: {
          type: "attack",
          where: [[-18000,-18000], [18000,18000]]
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
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 2,
        faction: this.userFaction,
        number: 3,
        mission: {
          type: "attack",
          where: [[-18000,-18000], [18000,18000]]
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
    var scoutSquadrons = 4;
    var forces = [];
    var initPoint = [
      5000 - Math.random() * 10000,
      5000 - Math.random() * 10000
    ];
    this.objectiveShip = Crafty.e('Station1').at(initPoint[0],initPoint[1])
    this.objectiveShip.faction = 1;
    for(var i =1; i <= 4; i++) {
      var gunner = new window.gatedown.src.gunner();
      // debugger;
      gunner.assignTurret(this.objectiveShip['turret'+i])
    }
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + 200 + i * 100, initPoint[1] + 200];
      forces.push({
        type: 2,
        number: 3,
        faction: this.enemyFaction,
        name: 'tralara',
        mission: {
          type: "attack",
          where: [[initPoint[0]-2000,initPoint[1]-2000], [initPoint[0]+2000,initPoint[1]+2000]]
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
    for(var i = scoutSquadrons; i; i--) {
      var shipInitPoint = [initPoint[0] + i * 100, initPoint[1]];
      forces.push({
        type: 2,
        faction: this.userFaction,
        number: 3,
        mission: {
          type: "attack",
          where: [[-18000,-18000], [18000,18000]]
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

