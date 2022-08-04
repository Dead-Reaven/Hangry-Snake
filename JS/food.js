import getGameArea from "./getPlayArea.js";
class Food {
  constructor() {
    this.html = null;
    this.width = document.getElementById(0).offsetWidth;
    this.height = document.getElementById(0).offsetHeight;
    const gameArea = { ...getGameArea() };
    this.xPos = this.getRandom(gameArea.x2 - this.width, this.width);
    this.yPos = this.getRandom(gameArea.y2 - this.height, this.height);

    this.createFood();
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

  createFood() {
    this.html = document.createElement("div");
    this.html.setAttribute("class", "food");
    this.html.setAttribute("id", "Food");
    document.getElementById("game").appendChild(this.html);
  }

  destroyFood = () => document.getElementById("game").removeChild(this.html);

  setPosistion() {
    this.html.style = `
    left: ${String(this.xPos)}px; 
    top:   ${String(this.yPos)}px;
    `;
  }

  getRandom(max, min = 0) {
    const result = Math.floor(Math.random() * max);
    return result > min ? result : this.getRandom(max, min);
  }
}

export default Food;
