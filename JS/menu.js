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
}
export default Menu;
