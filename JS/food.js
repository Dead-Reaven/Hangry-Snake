import getGameArea from "./getPlayArea.js";
import { getObject, setPosition } from "./getObject.js";

class Food {
  constructor() {
    this.html = null;
    this.width = document.getElementById(0).offsetWidth;
    this.height = document.getElementById(0).offsetHeight;
    const gameArea = { ...getGameArea() };
    this.xPos = this.getRandom(gameArea.x2, this.width);
    this.yPos = this.getRandom(gameArea.y2, this.height);

    this.food = getObject("food", "Food", this.xPos, this.yPos);
    this.html = this.food.html;
    setPosition(this.food.html, this.food.xPos, this.food.yPos);
  }

  getArea() {
    const gameArea = {
      x1: this.xPos - this.width,
      x2: this.xPos + this.width,
      y1: this.yPos - this.width,
      y2: this.yPos + this.height,
    };

    return gameArea;
  }

  destroyFood = () => document.getElementById("game").removeChild(this.html);

  getRandom(max, min = 0) {
    const result = Math.floor(Math.random() * max);
    return result > min ? result : this.getRandom(max, min);
  }
}

export default Food;
