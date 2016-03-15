'use strict';
import Enemy from '../prefabs/Enemy';

const TiledUtil = {};
/**
 * Loops through a given tilemaps layer and adds all objects with a given identifier
 *
 * @method findObjectsByType
 * @param  {String} key   The object key defined in Tiled
 * @param  {Object} map   The imported tilemap object
 * @param  {String} layer The layer identifier defined in Tiled
 * @return {Object|Array} The array of objects found in the map
 */
TiledUtil.findObjectsByType = (key, map, layer) => {
  let result = [];

  map.objects[layer].map(function(object) {
    if (object.properties.type === key) {
      this.push(object);
    }
  }, result);

  return result;
};

/**
 * Creates a sprite object returned from Tiled and adds it to it's associated group
 *
 * @param  {Object} object The object returned from Tiled that is used to create a sprite
 * @param  {Object} group  The Phaser.Group that the sprite belongs to
 */
TiledUtil.createFromTiledObject = (object, group) => {
  let sprite = group.add(object.x, object.y, object.properties.sprite);

  object.properties.map(function(key) {
    sprite[key] = object.properties[key];
  });
};

export default TiledUtil;
