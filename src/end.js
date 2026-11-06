/**
 * Escena de victoria o derrota. Permite volver a empezar sin recargar la página.
 */
export default class End extends Phaser.Scene {
  constructor() {
    super({ key: 'end' });
  }

  /**
   * Recupera el resultado de la partida anterior.
   */
  init(data) {
    this.result = data;
  }

  /**
   * Muestra el resultado y espera una pulsación para reintentar.
   */
  create() {
    this.cameras.main.setBackgroundColor('#17140f');
    const title = this.result.victory ? '¡VICTORIA!' : 'FIN DE LA PARTIDA';
    this.add.text(500, 210, title, {
      fontFamily: 'Georgia, serif', fontSize: '44px', color: '#f0c96b'
    }).setOrigin(0.5);
    this.add.text(500, 300,
      this.result.message + '\nBajas: ' + this.result.score +
      '  ·  Aura final: ' + this.result.aura + '/100', {
        fontFamily: 'Arial, sans-serif', fontSize: '22px', color: '#f4efe3',
        align: 'center'
      }).setOrigin(0.5);
    this.add.text(500, 420, 'Pulsa cualquier tecla para reintentar', {
      fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#b9ae9b'
    }).setOrigin(0.5);

    // Evitamos reiniciar automáticamente con la tecla que estaba pulsada.
    this.time.delayedCall(500, () => {
      this.input.keyboard.once('keydown', () => this.scene.start('level'));
      this.input.once('pointerdown', () => this.scene.start('level'));
    });
  }
}
