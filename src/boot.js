/**
 * Escena de precarga de los recursos del juego.
 */
export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Por ahora reutilizamos el personaje de la plantilla como sprite provisional.
   */
  preload() {
    this.load.image('player', 'assets/sprites/player.png');
  }

  /**
   * Creamos un sprite sencillo para los enemigos mientras se prepara el arte definitivo.
   */
  create() {
    const graphics = this.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0x8d3e32);
    graphics.fillCircle(16, 16, 14);
    graphics.lineStyle(3, 0xe8b67a);
    graphics.strokeCircle(16, 16, 13);
    graphics.generateTexture('enemy', 32, 32);
    graphics.destroy();

    this.scene.start('level');
  }
}
