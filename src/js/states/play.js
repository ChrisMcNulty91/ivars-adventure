import Player from "../prefabs/player";
import Enemy from "../prefabs/enemy";

export default class Play extends Phaser.State {

  create() {
    this.player = new Player( {
      game: this.game,
      x: 50,
      y: 150,
      asset: "protoPlayer"
    } );

    this.game.stage.addChild( this.player );
    this.game.camera.follow( this.player );
  }

  update() {

  }
}
