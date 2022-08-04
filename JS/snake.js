import Target from "./food.js";
import getObject from "./getObject.js";
import getPlayArea from "./getPlayArea.js";

let gameArea = { ...getPlayArea() };
const head = getObject("head", 0, gameArea.x2 / 2, gameArea.y2 / 2);

class Head {
  child = null;
  lastChild = this.child;

  constructor(object, distance, timeout) {
    this.html = object.html;
    this.id = Number(object.id);
    this.xPos = object.xPos;
    this.yPos = object.yPos;
    this.stop = false;
    this.sizeHead = this.html.offsetWidth;
    this.setMoveConfig(distance, timeout);
  }

  setMoveConfig(distanse, timeout) {
    this.distanse = distanse;
    this.timeout = timeout;
    if (this.child) this.child.setMoveConfig(distanse, timeout);
  }

  getCoordinates() {
    return {
      id: this.id,
      x: this.xPos,
      y: this.yPos,
    };
  }

  getSnakeArea() {
    let arr = [];
    let child = this.child;
    for (let id = 0; child; id++, child = child.child) {
      arr[id] = { ...child.getCoordinates() };
    }

    const snakeArea = arr.map((el) => {
      return {
        x1: el.x - this.distanse + 0.1,
        x2: el.x + this.distanse - 0.1,
        y1: el.y - this.distanse + 0.1,
        y2: el.y + this.distanse - 0.1,
      };
    });

    return snakeArea;
  }

  append() {
    if (this.child) {
      this.child.append();
      this.lastChild = this.child.child;

      this.child.html.setAttribute("class", "body");
    } else {
      let newChild = getObject("tail", this.id + 1, this.xPos, this.yPos);
      this.child = new Tail(newChild, this.distanse, this.timeout);
      this.child.setPosition();
    }
  }

  stopMove() {
    this.stop = true;
    if (this.child) this.child.stopMove();
  }

  move(side) {
    if (this.stop) return;
    this[side](this.distanse);
    if (this.child) {
      setTimeout(() => {
        this.child.move(side);
      }, this.timeout);
    }
  }

  setPosition() {
    this.html.style = ` 
      top: ${this.yPos}px;
      left: ${this.xPos}px;`;
  }

  right = (distanse) => {
    this.xPos += distanse;
    this.setPosition();
  };
  left = (distanse) => {
    this.xPos -= distanse;
    this.setPosition();
  };

  up = (distanse) => {
    this.yPos -= distanse;
    this.setPosition();
  };

  down = (distanse) => {
    this.yPos += distanse;
    this.setPosition();
  };
}

class Tail extends Head {
  constructor(object, distance, timeout) {
    super(object, distance, timeout);
  }
}

//////////////
////////
/////////////////////
//////////

class Snake {
  constructor(defaultAppend, distance, timeout) {
    this.Head = new Head(head, distance, timeout);

    this.defaultAppend = defaultAppend;
    this.append(this.defaultAppend);
    this.gameArea = gameArea;

    this.gameArea.x2 -= document.getElementById("0").offsetWidth;
    this.gameArea.y2 -= document.getElementById("0").offsetHeight;
    this.spawNewTarget();
  }

  append = (count = this.defaultAppend) => {
    for (let i = 0; i < count; i++) this.Head.append();
  };

  runSnake(side) {
    if (this.#checkTarget()) return "targetDestroyed";
    if (this.#ckeckOutOfGame()) return "outOfArea";
    this.Head.move(side);

    if (this.#checkSelfEaten(this.Head.getSnakeArea())) return "selfDestroyed";

    return "continue";
  }

  #checkSelfEaten(arr) {
    let flag = null;
    arr.forEach((element) => {
      if (
        this.Head.xPos >= element.x1 &&
        this.Head.xPos <= element.x2 &&
        this.Head.yPos >= element.y1 &&
        this.Head.yPos <= element.y2
      )
        flag = true;
    });

    return flag;
  }

  #checkTarget() {
    if (
      this.Head.xPos >= this.targetArea.x1 &&
      this.Head.xPos <= this.targetArea.x2 &&
      this.Head.yPos >= this.targetArea.y1 &&
      this.Head.yPos <= this.targetArea.y2
    ) {
      {
        this.eatTarget();
        return true;
      }
    }
    return false;
  }

  eatTarget() {
    this.append(this.defaultAppend);
    this.Food.destroyFood();
    this.spawNewTarget();
  }

  spawNewTarget() {
    this.Food = new Target();
    this.targetArea = this.Food.getArea();
    this.Food.setPosistion();
  }

  #ckeckOutOfGame() {
    if (
      this.Head.xPos == this.gameArea.x1 ||
      this.Head.xPos == this.gameArea.x2 ||
      this.Head.yPos == this.gameArea.y1 ||
      this.Head.yPos == this.gameArea.y2
    )
      return true;
  }
}

export default Snake;
