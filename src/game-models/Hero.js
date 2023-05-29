// Наш герой.
const main2 = require("../../app.js")
const sound = require('play-sound')(opts = {});

class Hero {
  constructor({ position, boomerang, name, points = 0}) {
    this.skin = '🐹';
    this.position = position;
    this.boomerang = boomerang;
    this.name = name;
    this.points = points;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
  down() {
    if ( this.position < 30 ) {
      let p = this.position
      this.position = 30 + p
    }
   
  }
  up() {
    if ( this.position > 30 ) {
      this.position -= 31
    }
    
  }

  attack() {
    // Атакуем.
    sound.play("./src/sounds/congratulations.wav", (err) => {
      if (err) throw err;
    })

    if (this.boomerang.position + 1 + this.position === this.position) {
      this.boomerang.position = this.position + 1; // Устанавливаем начальную позицию бумеранга
      this.boomerang.fly();
    }
  }

  async die() {
    this.skin = "💀";
    sound.play("./src/sounds/2588_Gz32eyqr.wav", (err) => {
      if (err) throw err;
    })
    console.log("YOU ARE DEAD!💀");
    await main2(`${this.name}`, `${this.points}`);
    process.exit();
  }
}

module.exports = Hero;
