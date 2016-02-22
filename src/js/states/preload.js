export default class Preload extends Phaser.State {

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loaderBg");
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loaderBar");
    this.loaderBg.anchor.setTo(0.5);
    this.loaderBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.loaderBar);

    this.load.image("protoPlayer", "img/proto-player.png");
    this.load.image("bullet", "img/bullet.png");
    this.load.tilemap("level1", "data/sample-level.json", null,  Phaser.Tilemap.TILED_JSON);
    this.load.image("enemy_1", "img/proto-player.png");
    this.load.image("enemy_2", "img/proto-player.png");
    this.load.image("level", "img/scifi_platformTiles_16x16.png");
  }

  create() {
    this.state.start("Play");
  }
}
