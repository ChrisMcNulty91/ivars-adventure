export default class Preload extends Phaser.State {

  preload() {
    this.load.image( "protoPlayer", "img/proto-player.png" );
    this.loaderBg = this.add.sprite( this.game.world.centerX, this.game.world.centerY, "loaderBg" );
    this.loaderBar = this.add.sprite( this.game.world.centerX, this.game.world.centerY, "loaderBar" );
    this.loaderBg.anchor.setTo( 0.5 );
    this.loaderBar.anchor.setTo( 0.5 );

    this.load.setPreloadSprite( this.loaderBar );    
  }

  create() {
    this.state.start( "Play" );
  }
}
