// Наш герой.

class Hero {
  constructor({ position, boomerang, name }) {
    this.skin = '🤠';
    this.position = position;
    this.boomerang = boomerang;
    this.name = name;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    // Атакуем.
    if (this.boomerang.position + 1 + this.position === this.position) {
      this.boomerang.position = this.position + 1; // Устанавливаем начальную позицию бумеранга
      this.boomerang.fly();
    }
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    console.log(this.name)
    process.exit();
  }
}

module.exports = Hero;
