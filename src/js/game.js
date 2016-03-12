'use strict';
import * as states from './states';

const GAME = new Phaser.Game(600, 960, Phaser.AUTO);

Object.keys(states).forEach(state => GAME.state.add(state, states[state]));

GAME.state.start('Boot');
