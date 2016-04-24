import Ivar from '../prefabs/Ivar';
import tiledUtil from '../utils/tiledUtil';
import Enemy from '../prefabs/Enemy';

export default class Play extends Phaser.State {

  create() {
    this.createWorld();

    let playerResult = tiledUtil.findObjectsByType('player_pos', this.map, 'Objects');

    this.player = new Ivar(this.game, playerResult[0].x, playerResult[0].y, 'protoPlayer');
    this.game.add.existing(this.player);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.levelLayer);
    this.game.physics.arcade.collide(this.player, this.enemies, null, this.player.reset, this);
    this.player.spellTome.forEach(spell => this.game.physics.arcade.collide(this.levelLayer, spell, () => { spell.kill(); }, null, this));
    this.enemies.forEach(enemy => this.game.physics.arcade.collide(this.levelLayer, enemy, null, enemy.flipDirection(-1), this));
    this.enemies.forEach(enemy => this.game.physics.arcade.collide(enemy, this.player.spellTome, enemy.hit , null, this));
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 32, 32, '#00FF00');
  }

  createWorld() {
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('level', 'level');

    this.backgroundLayer = this.map.createLayer('Background');
    this.levelLayer = this.map.createLayer('Level');

    this.map.setCollisionBetween(1, 2000, true, this.levelLayer);
    this.levelLayer.resizeWorld();

    this.enemies = this.createEnemies();
  }

  createEnemies() {
    let enemies = this.game.add.group();

    let result = tiledUtil.findObjectsByType('enemy_pos', this.map, 'Objects');
    result.forEach((element) => {
      let enemy = this.game.add.existing(new Enemy(
        this.game,
        element.x,
        element.y,
        'enemy',
        50,
        1,
        1
      ));

      this.createBoss(enemies);
      enemies.add(enemy);
      this.game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    }, this);

    return enemies;
  }

  createBoss(group) {
    let result = tiledUtil.findObjectsByType('boss_pos', this.map, 'Objects');

    result.forEach((element) => {
      let enemy = this.game.add.existing(new Enemy(
        this.game,
        element.x,
        element.y,
        'naga',
        50,
        1,
        10
      ));

      group.add(enemy);
      this.game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    }, this);
  }
}
