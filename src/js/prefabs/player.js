import Bullet from "./bullet";

export default class Player extends Phaser.Sprite {
  constructor( { game, x, y, asset } ) {
    super( game, x, y, asset, 0 );

    //Reference to "this" needed for event object
	  let self = this;

    this.game = game;
    this.anchor.setTo( 0.5 );

    this.SHOT_DELAY = 100;
    this.BULLET_SPEED = 500;
    this.NUMBER_OF_BULLETS = 1;
    this.ACCELERATION = 800;
    this.JUMP_SPEED = -800;

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
    // const GRAVITY = 2600;

    this.game.physics.arcade.enable( this, Phaser.Physics.ARCADE );
    // this.game.physics.arcade.gravity.y = GRAVITY;

    this.body.collideWorldBounds = true;
    this.body.maxVelocity.setTo( MAX_SPEED, MAX_SPEED * 10 );
    this.body.drag.setTo( DRAG, 0 );

    var nextKey = this.game.input.keyboard.addKey( Phaser.Keyboard.E );
    var prevKey = this.game.input.keyboard.addKey( Phaser.Keyboard.Q );
    var fireKey = this.game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );


    this.populateBulletPool();

    nextKey.onDown.add( function() {
      self.getNextFiringMode();
    }, this );

    prevKey.onDown.add( function() {
      self.getPreviousFiringMode();
    }, this );

  }

  populateBulletPool() {
    this.bulletPool = this.game.add.group();

    for ( let i = 0; i < this.NUMBER_OF_BULLETS; i++ ) {

      let bullet = this.game.add.sprite( new Bullet( {
        game: this.game,
        x: 0,
        y: 0,
        asset: "bullet"
      } ) );

      this.bulletPool.add( bullet );
      bullet.anchor.setTo( 0.5, 0.5 );
      this.game.physics.arcade.enable( bullet, Phaser.Physics.ARCADE );
      bullet.kill();
    }
  }

  /**
   * Normal Fire mode
   */
  standardExecution() {
    if ( this.lastBulletShotAt === undefined ) this.lastBulletShotAt = 0;

    if ( this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY ) return;

    this.lastBulletShotAt = this.game.time.now;
    let bullet = this.bulletPool.getFirstDead();

    if ( bullet === null || bullet === undefined ) return;

    bullet.revive();
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;
    bullet.reset( this.x + 10, this.y );
    bullet.body.velocity.x = this.BULLET_SPEED;
  }

  update() {

    if ( this.game.input.keyboard.isDown( Phaser.Keyboard.A ) ) {
      this.body.acceleration.x = -this.ACCELERATION;
    } else if ( this.game.input.keyboard.isDown( Phaser.Keyboard.D ) ) {
      this.body.acceleration.x = this.ACCELERATION;
    } else {
      this.body.acceleration.x = 0;
    }

    if ( this.game.input.keyboard.downDuration( Phaser.Keyboard.W, 150 ) ) {
      if ( this.body.onFloor() ) {
        this.body.velocity.y = this.JUMP_SPEED;
      }
    }

    if ( this.game.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR ) ) {
      this.fire();
    }
  }

  fire() {
    this.standardExecution();
    console.log( "Firing: [" + this.FIRING_MODES[ this.currentFiringMode ] + "]" );
  }

  getNextFiringMode() {
    let nextMode = this.currentFiringMode + 1;

    if ( nextMode > this.FIRING_MODES.length - 1 ) {
      this.currentFiringMode = 0;
    } else {
      this.currentFiringMode = nextMode;
    }
  }

  getPreviousFiringMode() {
    let previousMode = this.currentFiringMode - 1;

    if ( previousMode < 0 ) {
      this.currentFiringMode = 5;
    } else {
      this.currentFiringMode = previousMode;
    }
  }
}
