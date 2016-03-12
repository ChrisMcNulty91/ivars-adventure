import spells from '../objects/spells';
import Spell from './Spell.js';

class Ivar extends Phaser.Sprite {
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);

    this.game = game;
    this.anchor.setTo(0.5, 0.5);

    this.attrs = {
      moveSpeed: 100,
      jumpSpeed: -320
    };

    this.spells = spells;
    this.currentSpell = 0;

    this.controls = {
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      jump: game.input.keyboard.addKey(Phaser.Keyboard.W),
      nextSpell: game.input.keyboard.addKey(Phaser.Keyboard.E),
      prevSpell: game.input.keyboard.addKey(Phaser.Keyboard.Q),
      cast: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };

    this.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 700;
    this.body.collideWorldBounds = true;

    this.controls.nextSpell.onDown.add(() => {
      this.getNextSpell();
    }, this);

    this.controls.prevSpell.onDown.add(() => {
      this.getPreviousSpell();
    }, this);

    this.controls.cast.onDown.add(() => {
      this.cast();
    }, this);

    this.game.stage.addChild(this);
    this.game.camera.follow(this);

    this.populateSpellSlots();
  }

  update() {
    this.playerMovement();
  }

  populateSpellSlots() {
    this.spellTome = this.game.add.group();

    let numberOfSlots = 10;

    for (let i = 0; i < numberOfSlots; i++) {
      let spell = this.game.stage.addChild(
        new Spell(this.game, 0, 0, this.spells[this.currentSpell].sprite,
          this.spells[this.currentSpell].damage));

      this.spellTome.add(spell);
      this.game.physics.arcade.enable(spell, Phaser.Physics.ARCADE);
      spell.kill();
    }
  }

  cast() {
    if (this.lastSpellCastAt === undefined) {
      this.lastSpellCastAt = 0;
    }

    if (this.game.time.now - this.lastSpellCastAt < 260) {
      return;
    }

    this.lastSpellCastAt = this.game.time.now;

    let spell = this.spellTome.getFirstDead(false);

    if (spell === null || spell === undefined) {
      return;
    }

    spell.revive();
    spell.reset(this.x, this.y);

    spell.body.velocity.x = 500;
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
  }

  jump() {
    if (this.body.onFloor()) {
      this.body.velocity.y = this.attrs.jumpSpeed;
    }
  }

  getNextSpell() {
    let nextSpell = this.currentSpell + 1;

    if (nextSpell > this.spells.length - 1) {
      this.currentSpell = 0;
    } else {
      this.currentSpell = nextSpell;
    }
  }

  getPreviousSpell() {
    let previousSpell = this.currentSpell - 1;

    if (previousSpell < 0) {
      this.currentSpell = this.spells.length - 1;
    } else {
      this.currentSpell = previousSpell;
    }
  }
}

export default Ivar;
