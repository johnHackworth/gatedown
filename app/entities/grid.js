Crafty.c('Grid', {
  tileWidth: 10,
  tileHeight: 10,
  init: function() {
    this.attr({
      w: this.tileWidth,
      h: this.tileHeight
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x, y: this.y }
    } else {
      this.atX = x;
      this.atY = y;
      this.attr({ x: x, y: y });
      return this;
    }
  },
  resize: function(x, y) {
    this.attr({
      w: x,
      h: y
    });
    return this;
  },
  toRadians: function(degrees) {
    return degrees * Math.PI / 180;
  },

  rotatedPosition: function(displacement) {
    displacement = displacement || [0,0];
    var cosHeading = (Math.cos(this.toRadians(this.heading)));
    var sinHeading = (Math.sin(this.toRadians(this.heading)));
    return [
      this.x + displacement[0] * cosHeading - displacement[1] * sinHeading,
      this.y + displacement[0] * sinHeading + displacement[1] * cosHeading
    ];
  },
  distanceTo: function(entity) {
    return Crafty.math.distance(this.x, this.y, entity.x, entity.y);
  },
  getAngleTo: function(entity) {
    var x = entity.x || entity[0];
    var y = entity.y || entity[1];
    var angle = Math.atan2(y - this.y, x - this.x);
    if (angle < 0) angle = Math.PI * 2 + angle;
    return Crafty.math.radToDeg(angle) % 360;
  }

});
