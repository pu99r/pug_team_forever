// Сделаем отдельный класс для отображения игры в консоли.

class View {
  constructor(game) {
    this.game = game;
  }

  render() {
    const yourTeamName = 'mad_pugs';

    // Тут всё рисуем.
    console.clear();
    let p1 = this.game.track.slice(0, 30).join('');
    let p2 = this.game.track.slice(30, 60);
    let p3 = [...p2];
    for (let i = 0; i < 5; i++) {
      p3.pop('');
    }
    p3.unshift('┃');
    p3.push('🐭🐹🐹 ┃');
    console.log(p1);
    console.log(p3.join(''));
    console.log(
      '\x1b[32m',
      `${this.game.hero.name} points: ${this.game.hero.points}`,
      '\x1b[0m'
    );
    console.log('\n\n');
    console.log(
      '\x1b[35m',
      `Created by "${yourTeamName}" with love`,
      '\x1b[0m'
    );
  }
}

module.exports = View;
