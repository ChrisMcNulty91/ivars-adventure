/**
 * A base Enemey class
 */
class Enemy extends Phaser.Sprite {
  constructor(game, x, y, sprite) {
    super (game, x, y, sprite);

    this.exists = true;
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this);

    this.body.allowGravity = true;
    this.body.immovable = true;
    this.body.gravity.y = 700;
    this.body.collideWorldBounds = true;

    this.maxHealth = 1;
  }

  /**
   * Local reset method can be overwritten in sub classes
   *
   * @param {Number} x the x position of the sprite
   * @param {Number} y the y position of the sprite
   */
  _reset(x, y) {
    this.reset(x, y);
    this.health = this.maxHealth;
    this.exists = true;
    this.dying = false;
    this.sleeping = true;
  }

  /**
   * Local update method can be overwritten in sub classes
   */
  _update() {
    if (!this.exists) {
      return false;
    }

    if(this.sleeping) {
      return false;
    }

    return true;
  }

  /**
   * Operations to carry out when the sprite is hit by a projectile
   *
   * @param  {Object} bullet The projectile that collides with the sprite
   */
  hit(bullet) {
    this.health -= bullet.damage;

    if (this.health < 1) {
      this.death();
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.body.allowGravity = false;
    }
  }

  death() {
    this.exists = false;
  }
}

export default Enemy;
