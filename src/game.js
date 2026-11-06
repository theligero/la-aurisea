import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';

/**
 * Configuración principal de Phaser. La arena se ve completa, sin gravedad ni cámara móvil.
 */
let config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1000,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true,
  backgroundColor: '#17140f',
  scene: [Boot, Level, End],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

new Phaser.Game(config);
