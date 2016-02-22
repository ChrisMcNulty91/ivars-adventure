import Bullet from './bullet.js';

export default class Dredd extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset, 0);

    let self = this;
    this.game = game;
    this.anchor.setTo(0.5, 0.5);

    this.attrs = {
      moveSpeed: 200,
      jumpSpeed: -320
    };

    this.FIRING_MODES = [
      "standard",
      "ap",
      "ricochet",
      "hi-ex",
      "hotshot",
      "rapid",
    ];

    this.currentFiringMode = 0;

    this.controls = {
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      jump: game.input.keyboard.addKey(Phaser.Keyboard.W),
      nextMode: game.input.keyboard.addKey(Phaser.Keyboard.E),
      prevMode: game.input.keyboard.addKey(Phaser.Keyboard.Q),
      fire: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }

    this.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 700;
    this.body.collideWorldBounds = true;

    this.controls.nextMode.onDown.add(() => {
      self.getNextFiringMode();
    }, this);

    this.controls.prevMode.onDown.add(() => {
      self.getPreviousFiringMode();
    }, this);

    this.controls.fire.onDown.add(() => {
      self.fire();
    }, this);

    this.populateBulletPool();

    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2;
  }

  update() {
    this.playerMovement();
  }

  populateBulletPool() {
    let numberOfBullets = 0;
    this.bulletClip = this.game.add.group();

    switch (this.currentFiringMode) {
      case 0: numberOfBullets = 1; break;
      case 1: numberOfBullets = 1; break;
      case 2: numberOfBullets = 1; break;
      case 3: numberOfBullets = 1; break;
      case 4: numberOfBullets = 1; break;
      case 5: numberOfBullets = 3; break;
    }

    for (let i = 0; i < numberOfBullets; i++) {

      //TODO determine the damage dealt and ammo cost based on firing mode
      let bullet = this.game.stage.addChild(new Bullet({
        game: this.game,
        x: 0,
        y: 0,
        asset: "protoPlayer"
      }));

      this.bulletClip.add(bullet);
      bullet.anchor.setTo(0.5, 0.5);
      this.game.physics.arcade.enable(bullet, Phaser.Physics.ARCADE);
      bullet.kill();
    }
  }

  standardExecution() {
    if (this.lastBulletShotAt === undefined) {
      this.lastBulletShotAt = 0;
    }

    if (this.game.time.now - this.lastBulletShotAt < 260) {
      return;
    }

    this.lastBulletShotAt = this.game.time.now;

    var bullet = this.bulletClip.getFirstDead(false);

    if (bullet === null || bullet === undefined) {
      return;
    }

    bullet.revive();
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;
    bullet.reset(this.x, this.y);
    bullet.rotation = this.rotation;

    bullet.body.velocity.x = Math.cos(bullet.rotation) * 500;
    bullet.body.velocity.y = Math.sin(bullet.rotation) * 500;
  }

  playerMovement() {
    if (this.controls.left.isDown) {
      this.body.velocity.x = -this.attrs.moveSpeed;
    } else if (this.controls.right.isDown) {
      this.body.velocity.x = this.attrs.moveSpeed;
    } else {
      this.body.velocity.x = 0;
    }

    if (this.controls.jump.isDown) {
      this.jump();
    }

    this.rotation = this.game.physics.arcade.angleToPointer(this);
  }

  jump() {
    if (this.body.onFloor()) {
      this.body.velocity.y = this.attrs.jumpSpeed;
    }
  }

  fire() {
    this.standardExecution();
  }

  getNextFiringMode() {
    let nextMode = this.currentFiringMode + 1;

    if (nextMode > this.FIRING_MODES.length - 1) {
      this.currentFiringMode = 0;
    } else {
      this.currentFiringMode = nextMode;
    }
  }

  getPreviousFiringMode() {
    let previousMode = this.currentFiringMode - 1;

    if (previousMode < 0) {
      this.currentFiringMode = 5;
    } else {
      this.currentFiringMode = previousMode;
    }
  }
}
