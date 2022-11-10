import { getBlock } from "./shape";
import { clone, getMap } from "./util";

export function getRenderColor(val: number) {
  return val === 0 ? "white" : "red";
}

export class Tetris {
  #width = 10;
  #height = 20;
  #x = 3;
  #y = 0;
  #block = getBlock();
  #data = getMap(this.#height, this.#width);
  #prevData = this.#data;
  #gc: CanvasRenderingContext2D;
  #reset() {
    this.#x = 3;
    this.#y = 0;
    this.#block = getBlock();
  }
  left() {
    if (this.#x === 0) {
      return;
    }
    this.#x--;
  }
  right() {
    if (this.#x + this.#block.width < this.#width) {
      this.#x++;
    }
  }
  down() {
    if (this.#y + this.#block.height < this.#height) {
      this.#y++;
      return false;
    } else {
      return true;
    }
  }
  #checkRotate(newBlock: number[][]) {
    return newBlock.every((row, r) => {
      return row.every((value, c) => {
        const result = value + this.#data[r + this.#y][c + this.#x];
        return result !== 2;
      });
    });
  }
  rotate() {
    const rotatedBlock = this.#block.getRotated();
    const canRotate = this.#checkRotate(rotatedBlock);
    if (!canRotate) {
      return;
    }
    this.#block.rotate();
    const height = this.#block.height;
    const width = this.#block.width;
    if (this.#x + width > this.#width) {
      this.#x--;
    }
    if (this.#y + height > this.#height) {
      this.#y--;
    }
  }
  constructor(gc: CanvasRenderingContext2D) {
    this.#gc = gc;
    this.draw(false);
    document.onkeydown = (evt) => {
      evt.preventDefault();
      let newTurn = false;
      switch (evt.key) {
        // case "ArrowUp":
        //   break;
        case "ArrowDown":
          newTurn = this.down();
          this.draw(newTurn);
          break;
        case "ArrowLeft":
          this.left();
          this.draw(newTurn);
          break;
        case "ArrowRight":
          this.right();
          this.draw(newTurn);
          break;
        case " ":
          this.rotate();
          this.draw(newTurn);
          break;
      }
    };
  }
  #render(data: number[][]) {
    let w = 500 / 20 - 4;
    let h = 500 / 20 - 4;
    data.forEach((row, r) =>
      row.forEach((value, c) => {
        this.#gc.fillStyle = getRenderColor(value);
        this.#gc.fillRect((w + 4) * c + 2, (h + 4) * r + 2, w, h);
      })
    );
  }
  draw(end: boolean) {
    const data = end ? this.#data : clone(this.#data);

    let combine = false;
    this.#block.value.forEach((row, r) => {
      row.forEach((val, c) => {
        if (combine) {
          return;
        }
        const result = data[r + this.#y][c + this.#x] + val;
        if (result === 2) {
          combine = true;
          end = true;
        }
        data[r + this.#y][c + this.#x] = result;
      });
    });
    if (combine) {
      this.#data = this.#prevData;
    }
    if (end) {
      const filteredData = this.#data.filter(
        (row) => !row.every((v) => v === 1)
      );
      if (filteredData.length < this.#height) {
        this.#data = [new Array(this.#width).fill(0), ...filteredData];
      }
      console.info("END");
      this.#reset();
      this.draw(false);
      return;
    }
    this.#prevData = data;
    this.#render(data);
  }
}

// @ts-ignore
const canvas: HTMLCanvasElement = document.getElementById("myCanvas");
// @ts-ignore
// setTimeout(() => tetris.draw(), 500);
