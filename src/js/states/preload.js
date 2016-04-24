'use strict';

export default class Preload extends Phaser.State {

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    this.loaderBg.anchor.setTo(0.5);
    this.loaderBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.loaderBar);

    this.load.image('level', 'img/fantasy_tiles_by_surt.png');
    this.load.image('protoPlayer', 'img/proto-player.png');
    this.load.image('enemy', 'img/enemy.png');
    this.load.image('naga', 'img/naga.png');
    this.load.image('bullet', 'img/bullet.png');
    this.load.tilemap('level1', 'data/proto-level.json', null,  Phaser.Tilemap.TILED_JSON);
  }

  create() {
    this.state.start('Play');
  }
}
