const htmlSize = document.getElementById("size");
const htmlScore = document.getElementById("score");

class Menu {
  #size = 1;
  #score = 0;

  sizeUp(increment = 1) {
    this.#size += increment;
    htmlSize.textContent = `Size: ${String(this.#size)}`;
  }

  scoreUp() {
    this.#score += 1;
    htmlScore.textContent = `Score: ${String(this.#score)}`;
  }
  gameOvered = false;

  gameOver() {
    document.getElementById("menu").removeChild(document.getElementById("start-btn"));

    const btnHTML = document.createElement("button");
    btnHTML.setAttribute("class", "restart-btn");
    btnHTML.setAttribute("onclick", "location.reload(true)");
    document.getElementById("menu").appendChild(btnHTML);

    this.gameOvered = true;
  }
}
export default Menu;
