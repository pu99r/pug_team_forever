// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const sound = require('play-sound')((opts = {}));
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const readlineSync = require('readline-sync');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.
let userName;
class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({
      position: 0,
      boomerang: this.boomerang,
      name: userName,
    });
    this.enemy = new Enemy(trackLength);
    this.view = new View(this);
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength * 2).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin; // Добавьте эту строку
    if (
      this.hero.boomerang.position >= 0 &&
      this.hero.boomerang.position < this.trackLength
    ) {
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  play() {
    sound.play('./src/sounds/fonsound.wav', (err) => {
      if (err) throw err;
    });
    function registratePlayer() {
      let playerName = readlineSync.question(
        'Здравствуйте! Введите ваше имя: '
      );
      process.stdin.resume();
      if (!playerName) {
        playerName = 'Player';
      }
      return playerName;
    }
    this.hero.name = registratePlayer();
    setInterval(() => {
      // Let's play!
      this.handleCollisions();
      this.regenerateTrack();

      // Добавьте логику движения врагов, например, двигаться влево
      this.enemy.moveLeft();

      // Если враг достиг края трека, перемещаем его в начало
      if (this.enemy.position < 0) {
        this.enemy.die();
        this.enemy = new Enemy(this.trackLength);
      }

      if (this.hero.position < 0) {
        this.hero.position = 0;
      }

      this.view.render(this.track);
    }, 100); // Вы можете настроить частоту обновления игрового цикла
  }

  handleCollisions() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }

    if (
      this.boomerang.position == this.enemy.position ||
      this.boomerang.position == this.enemy.position + 1
    ) {
      sound.play('./src/sounds/die.wav', (err) => {
        if (err) throw err;
      });
      this.enemy.die();

      this.hero.points += 1;
      console.log(this.hero.playerName);
      // Обнуляем позицию бумеранга после столкновения с врагом
      // this.boomerang.position = -1;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}

module.exports = Game;
