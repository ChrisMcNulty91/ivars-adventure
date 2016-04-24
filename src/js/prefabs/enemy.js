/**
 * A base Enemey class
 */
class Enemy extends Phaser.Sprite {
  constructor(game, x, y, sprite, speed, direction, health) {
    super (game, x, y, sprite, speed, direction, health);

    this.speed = 1 * speed;
    this.exists = true;
    this.anchor.setTo(0.5, 1);
    this.game.physics.enable(this);

    this.body.allowGravity = true;
    this.body.gravity.y = 700;
    this.body.collideWorldBounds = true;

    this.maxHealth = health;
    this.pathLength = this.x + 32 * 4;
    this.startX = this.x;
  }

  update() {}

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
   * Operations to carry out when the sprite is hit by a projectile
   *
   * @param  {Object} bullet The projectile that collides with the sprite
   */
  hit(enemy, spell) {
    this.game.sound.play('hit');
    enemy.maxHealth -= spell.damage;

    if (enemy.maxHealth < 1) {
      enemy.death();
      enemy.body.velocity.x = 0;
      enemy.body.velocity.y = 0;
      enemy.body.allowGravity = false;
    }

    spell.kill();
  }

  death() {
    this.exists = false;
  }
}

export default Enemy;
