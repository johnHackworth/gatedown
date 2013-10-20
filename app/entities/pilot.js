window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};

window.gatedown.src.pilot = function() {
  this.init();
}

window.gatedown.src.pilot.prototype = {
  SHIP_NEARBY: 600,
  SHOOTING_DISTANCE: 500,
  DANGEROUS_BULLET: 500,
  THINK_DELTA: 5,
  MIN_DISTANCE: 10,
  MAX_DISTANCE_TO_LEADER: 2,
  MIN_DISTANCE_TO_LEADER: 2,
  hability: 50,
  sight: 50,
  mechanics: 50,
  counter: 0,
  deattachedDistance: 300,
  formationLoose: false,
  freeActionTime: 0,
  stoppedTime: 0,
  mission: {
    type: 'attack',
    where: {
      center: {x:0,y:0},
      radius: 20000
    }
  },
  init: function() {
    this.squadron = [];
    this.THINK_TURN = Math.floor(Math.random() * this.THINK_DELTA);
  },
  assignShip: function(ship) {
    ship.pilot = this;
    this.ship = ship;
    this.MIN_DISTANCE = this.ship.w * 1.5;
    this.ship.bind('destroyShip', this.notifyDestroy.bind(this));
    this.ship.bind('hit', this.notifyHeavyDamage.bind(this));
    this.ship.bind('leavingActionArea1', this.notifyLeavingActionArea.bind(this))
  },
  notifyDestroy: function() {
    this.sendRadioMessage(this.name + ' destroyed')
  },
  notifyHeavyDamage: function() {
    if(this.ship.hullIntegrity <= 1) {
      this.sendRadioMessage('mayday! mayday!')
    }
  },
  notifyLeavingActionArea: function() {
    if(this.ship.playerControlled) {
      this.sendRadioMessage('Leaving the action area... getting ready to jump')
    }
  },
  breakFormation: function() {
    if(!this.formationLoose) {
      this.sendRadioMessage(this.squadronName + ': dissengage formation');
    }
    this.formationLoose = true;
  },
  joinFormation: function() {
    if(this.formationLoose) {
      this.sendRadioMessage(this.squadronName + ': engage formation');
    }
    this.formationLoose = false;
  },
  setAreaOfAction: function(center, radius) {
    this.centerOfAction = center;
    this.radiusOfAction = radius;
  },
  checkNearBalance: function() {
    if(!this.squadronLeader && this.ship && this.ship.gridPosition) {
      var enemyFaction = gatedown.app.enemy(this.ship.faction);
      var nearEnemies = gatedown.app.grid.faction(this.ship.gridPosition, enemyFaction);
      var nearFriends = gatedown.app.grid.faction(this.ship.gridPosition, this.ship.faction);

      if(nearEnemies.length > nearFriends.length) {
        this.breakFormation();
      } else {
        this.joinFormation();

      }
    }
  },
  chooseTarget: function() {
    if(!this.ship) return;
    this.checkNearBalance();
    this.lastTargetCheck = this.counter;
    var ships = Crafty('Ship');
    var nearestShip = null;
    var nearestDistance = 100000;
    var otherShip = null;
    for(var i = ships.length - 1; i >= 0; i--) {
      otherShip = Crafty(ships[i]);
      // debugger;
      if(otherShip.faction  != this.ship.faction) {
        if(otherShip.distanceTo(this.ship) < nearestDistance) {
          nearestShip = otherShip
        }
      }
    }
    if(nearestShip) {
      this.attackingTarget = nearestShip;
      if(Math.random() * 100 < 1) {
        this.sendPublicMessage('Die, you pig')
      }
    }
  },
  action: function() {
    this.counter++;
    if(!(this.counter % this.THINK_DELTA == 0)) {
      return;
    }

    if(this.squadronLeader) {
      return this.squadronAction();
    } else {
      if(!this.insideAreaOfAction()) {
        return this.returnToAreaOfAction();
      }
      return this.freeAction();
    }
  },
  insideAreaOfAction: function() {
    if(!this.mission) return true;
    if(this.mission.where.center) {
      return this.ship.distanceTo(this.mission.where.center) < this.mission.where.radius;
    } else if(this.mission.where.ship) {
      return this.ship.distanceTo(this.mission.where.ship) < this.mission.where.radius;
    }
  },
  returnToAreaOfAction: function() {
    var destination = this.mission.where.center;
    if(this.mission.where.ship) {
      destination = this.mission.where.ship;
    }
    this.ship.intendedDirection = this.ship.getAngleTo(destination);
    this.accelerate();
  },
  shipInFront: function() {
    var ships = Crafty('Ship');
    var otherShip = null;
    var minAngle = 20;
    for(var i = ships.length - 1; i >= 0; i--) {
      otherShip = Crafty(ships[i]);
      minAngle = 20 + otherShip.w / 10 + otherShip.h / 10
      if(this.ship.distanceTo(otherShip) < this.SHOOTING_DISTANCE &&
        Math.abs(this.ship.getAngleTo(otherShip) - this.ship.heading) < minAngle &&
        this.ship.faction !== otherShip.faction
      ) {
        return true;
      }
    }
    return false;
  },
  freeAction: function() {
    if(Math.random() * 100 < this.hability && Math.random() > 0.7) {
      var crashingInto = this.canCrash();
      if(crashingInto) {
        if(this.ship.centered) {
          // debugger;
        }

        var crashAngle = this.ship.getAngleTo(crashingInto);
        var crashOrientation = gatedown.app.angles(this.ship.orientation, crashAngle);

        if(this.ship.velocity <= 1) {
          this.ship.intendedDirection = this.ship.getAngleTo(crashingInto) + crashOrientation * 90 % 360;
          this.accelerate();
        } else {
          this.ship.intendedDirection = this.ship.getAngleTo(crashingInto) + crashOrientation * 90 % 360;
          this.ship.deccelerate();
        }
      } else {
        var incomingBullets = this.lookForBullets();
        if(incomingBullets.length > 0) {
          this.skipBullets(incomingBullets);
          if(this.shipInFront()) {
            this.shoot();
          }
        } else {
          if(!this.attackingTarget || this.counter - this.lastTargetCheck > 15) {
            this.chooseTarget();
          }
          if(this.attackingTarget) {
            this.attack(this.attackingTarget);
          }
        }
      }

    }
  },
  checkSquadronFreeInitiative: function() {
    if(this.ship.velocity <= 0.5) {
      this.stoppedTime++;
      if(this.stoppedTime > 30) {
        this.freeActionTime = 100;
      }
    }

    if(this.freeActionTime) {
      this.freeActionTime--;
    }
  },
  squadronAction: function() {
    this.checkSquadronFreeInitiative()
    if(
      this.ship.distanceTo(this.squadronLeader.ship) > this.deattachedDistance ||
      this.squadronLeader.ship.outOfControl ||
      this.squadronLeader.formationLoose ||
      this.freeActionTime
    ) {
      return this.freeAction();
    } else {

      if(Math.random() * 1 < this.hability) {
        if(this.canCrash()) {
          if(this.ship.velocity <= 1) {
            this.ship.intendedDirection = this.ship.heading + 90 % 360;
            this.accelerate();
          } else {
            this.ship.intendedDirection = this.ship.heading + 90 % 360;
            this.ship.deccelerate();
          }
        }  else {
          var distanceToLeader = this.ship.distanceTo(this.squadronLeader.ship);
          var headingDiference = Math.abs(this.ship.heading - this.squadronLeader.ship.heading);
          // if(headingDiference < 30) {
            var myPosition = this.arrowheadFormation();
            var correctDistance = Math.sqrt(Math.pow(myPosition[0],2) + Math.pow(myPosition[1],2))
            if((distanceToLeader - correctDistance) > this.MAX_DISTANCE_TO_LEADER) {
              this.accelerate();
            }
            if((distanceToLeader - correctDistance) < this.MIN_DISTANCE_TO_LEADER) {
              this.ship.deccelerate();
            }
          // }
          this.followSquadron();
        }

      }
    }

    if(this.shipInFront()) {
      this.shoot();
    }
  },
  canCrash: function() {
    var nextPos = this.ship.getNewPosition();
    var ships = Crafty('Ship');
    var otherShip = null;

    var asteroids = Crafty('Asteroid');
    var asteroid = null;
    for(var i = asteroids.length - 1; i >= 0; i--) {
      asteroid = Crafty(asteroids[i]);
      if(
          (Math.abs(asteroid.x - nextPos[0]) < this.MIN_DISTANCE * 2) &&
          (Math.abs(asteroid.y - nextPos[1]) < this.MIN_DISTANCE * 2) &&
          (
            (Math.abs(this.ship.getAngleTo(asteroid) - this.ship.heading) < 90) ||
            (Math.abs(this.ship.getAngleTo(asteroid) - this.ship.heading) > 250)
          )
        ) {
        return asteroid;
      }
    }

    for(var i = ships.length - 1; i >= 0; i--) {
      otherShip = Crafty(ships[i]);
      if(otherShip  != this.ship) {
        var diff = Math.abs(otherShip.heading - this.ship.heading) % 360;
        var modif = diff > 90? 2: 1;
        if(otherShip.w > 20) {
          modif = 3;
        }
        if(
            (Math.abs(otherShip.x - nextPos[0]) < this.MIN_DISTANCE * modif) &&
            (Math.abs(otherShip.y - nextPos[1]) < this.MIN_DISTANCE * modif) &&
            (
              (Math.abs(this.ship.getAngleTo(otherShip) - this.ship.heading) < 60) ||
              (Math.abs(this.ship.getAngleTo(otherShip) - this.ship.heading) > 300)
            )
          ) {
          return otherShip;
        }
      }
    }

    return false;
  },
  attack: function(target) {
    this.ship.intendedDirection = this.ship.getAngleTo(target);
    this.accelerate();
    if(this.ship.distanceTo(target) < 600) {
      this.shoot();
    }

  },
  lookForBullets: function() {
    if(!this.ship) return [];
    if(this.debug && window.debug) debugger;
    var bullets = Crafty('Bullet');
    var incomingBullets = [];
    for(var i = bullets.length - 1; i >= 0; i--) {
      bullet = Crafty(bullets[i]);
      if(
        bullet.distanceTo(this.ship) < this.DANGEROUS_BULLET &&
        bullet.owner != this.ship
      ) {
        var impactAngle = bullet.getAngleTo(this.ship);
        var isApproaching = Math.abs((impactAngle + 360) - (bullet.heading + 360)) < 5;
        if(isApproaching) {
          incomingBullets.push(bullet);
        }
      }
    }
    return incomingBullets;
  },
  skipBullets: function(incomingBullets) {
    this.ship.intendedDirection = incomingBullets[0].heading + 45;// * (Math.random() - 0.5);
    this.accelerate();
  },
  assignSquadron: function(leader) {
    this.squadronLeader = leader;
    this.squadronLeader.squadron.push(this);
    this.squadronPosition = this.squadronLeader.squadron.length;
  },
  arrowheadFormation: function() {
    var positions = [
      [0,0],
      [-50, -50],
      [-50, 50],
      [-100, -100],
      [-100, 0],
      [-100, 100]
    ]
    return positions[this.squadronPosition];
  },
  followSquadron: function() {
    var distance = this.arrowheadFormation();
    var squadronLeaderPos = [this.squadronLeader.ship.x,this.squadronLeader.ship.y];
    var squadronLeaderHeading = this.squadronLeader.ship.heading;
    var nonRotatedPos = [squadronLeaderPos[0], squadronLeaderPos[1]]
    var sinHeading = Math.sin(this.ship.toRadians(squadronLeaderHeading));
    var cosHeading = Math.cos(this.ship.toRadians(squadronLeaderHeading));
    var newX = nonRotatedPos[0] + distance[0] * cosHeading - distance[1] * sinHeading;
    var newY = nonRotatedPos[1] + distance[0] * sinHeading + distance[1] * cosHeading;
    var newDirection = 0;
    var minDistance = this.ship.w * 1.5;
    if(Math.abs(newX - this.ship.x) < minDistance && Math.abs(newY - this.ship.y) < minDistance) {
      newDirection = squadronLeaderHeading;
      this.inPosition = true;
      this.ship.velocity = this.squadronLeader.ship.velocity; //you are a cheater, javi!
      // this.ship.heading = this.squadronLeader.ship.heading;;
    } else {
      this.inPosition = false;
      newDirection = this.ship.getAngleTo({x: newX, y: newY});
    }
    if(Math.abs(squadronLeaderHeading - newDirection) > 90 &&
      Math.abs(squadronLeaderHeading - newDirection) < 270
    ) {
      this.ship.brake();
    } else {
      this.ship.intendedDirection = newDirection;
    }
    // this.ship.x = newX;
    // this.ship.y = newY;
    // this.ship.heading = this.squadronLeader.ship.heading;
  },
  accelerate: function() {
    if(this.squadronLeader) {
      var leadShip = this.squadronLeader.ship;
      if(this.ship.velocity >= leadShip.velocity + leadShip.acceleration) {

      } else {
        this.ship.accelerate();
      }
    } else {
      this.ship.accelerate();
    }
  },
  shoot: function() {
    if(!this.squadronLeader || this.inPosition){
      this.ship.shoot();
    }
    for(var i = 0, l = this.squadron.length; i < l; i++) {
      this.squadron[i].shoot();
    }
  },
  sendRadioMessage: function(text ) {
    if(!this.lastMessage ||
      this.lastMessage.message.text != text ||
      this.counter - this.lastMessage.counter > 20
    ) {
      var message = {
        channel: this.ship.faction,
        origin: this,
        text: text
      }
      this.lastMessage = {
        message: message,
        counter: this.counter
      }
      Crafty.trigger('radioMessage', message);
    }
  },
  sendPublicMessage: function(text ) {
    if(!this.lastMessage ||
      this.lastMessage.message.text != text ||
      this.counter - this.lastMessage.counter > 20
    ) {
      var message = {
        channel: 0,
        origin: this,
        text: text
      }
      this.lastMessage = {
        message: message,
        counter: this.counter
      }
      Crafty.trigger('radioMessage', message);
    }
  }




}
