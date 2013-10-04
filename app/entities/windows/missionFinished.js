Crafty.c('MissionFinishedWindow', {
  pause: true,
  backgroundColor: 'rgba(255,255,255,0.99 )',
  init: function() {
  },
  initialize: function(options) {
    var w = gatedown.config.width;
    var h = gatedown.config.height;
    this.options = options;
    this.modalW = this.requires('ModalWindow')

    this.addText('Mission ended', w/2 -100, 50, '#880000', {size: '30px'});


    if(options.shipDestroyed) {
      this.addText('You has been shot down by enemy', w/2 -150, 90, '#880000', {size: '25px'});
    }

    var primaryObjetive = options.primaryObjetive? 'completed':'failed';
    var primaryObjetiveColor = options.primaryObjetive? '#66FF66':'#FF6666';
    var secondaryObjetive = options.secondaryObjetive? 'completed':'failed';
    var secondaryObjetiveColor = options.secondaryObjetive? '#66FF66':'#FF6666';
    this.addText('Primary objetive '+primaryObjetive, 100, 150, primaryObjetiveColor, {size: '20px'});

    this.addText('Secondary objetive '+secondaryObjetive, 100, 220, secondaryObjetiveColor, {size: '20px'});

    this.addText('<< press any key to exit >>', w/2 - 100, h - 80);

    var backgroundColor = options.primaryObjetive? 'rgba(205,255,235,0.8 )':'rgba(255,205,205,0.8 )'

    this.modalW.setOptions({
      pause: false,
      backgroundColor: backgroundColor
    });
    setTimeout(this.keyDown.bind(this), 100);
  },
  keyDown: function() {
    // this.bind('KeyDown', this.destroyWindow.bind(this));
  },
  destroyWindow: function() {
    Crafty.pause();
    for(var i = 0, l = this.drawnTexts.length; i < l; i++) {
      this.drawnTexts[i].destroy();
    }
    this.destroy();
  }
});
