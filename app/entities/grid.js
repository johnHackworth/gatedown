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
      this.attr({ x: x, y: y });
      return this;
    }
  },
  resize: function(x, y) {
    this.attr({
      w: x,
      h: y
    })
  }
});
