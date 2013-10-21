Crafty.c('ModalWindow', {
  backgroundColor: 'rgba(255,255,255,0.5)',
  pause: false,
  z: 9998,
  init: function() {
    this.requires('2d, Canvas, Text, Color')
    this.initialize();
    this.ready = true;
  },
  initialize: function() {
    this.color(this.backgroundColor);
    var w = gatedown.config.width;
    var h = gatedown.config.height;
    this.width = w;
    this.height = h;
    // this.z = 999999999;
    this.bind('EnterFrame', this.tick.bind(this));
    this.texts = [];
    this.drawnTexts = [];

  },
  setOptions: function(options) {
    if(options.backgroundColor) {
      this.backgroundColor = options.backgroundColor;
      this.color(this.backgroundColor);
    }
    if(options.pause) {
      this.pause = options.pause;
      if(this.pause) {
        this.tick();
        setTimeout(Crafty.pause.bind(Crafty), 25);
      }
    }
  },
  addText: function(text, x, y, color, style) {
    style = style? style: {};
    this.texts.push( {
      text:text,
      x:x,
      y:y,
      color: color,
      style: style,
      z: 9999
    })

    this.drawnTexts.push(Crafty.e('Text, Entity'))
  },
  at: function(x,y) {
    this.xPos = x;
    this.yPos = y;
    return this;
  },
  tick: function(ctx) {
    this.x = 0 - Crafty.viewport.x;
    this.y = 0 - Crafty.viewport.y;
    this.w = this.width;
    this.h = this.height;
    var i = 0;
    var color = '#333333';
    var textColor = color;
    for(var i = 0, l = this.texts.length; i < l; i++) {
      textColor = this.texts[i].color ? this.texts[i].color : color;
      this.drawnTexts[i].text(this.texts[i].text)
        .textColor(textColor)
        .textFont(this.texts[i].style)
        .at(this.x + this.texts[i].x, this.y + this.texts[i].y)

    }
  },
  clear: function() {
    this.texts = [];
    for(var i = 0, l = this.drawnTexts.length; i < l; i++) {
      this.drawnTexts[i].destroy();
    }
    this.drawnTexts = [];
  }
});
