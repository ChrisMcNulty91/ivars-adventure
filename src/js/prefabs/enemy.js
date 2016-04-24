/**
 * A base Enemey class
 */
class Enemy extends Phaser.Sprite {
  constructor(game, x, y, sprite, speed, direction) {
    super (game, x, y, sprite, speed, direction);

    this.speed = 1 * speed;
    this.exists = true;
    this.anchor.setTo(0.5, 1);
    this.game.physics.enable(this);

    this.body.allowGravity = true;
    this.body.gravity.y = 700;
    this.body.collideWorldBounds = true;

    this.maxHealth = 1;
    this.maxLength = this.x + 32 * 4;
    this.startX = this.x;
  }

  update() {
    if (this.body.x >= this.maxLength) {
      this.hasHitEnd = true;
    } else if (this.body.x <= this.startX) {
      this.hasHitEnd = false;
    }

    this.enemeyMovement(this.hasHitEnd);
  }

  enemeyMovement(hasHitEnd) {

    if (!hasHitEnd) {
      this.body.velocity.x = this.speed;
      this.flipDirection(1);
    } else if (hasHitEnd) {
      this.body.velocity.x = -this.speed;
      this.flipDirection(-1);
    }
  }

  flipDirection(direction) {
    this.scale.x = direction;
  }

  /**
   * Local reset method can be overwritten in sub classes
   *
   * @param {Number} x the x position of the sprite
   * @param {Number} y the y position of the sprite
   */
  // _reset(x, y) {
  //   this.reset(x, y);
  //   this.health = this.maxHealth;
  //   this.exists = true;
  //   this.dying = false;
  //   this.sleeping = true;
  // }

  /**
   * Local update method can be overwritten in sub classes
   */
  // _update() {
  //   if (!this.exists) {
  //     return false;
  //   }
  //
  //   if(this.sleeping) {
  //     return false;
  //   }
  //
  //   return true;
  // }

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
