'use strict';

export default class Boot extends Phaser.State {

  preload() {
    this.load.image('loaderBg', 'img/loader-bg.png');
    this.load.image('loaderBar', 'img/loader-bar.png');
  }

  create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.renderer.renderSession.roundPixels = true;
    this.game.stage.backgroundColor = '#604878';
    this.game.world.setBounds(0, 0, 2560, 960);

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.time.advancedTiming = true;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('Preload');
  }
}
