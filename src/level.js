import Player from './player.js';
import Enemy from './enemy.js';

// Primera arena de pruebas: las demás fases del GDD se incorporarán después.
const ARENA = { left: 30, right: 970, top: 90, bottom: 530 };
const DURATION = 45000;
const REQUIRED_AURA = 40;

/**
 * Escena principal: arena cenital, enemigos básicos y tres ataques provisionales.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Prepara los elementos y controles de la partida.
   */
  create() {
    this.isPaused = false;
    this.isFinished = false;
    this.remainingTime = DURATION;
    this.score = 0;

    this.drawArena();
    this.physics.world.setBounds(ARENA.left, ARENA.top,
      ARENA.right - ARENA.left, ARENA.bottom - ARENA.top);

    this.enemies = this.physics.add.group();
    this.arrows = this.physics.add.group();
    this.player = new Player(this, 500, 310);

    this.physics.add.overlap(this.player, this.enemies, () => {
      this.player.takeDamage(12);
    });
    this.physics.add.overlap(this.arrows, this.enemies, (arrow, enemy) => {
      if (!arrow.active || !enemy.active) return;
      arrow.destroy();
      enemy.takeHit(2);
    });

    this.makeHUD();
    this.updateHUD();
    this.keys = this.input.keyboard.addKeys({
      espada: Phaser.Input.Keyboard.KeyCodes.ONE,
      lanza: Phaser.Input.Keyboard.KeyCodes.TWO,
      arco: Phaser.Input.Keyboard.KeyCodes.THREE,
      pausa: Phaser.Input.Keyboard.KeyCodes.ESC
    });
    this.input.on('pointerdown', pointer => {
      if (pointer.leftButtonDown()) this.player.attack(pointer);
    });

    this.spawnEnemy();
    this.spawnTimer = this.time.addEvent({
      delay: 1700,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    });
  }

  /**
   * Dibuja un suelo provisional sin las plataformas del proyecto anterior.
   */
  drawArena() {
    const ground = this.add.graphics();
    ground.fillStyle(0x27271f);
    ground.fillRect(ARENA.left, ARENA.top,
      ARENA.right - ARENA.left, ARENA.bottom - ARENA.top);
    ground.lineStyle(1, 0x514a37, 0.35);
    for (let x = ARENA.left + 40; x < ARENA.right; x += 40)
      ground.lineBetween(x, ARENA.top, x, ARENA.bottom);
    for (let y = ARENA.top + 40; y < ARENA.bottom; y += 40)
      ground.lineBetween(ARENA.left, y, ARENA.right, y);
    ground.lineStyle(4, 0xa78a56);
    ground.strokeRect(ARENA.left, ARENA.top,
      ARENA.right - ARENA.left, ARENA.bottom - ARENA.top);

    this.add.text(500, 61, 'TROYA · LAS ÚLTIMAS LLAMAS', {
      fontFamily: 'Georgia, serif', fontSize: '20px', color: '#e8c382'
    }).setOrigin(0.5);
  }

  /**
   * Genera enemigos desde alguno de los cuatro lados de la arena.
   */
  spawnEnemy() {
    if (this.isPaused || this.isFinished) return;

    // Probamos varias posiciones para no crear enemigos junto a Odiseo.
    for (let attempt = 0; attempt < 12; attempt++) {
      const side = Phaser.Math.Between(0, 3);
      const x = Phaser.Math.Between(ARENA.left + 20, ARENA.right - 20);
      const y = Phaser.Math.Between(ARENA.top + 20, ARENA.bottom - 20);
      const positions = [
        [ARENA.left + 20, y], [ARENA.right - 20, y],
        [x, ARENA.top + 20], [x, ARENA.bottom - 20]
      ];
      const [spawnX, spawnY] = positions[side];
      if (Phaser.Math.Distance.Between(spawnX, spawnY, this.player.x, this.player.y) > 170) {
        new Enemy(this, spawnX, spawnY);
        return;
      }
    }
  }

  /**
   * Aplica el tipo de ataque según el arma equipada.
   */
  attack(weapon, x, y, angle) {
    if (weapon === 'arco') {
      const arrow = this.add.rectangle(x, y, 18, 5, 0xf0c96b);
      arrow.setRotation(angle);
      this.physics.add.existing(arrow);
      this.arrows.add(arrow);
      arrow.body.setVelocity(Math.cos(angle) * 560, Math.sin(angle) * 560);
      return;
    }

    const isSword = weapon === 'espada';
    const range = isSword ? 78 : 148;
    const halfAngle = isSword ? Math.PI / 3 : Math.PI / 11;
    const damage = isSword ? 1 : 2;

    this.enemies.getChildren().slice().forEach(enemy => {
      if (!enemy.active) return;
      const distance = Phaser.Math.Distance.Between(x, y, enemy.x, enemy.y);
      const direction = Phaser.Math.Angle.Between(x, y, enemy.x, enemy.y);
      if (distance <= range && Math.abs(Phaser.Math.Angle.Wrap(direction - angle)) <= halfAngle)
        enemy.takeHit(damage);
    });

    // Pequeño efecto visual de golpe, sin animaciones definitivas.
    const effect = this.add.graphics();
    effect.lineStyle(isSword ? 5 : 3, isSword ? 0xe8bb70 : 0xd0d9dc);
    if (isSword) {
      effect.beginPath();
      effect.arc(x, y, range, angle - halfAngle, angle + halfAngle);
      effect.strokePath();
    } else {
      effect.lineBetween(x, y, x + Math.cos(angle) * range, y + Math.sin(angle) * range);
    }
    this.time.delayedCall(110, () => effect.destroy());
  }

  /**
   * Incrementa la puntuación y el aura cuando muere un enemigo.
   */
  enemyDefeated() {
    this.score++;
    this.player.aura = Math.min(100, this.player.aura + 10);
    this.updateHUD();
  }

  /**
   * Crea los indicadores mínimos de vida, aura, tiempo y arma actual.
   */
  makeHUD() {
    this.hudBars = this.add.graphics().setDepth(10);
    const style = { fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#f4efe3' };
    this.healthText = this.add.text(30, 10, '', style).setDepth(10);
    this.auraText = this.add.text(30, 39, '', style).setDepth(10);
    this.scoreText = this.add.text(500, 12, '', style).setOrigin(0.5, 0).setDepth(10);
    this.timerText = this.add.text(970, 12, '', style).setOrigin(1, 0).setDepth(10);
    this.weaponText = this.add.text(500, 557, '', style).setOrigin(0.5).setDepth(10);
    this.pauseText = this.add.text(500, 305, 'PAUSA\nPulsa ESC para continuar', {
      fontFamily: 'Arial, sans-serif', fontSize: '32px', align: 'center',
      color: '#f0c96b', backgroundColor: '#17140f'
    }).setOrigin(0.5).setDepth(20).setVisible(false);
  }

  /**
   * Actualiza el HUD a partir de los valores de la partida.
   */
  updateHUD() {
    this.hudBars.clear();
    this.hudBars.fillStyle(0x4b382c).fillRect(99, 17, 145, 12);
    this.hudBars.fillStyle(0xc8574c).fillRect(99, 17, 145 * this.player.health / 100, 12);
    this.hudBars.fillStyle(0x4b382c).fillRect(99, 46, 145, 12);
    this.hudBars.fillStyle(0xd7a84f).fillRect(99, 46, 145 * this.player.aura / 100, 12);
    this.healthText.setText('Vida');
    this.auraText.setText('Aura');
    this.scoreText.setText('Bajas: ' + this.score);
    this.timerText.setText('Tiempo: ' + Math.ceil(this.remainingTime / 1000) + ' s');
    const names = { espada: 'Espada', lanza: 'Lanza', arco: 'Arco (∞)' };
    this.weaponText.setText('Arma: ' + names[this.player.weapon] + '  ·  [1] [2] [3]');
  }

  /**
   * Congela el movimiento y el tiempo, manteniendo los controles activos.
   */
  togglePause() {
    this.isPaused = !this.isPaused;
    this.pauseText.setVisible(this.isPaused);
    this.spawnTimer.paused = this.isPaused;
    if (this.isPaused) this.physics.world.pause();
    else this.physics.world.resume();
  }

  /**
   * Termina la partida al agotar la vida o cumplir el tiempo de prueba.
   */
  finish(victory, message) {
    if (this.isFinished) return;
    this.isFinished = true;
    this.scene.start('end', { victory, message, score: this.score, aura: this.player.aura });
  }

  /**
   * Controles, temporizador y limpieza de los proyectiles que salen de la arena.
   * @override
   */
  update(time, delta) {
    if (Phaser.Input.Keyboard.JustDown(this.keys.pausa)) this.togglePause();
    if (this.isPaused || this.isFinished) return;
    if (Phaser.Input.Keyboard.JustDown(this.keys.espada)) this.player.selectWeapon('espada');
    if (Phaser.Input.Keyboard.JustDown(this.keys.lanza)) this.player.selectWeapon('lanza');
    if (Phaser.Input.Keyboard.JustDown(this.keys.arco)) this.player.selectWeapon('arco');

    this.remainingTime = Math.max(0, this.remainingTime - delta);
    this.timerText.setText('Tiempo: ' + Math.ceil(this.remainingTime / 1000) + ' s');
    if (this.remainingTime === 0) {
      const victory = this.player.aura >= REQUIRED_AURA;
      this.finish(victory, victory ? '¡Has sobrevivido en Troya!' :
        'No has reunido el aura suficiente (' + REQUIRED_AURA + ')');
      return;
    }

    this.arrows.getChildren().slice().forEach(arrow => {
      if (arrow.x < ARENA.left || arrow.x > ARENA.right ||
          arrow.y < ARENA.top || arrow.y > ARENA.bottom) arrow.destroy();
    });
  }
}
