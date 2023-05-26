const { User } = require("./db/models");

async function addUser(name, score) {
  try {
    const result = await User.create({
      name: `${name}`,
      points: `${score}`,
    });
  } catch (e) {
    console.log(e);
  }
}
async function main(user, score) {
  const players = await User.findAll({
    raw: true,
  });
  if (players.length == 0) {
    await addUser(user, score);
  } else {
    let found = players.find((e) => e.name === user);
    if (found == undefined) {
      await addUser(user, score);
    } else {
      const playy = await User.findOne({ where: { name: `${user}` } });
      if (playy.points < score) {
        playy.points = score;
        await playy.save();
      }
    }
  }
  const playersnew = await User.findAll({
    raw: true,
    order: [["points", "DESC"]],
  });
  console.log("YOU ARE DEAD!💀"+"\n");
  for (let i = 0; i < playersnew.length; i++) {
    console.log(`${playersnew[i].name}` + " - " + `${playersnew[i].points}`);
  }
  console.log("\n");
}
main("КАтя", 100)
module.exports = main;