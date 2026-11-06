/**
 * Enemigo básico que persigue al jugador por la arena.
 */
export default class Enemy extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} scene Escena principal
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.enemies.add(this);

    this.body.setCircle(13, 3, 3);
    this.body.setCollideWorldBounds(true);
    this.health = 2;
    this.speed = Phaser.Math.Between(70, 100);
  }

  /**
   * Resta la vida recibida y comunica la baja a la escena.
   */
  takeHit(damage) {
    if (!this.active) return;
    this.health -= damage;
    if (this.health <= 0) {
      this.scene.enemyDefeated();
      this.destroy();
    } else {
      this.setTint(0xffffff);
      this.scene.time.delayedCall(100, () => {
        if (this.active) this.clearTint();
      });
    }
  }

  /**
   * Persecución directa, sin rutas ni obstáculos.
   * @override
   */
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.scene.isPaused || this.scene.isFinished) {
      this.body.setVelocity(0);
      return;
    }
    this.scene.physics.moveToObject(this, this.scene.player, this.speed);
  }
}
