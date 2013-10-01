Crafty.c('HelpWindow', {
  pause: true,
  backgroundColor: 'rgba(255,255,255,0.99 )',
  init: function() {
    this.modalW = this.requires('ModalWindow')
    this.addText('HELP', 290, 20, '#880000', {size: '30px'});
    this.addText('Acelerate: Cursor Up', 150, 50);
    this.addText('Brake: Cursor Down', 150, 65);
    this.addText('Steering: Cursor Left / Right', 150, 80);
    this.addText('Shoot main gun: Space', 150, 95);
    this.addText('Dissmiss wingmen: Z', 150, 120);
    this.addText('Call wingmen: X', 150, 135);
    this.addText('<< Press any key to close >>', 250, 380);
    this.modalW.setOptions({
      pause: true,
      backgroundColor: 'rgba(255,255,255,0.5 )'
    });
    setTimeout(this.keyDown.bind(this), 500);
  },
  keyDown: function() {
    this.bind('KeyDown', this.destroyWindow.bind(this));
  },
  destroyWindow: function() {
    Crafty.pause();
    for(var i = 0, l = this.drawnTexts.length; i < l; i++) {
      this.drawnTexts[i].destroy();
    }
    this.destroy();
  }
});
