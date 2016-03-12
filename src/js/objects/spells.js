'use strict';

const spells = [];

let base = {
  name: 'base',
  damage: 1,
  sprite: 'bullet'
};

let ice = {
  name: 'ice',
  damage: 1,
  sprite: 'bullet'
};

let fire = {
  name: 'fire',
  damage: 3,
  sprite: 'bullet'
};

spells.push(base, ice, fire);

export default spells;
