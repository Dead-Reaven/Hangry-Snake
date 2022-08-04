import Snake_ from "./snake.js";
import Score from "./menu.js";
// to get additional info, look at configData.txt

class Game {
  runSide = "right";
  run = false;
  distanseMove = 4; // px
  interval = 17; // millisec
  defaultAppend = 5; // objects appends in tail when target Destroyed
  // difficult midle+
  
  constructor() {
    this.Menu = new Score();
    this.Snake = new Snake_(this.defaultAppend, this.distanseMove, this.interval);
  }

  startGame = () => {
    console.log("Run");
    this.run = true;
    this.runGame();
  };

  stopGame = () => {
    console.log("Stop");
    this.run = false;
  };

  gameOvered = false;
  gameOver() {
    const messageHTML = document.createElement("button");
    messageHTML.setAttribute("class", "restart-btn");
    messageHTML.setAttribute("onclick", "location.reload(true)");
    document.getElementById("menu").appendChild(messageHTML);
    this.Snake.Head.stopMove();

    this.gameOvered = true;
  }

  targetDestroyed = () => {
    this.Menu.scoreUp();
    this.Menu.sizeUp(this.defaultAppend);
    this.Snake.Head.move(this.runSide);
  };

  outOfArea = () => {
    this.run = false;
    this.gameOver();
  };

  selfDestroyed() {
    this.run = false;
    this.gameOver();
  }

  runGame() {
    var interval = setInterval(() => {
      if (!this.run) clearInterval(interval);
      const resultMove = this.Snake.runSnake(this.runSide);
      if (resultMove === "continue") return;
      if (resultMove === "targetDestroyed") this.targetDestroyed();
      if (resultMove === "selfDestroyed" || resultMove === "outOfArea") {
        this[resultMove]();
        clearInterval(interval);
      }
    }, this.interval);
  }

  setRunSide(event = this.runSide) {
    // определяет в какую сторону идти

    if (event === "ArrowRight" && this.runSide != "left")
      this.runSide = "right";
    else if (event === "ArrowLeft" && this.runSide != "right")
      this.runSide = "left";
    else if (event === "ArrowUp" && this.runSide != "down") this.runSide = "up";
    else if (event === "ArrowDown" && this.runSide != "up")
      this.runSide = "down";
  }
}

export default Game;
