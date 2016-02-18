import Player from "../prefabs/player";
import Enemy from "../prefabs/enemy";

export default class Play extends Phaser.State {

  create() {
    this.createWorld();

    let playerResult = this.findObjectsByType( "player_pos", this.map, 'Objects' );

    this.player = new Player( {
      game: this.game,
      x: playerResult[ 0 ].x,
      y: playerResult[ 0 ].y,
      asset: "protoPlayer"
    } );

    this.game.stage.addChild( this.player );
    this.game.camera.follow( this.player );

  }

  update() {
    this.game.physics.arcade.collide( this.player, this.levelLayer );
    this.game.physics.arcade.collide( this.enemies, this.levelLayer );
    this.game.physics.arcade.collide( this.player, this.enemies );
  };

  createWorld() {
    this.map = this.game.add.tilemap( "level1" );
    this.map.addTilesetImage( "level", "level" );

    this.backgroundLayer = this.map.createLayer( "Background" );
    this.levelLayer = this.map.createLayer( "Level" );


    this.map.setCollisionBetween( 1, 2000, true, this.levelLayer );
    this.levelLayer.resizeWorld();

    this.createEnemies();
  }

  createEnemies() {
    this.enemies = this.game.add.physicsGroup();
    this.enemies.enableBody = true;
    var item;

    let result = this.findObjectsByType( "enemy", this.map, "Objects" );
    result.forEach( ( element ) => {
      this.createFromTiledObject( element, this.enemies );
    }, this );

  }

  findObjectsByType( type, map, layer ) {
    let result = new Array();
    map.objects[ layer ].forEach( (element ) => {
      if ( element.properties.type === type ) {
        result.push( element );
      }
    } );
    return result;
  }

  createFromTiledObject( element, group ) {
    let sprite = group.create( element.x, element.y, element.properties.sprite );

    Object.keys( element.properties ).forEach( ( key ) => {
      sprite[ key ] = element.properties[ key ];
    } );
  }
}
