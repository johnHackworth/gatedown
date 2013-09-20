window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};

window.gatedown.src.pilot = function() {
  this.init();
}

window.gatedown.src.pilot.prototype = {
  SHIP_NEARBY: 600,
  DANGEROUS_BULLET: 500,
  MIN_DISTANCE: 30,
  hability: 50,
  sight: 50,
  mechanics: 50,
  counter: 0,
  init: function() {

  },
  assignShip: function(ship) {
    ship.pilot = this;
    this.ship = ship;
  },
  chooseTarget: function() {
    if(!this.ship) return;
    this.lastTargetCheck = this.counter;
    var ships = Crafty('Ship');
    var nearestShip = null;
    var nearestDistance = 10000;
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
    }
  },
  action: function() {
    this.counter++;
    if(Math.random() * 100 < this.hability && Math.random() > 0.7) {

      if(this.canCrash()) {
        if(this.ship.velocity <= 1) {
          this.intendedDirection += 90;
          this.ship.accelerate();
        } else {
          this.ship.deccelerate();
        }
      } else {
        var incomingBullets = this.lookForBullets();
        if(incomingBullets.length > 0) {
          if(this.debug) console.log('-skip-', incomingBullets.length)
          this.skipBullets(incomingBullets);
        } else {
          if(this.debug) console.log('-attack-')
          if(!this.attackingTarget || this.counter - this.lastTargetCheck > 15) {
            if(this.debug) console.log('-target-')
            this.chooseTarget();
          }
          if(this.attackingTarget) {
            this.attack(this.attackingTarget);
          }
        }
      }

    }
  },
  canCrash: function() {
    var nextPos = this.ship.getNewPosition();
    var ships = Crafty('Ship');
    var otherShip = null;
    for(var i = ships.length - 1; i >= 0; i--) {
      otherShip = Crafty(ships[i]);
      if(otherShip  != this.ship) {
        if(
          (Math.abs(otherShip.x - nextPos[0]) < this.MIN_DISTANCE) &&
          (Math.abs(otherShip.y - nextPos[1]) < this.MIN_DISTANCE)
        ) {
          return true;
        }
      }
    }
    return false;
  },
  attack: function(target) {
    this.ship.intendedDirection = this.ship.getAngleTo(target);
    this.ship.accelerate();
    this.ship.shoot();
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
    this.ship.accelerate();
  }


}
