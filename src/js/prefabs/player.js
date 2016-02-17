import Bullet from "./bullet";

export default class Player extends Phaser.Sprite {
  constructor( { game, x, y, asset } ) {
    super( game, x, y, asset, 0 );

    this.game = game;
    this.anchor.setTo( 0.5 );
    this.ACCELERATION = 800;
    this.JUMP_SPEED = -1000;
	  this.FIRING_MODES = [
      "standard",
      "rapid",
      "hi-ex",
      "ricochet",
      "hotshot",
      "ap"
    ];

    this.currentFiringMode = 0;

    this.game.input.keyboard.addKeyCapture( [
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN
    ] );

    const MAX_SPEED = 500;
    const DRAG = 600;
    const GRAVITY = 2600;

    this.game.physics.arcade.enable( this, Phaser.Physics.ARCADE );
    this.game.physics.arcade.gravity.y = GRAVITY;

    this.body.collideWorldBounds = true;
    this.body.maxVelocity.setTo( MAX_SPEED, MAX_SPEED * 10 );
    this.body.drag.setTo( DRAG, 0 );

    var nextKey = this.game.input.keyboard.addKey( Phaser.Keyboard.D );
    var prevKey = this.game.input.keyboard.addKey( Phaser.Keyboard.A );

	  let self = this;

    nextKey.onDown.add( function() {
      self.getNextFiringMode();
    }, this );

    prevKey.onDown.add( function() {
      self.getPreviousFiringMode();
    }, this );
  }

  update() {

    if ( this.game.input.keyboard.isDown( Phaser.Keyboard.LEFT ) ) {
      this.body.acceleration.x = -this.ACCELERATION;
    } else if ( this.game.input.keyboard.isDown( Phaser.Keyboard.RIGHT ) ) {
      this.body.acceleration.x = this.ACCELERATION;
    } else {
      this.body.acceleration.x = 0;
    }

    if ( this.game.input.keyboard.isDown( Phaser.Keyboard.UP ) ) {
      if ( this.body.onFloor() ) {
        this.body.velocity.y = this.JUMP_SPEED;
      }
    }
  }

  getNextFiringMode() {
    let nextMode = this.currentFiringMode + 1;

    if ( nextMode > this.FIRING_MODES.length - 1 ) {
      this.currentFiringMode = 0;
    } else {
      this.currentFiringMode = nextMode;
    }

    this.displayMode( this.currentFiringMode );
  }

  getPreviousFiringMode() {
    let previousMode = this.currentFiringMode - 1;

    if ( previousMode < 0 ) {
      this.currentFiringMode = 5;
    } else {
      this.currentFiringMode = previousMode;
    }

    this.displayMode( this.currentFiringMode );
  }

  displayMode( index ) {
    console.log( "FiringMode: [" + this.FIRING_MODES[ index ] + "]" );
  }
}
