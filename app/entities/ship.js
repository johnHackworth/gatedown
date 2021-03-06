Crafty.c('Ship', {
  actionArea: [50000, 50000],
  outsideArea: 0,
  maxOutsideArea: 180,
  init: function() {
    this.bind('EnterFrame', this.checkAreaLimits.bind(this));
    this.bind('destroyShip', this.destroyComponents.bind(this));
  },
  destroyComponents: function() {
    if(this.components) {
      for(var name in this.components) {
        this.components[name].destroy();
      }
    }
    this.pilot.breakFormation();
  },
  checkAreaLimits: function() {
    if(
      (this.x > 3*(this.actionArea[0] /2) /4) ||
      (this.x < 3*(0 - this.actionArea[0] /2) /4) ||
      (this.y > 3*(this.actionArea[1] /2) /4) ||
      (this.y < 3*(0 - this.actionArea[1] /2) /4)
    ) {
      if(!this.outsideArea) {
        this.trigger('leavingActionArea1');
      } else if(this.outsideArea == 60) {
        this.trigger('leavingActionArea2');
      } else if(this.outsideArea == 120) {
        this.trigger('leavingActionArea3')
      }
      this.outsideArea++;
      if(this.outsideArea > this.maxOutsideArea) {
        this.trigger('jumpingOut');
        setTimeout(this.jumpOut.bind(this),250);
      }
    } else {
      if(this.outsideArea > 0) {
        this.trigger('returnedToActionArea')
      }
      this.outsideArea = 0;
    }
    if(this.gridPosition) {
      var current = gatedown.app.grid.check(this.x, this.y);
      if(current[0] != this.gridPosition[0] && current[1] != this.gridPosition[1]) {
        gatedown.app.grid.remove(this.gridPosition,this[0]);
        this.gridPosition = gatedown.app.grid.add(this.x, this.y, this);
      }
    } else {
      this.gridPosition = gatedown.app.grid.add(this.x, this.y, this);
    }

  },
  jumpOut: function() {
    this.trigger('destroyShip');
    this.destroy();
  }
});


