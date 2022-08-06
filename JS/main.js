import MyGAME from "./Game.js";

const Game = new MyGAME();

window.addEventListener("keydown", (event) => {
  if (Game.Menu.gameOvered) return;
  const keydown = event.key;
  if (keydown === "n") Game.Snake.spawNewTarget();
  else if (keydown === "e") Game.Snake.eatTarget();
  else if (keydown === "z") Game.Menu.scoreUp();
  else if (keydown === "x") Game.Menu.sizeUp();
  else if (keydown === "f") {
    const id = prompt("Id:");
    console.log(Game.Snake.Head.findChildById(Number(id)));
  }

  if (keydown === "a") Game.Snake.append();
  if (keydown === "r") location.reload(true);

  if (keydown === "s") {
    if (!Game.run) Game.startGame();
    else if (Game.run) Game.stopGame();
  }
  if (keydown === "0") {
    setTimeout(() => {
      Game.startGame();
    }, 1000);
  }
  Game.setRunSide(keydown);
});
