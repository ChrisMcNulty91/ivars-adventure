export default class Spell extends Phaser.Sprite {

  constructor({game, x, y, asset, damage}) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5, 0.5);
    this.damage = damage;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }
}
