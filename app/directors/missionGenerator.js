window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};

window.gatedown.src.MissionTypes = {};


window.gatedown.src.MissionTypes.clearArea = {
  objetives: [
  // 0:
    { "text": "Kill all enemy ships",
      "condition": function() {
        // var remaining = this.missionControl.remaingingShips()
        // return remaining[this.enemyFaction] == 0
      }
    },
  // 1:
    { "text": "Keep at least 75% of your ships",
      "condition": function() {
        // var remaining = this.missionControl.remaingingShips()
        // return remaining[this.userFaction] > 0
      }
    }
  ],
  enemyForces: function(level) {
    level = level? level: 1;
    var scoutSquadrons = 2 * level;
    var forces = [];
    var initPoint = [
      18000 - Math.random() * 36000,
      18000 - Math.random() * 36000
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
      18000 - Math.random() * 36000,
      18000 - Math.random() * 36000
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
    'clearArea'
  ],
  types: window.gatedown.src.MissionTypes
}

