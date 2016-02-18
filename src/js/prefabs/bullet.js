export default class Bullet extends Phaser.Sprite {

    constructor( { game, x, y, asset, health = 0 } ) {
        super( game, x, y, asset );

        this.anchor.setTo( 0.5 );
        this.health = health;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }
}
