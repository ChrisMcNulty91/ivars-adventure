import Ivar from '../prefabs/Ivar';
import tiledUtil from '../utils/tiledUtil';

export default class Play extends Phaser.State {

  create() {
    this.createWorld();

    let playerResult = tiledUtil.findObjectsByType('player_pos', this.map, 'Objects');

    this.player = new Ivar(this.game, playerResult[0].x, playerResult[0].y, 'protoPlayer');

    this.game.stage.addChild(this.player);
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.levelLayer);
    this.game.physics.arcade.collide(this.enemies, this.levelLayer);
    this.game.physics.arcade.collide(this.player, this.enemies);
    this.player.spellTome.forEach(spell => this.game.physics.arcade.collide(this.levelLayer, spell, () => { spell.kill(); }, null, this));
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
  }

  createWorld() {
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('level', 'level');

    this.backgroundLayer = this.map.createLayer('Background');
    this.levelLayer = this.map.createLayer('Level');


    this.map.setCollisionBetween(1, 2000, true, this.levelLayer);
    // this.levelLayer.resizeWorld();

    // this.createEnemies();
  }

  createEnemies() {
    this.enemies = this.game.add.physicsGroup();
    this.enemies.enableBody = true;

    let result = tiledUtil.findObjectsByType('enemy', this.map, 'Objects');
    result.forEach((element) => {
      tiledUtil.createFromTiledObject(element, this.enemies);
    }, this);

  }
}
