import Enemey from './Enemy.js';

class Zombie extends Enemey {
  constructor(game, x, y, sprite, speed, direction, health) {
    super(game, x, y, sprite, speed, direction, health);

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

  update() {
    super.update();
    if (this.body.x >= this.pathLength) {
      this.hasHitEnd = true;
    } else if (this.body.x <= this.startX) {
      this.hasHitEnd = false;
    }

    super.enemeyMovement(this.hasHitEnd);
  }
}

export default Zombie;
