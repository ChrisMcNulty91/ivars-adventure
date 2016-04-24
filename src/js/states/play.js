import Ivar from '../prefabs/Ivar';
import tiledUtil from '../utils/tiledUtil';
import Zombie from '../prefabs/Zombie';
import Naga from '../prefabs/Naga';

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

    this.player.spellTome.forEach((spell) => {
      this.game.physics.arcade.collide(this.levelLayer, spell, () => { spell.kill(); }, null, this);
    });

    this.enemies.forEach((enemy) => {
      this.game.physics.arcade.collide(this.levelLayer, enemy);
    });

    this.enemies.forEach(enemy => this.game.physics.arcade.collide(enemy, this.player.spellTome, enemy.hit , null, this));
    this.bosses.forEach(boss => this.game.physics.arcade.collide(this.levelLayer, boss));
    this.bosses.forEach(boss => this.game.physics.arcade.collide(boss, this.player.spellTome, boss.hit , null, this));
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
    this.bosses = this.createBoss();
  }

  createEnemies() {
    let enemies = this.game.add.group();

    let result = tiledUtil.findObjectsByType('enemy_pos', this.map, 'Objects');
    result.forEach((element) => {
      let enemy = this.game.add.existing(new Zombie(
        this.game,
        element.x,
        element.y,
        'enemy',
        50,
        1,
        3
      ));

      enemies.add(enemy);
      this.game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    }, this);

    return enemies;
  }

  createBoss() {
    let boss = this.game.add.group();
    let result = tiledUtil.findObjectsByType('boss_pos', this.map, 'Objects');

    result.forEach((element) => {
      let enemy = this.game.add.existing(new Naga(
        this.game,
        element.x,
        element.y,
        'naga',
        50,
        1,
        10
      ));

      boss.add(enemy);
      this.game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    }, this);

    return boss;
  }
}
