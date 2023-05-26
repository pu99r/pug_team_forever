// Наш герой.
const main2 = require("../../app.js")

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

  async die() {
    this.skin = "💀";
    console.log("YOU ARE DEAD!💀");
    await main2(`${this.name}`, 44);
    process.exit();
  }
}

module.exports = Hero;
