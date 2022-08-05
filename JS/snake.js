import Target from "./food.js";
import { getObject, setPosition } from "./getObject.js";
import getPlayArea from "./getPlayArea.js";

const head = getObject("head", 0, null, null);
const gameArea = getPlayArea();
head.xPos = gameArea.x2 / 2;
head.yPos = gameArea.y2 / 2;
setPosition(head.html, head.xPos, head.yPos);

class Head {
  child = null;
  lastChild = this.child;

  constructor(object) {
    this.html = object.html;
    this.id = Number(object.id);
    this.xPos = object.xPos;
    this.yPos = object.yPos;
    this.stop = false;
  }

  getCoordinates() {
    return {
      id: this.id,
      x: this.xPos,
      y: this.yPos,
    };
  }

  getSnakeArea(distance) {
    let arr = [];
    let child = this.child;
    for (let id = 0; child; id++, child = child.child) {
      arr[id] = { ...child.getCoordinates() };
    }

    const snakeArea = arr.map((el) => {
      return {
        x1: el.x - distance + 0.1,
        x2: el.x + distance - 0.1,
        y1: el.y - distance + 0.1,
        y2: el.y + distance - 0.1,
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
      this.child = new Tail(newChild);
      setPosition(newChild.html, newChild.xPos, newChild.yPos);
    }
  }

  stopMove() {
    this.stop = true;
    if (this.child) this.child.stopMove();
  }

  move(side, distance, timeout) {
    if (this.stop) return;
    this[side](distance);
    setPosition(this.html, this.xPos, this.yPos);
    if (this.child) {
      setTimeout(() => {
        this.child.move(side, distance, timeout);
      }, timeout);
    }
  }

  right = (distanse) => {
    this.xPos += distanse;
  };
  left = (distanse) => {
    this.xPos -= distanse;
  };

  up = (distanse) => {
    this.yPos -= distanse;
  };

  down = (distanse) => {
    this.yPos += distanse;
  };
}

class Tail extends Head {
  constructor(object) {
    super(object);
  }
}

class Snake {
  constructor(defaultAppend) {
    this.Head = new Head(head);
    this.defaultAppend = defaultAppend;
    this.append(this.defaultAppend);
    this.spawNewTarget();
  }

  append = (count = this.defaultAppend) => {
    for (let i = 0; i < count; i++) this.Head.append();
  };

  runSnake(side, distance, timeout) {
    if (this.#checkTarget()) return "targetDestroyed";
    if (this.#ckeckOutOfGame()) return "outOfArea";
    this.Head.move(side, distance, timeout);

    if (this.#checkSelfEaten(this.Head.getSnakeArea(distance)))
      return "selfDestroyed";
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
  }

  #ckeckOutOfGame() {
    if (
      this.Head.xPos <= gameArea.x1 ||
      this.Head.xPos >= gameArea.x2 ||
      this.Head.yPos <= gameArea.y1 ||
      this.Head.yPos >= gameArea.y2
    )
      return true;
  }
}

export default Snake;
