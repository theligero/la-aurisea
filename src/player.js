/**
 * Odiseo: movimiento en ocho direcciones, vida, aura y arma equipada.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setScale(0.7);
    this.body.setCircle(25, 7, 7);
    this.body.setCollideWorldBounds(true);

    this.speed = 250;
    this.health = 100;
    this.aura = 0;
    this.weapon = 'espada';
    this.lastAttack = -1000;
    this.invulnerableUntil = 0;

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys('W,A,S,D');
    this.direction = new Phaser.Math.Vector2();
  }

  /**
   * Cambia de arma cuando se pulsa 1, 2 o 3.
   */
  selectWeapon(weapon) {
    this.weapon = weapon;
    this.scene.updateHUD();
  }

  /**
   * Ejecuta el ataque si ha transcurrido el tiempo de reutilización.
   */
  attack(pointer) {
    const cooldowns = { espada: 300, lanza: 600, arco: 450 };
    if (this.scene.isPaused || this.scene.isFinished ||
        this.scene.time.now - this.lastAttack < cooldowns[this.weapon]) return;

    this.lastAttack = this.scene.time.now;
    const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
    this.scene.attack(this.weapon, this.x, this.y, angle);
  }

  /**
   * Recibe daño y evita impactos consecutivos durante un breve intervalo.
   */
  takeDamage(amount) {
    if (this.scene.time.now < this.invulnerableUntil || this.scene.isFinished) return;

    this.health = Math.max(0, this.health - amount);
    this.aura = Math.max(0, this.aura - 8);
    this.invulnerableUntil = this.scene.time.now + 900;
    this.setTint(0xff7777);
    this.setAlpha(0.65);
    this.scene.time.delayedCall(180, () => {
      if (this.active) this.clearTint();
    });
    this.scene.time.delayedCall(900, () => {
      if (this.active) this.setAlpha(1);
    });
    this.scene.updateHUD();

    if (this.health === 0) this.scene.finish(false, 'Odiseo ha caído en combate');
  }

  /**
   * Mueve al personaje sin saltos y normaliza las diagonales.
   * @override
   */
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.scene.isPaused || this.scene.isFinished) {
      this.body.setVelocity(0);
      return;
    }

    const left = this.cursors.left.isDown || this.wasd.A.isDown;
    const right = this.cursors.right.isDown || this.wasd.D.isDown;
    const up = this.cursors.up.isDown || this.wasd.W.isDown;
    const down = this.cursors.down.isDown || this.wasd.S.isDown;

    this.direction.set(Number(right) - Number(left), Number(down) - Number(up));
    this.direction.normalize().scale(this.speed);
    this.body.setVelocity(this.direction.x, this.direction.y);

    // El sprite provisional mira hacia la posición del ratón.
    const pointer = this.scene.input.activePointer;
    this.rotation = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y) - Math.PI / 2;
  }
}
