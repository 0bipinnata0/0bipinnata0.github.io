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
  #init = true;
  #block = getBlock();
  #data = getMap(this.#height, this.#width);
  #prevData = this.#data;
  #gc: CanvasRenderingContext2D;
  #reset() {
    if (this.#init) {
      return false;
    }
    this.#x = 3;
    this.#y = 0;
    this.#block = getBlock();
    this.#init = true;
    return true;
  }
  left() {
    if (this.#x !== 0) {
      this.#x--;
    }
    this.draw(false);
  }
  right() {
    if (this.#x + this.#block.width < this.#width) {
      this.#x++;
    }
    this.draw(false);
  }
  down() {
    if (this.#y + this.#block.height < this.#height) {
      this.#y++;
      this.draw(false);
      return false;
    } else {
      this.draw(true);
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
    if (canRotate) {
      this.#block.rotate();
      const height = this.#block.height;
      const width = this.#block.width;
      if (this.#x + width > this.#width) {
        this.#x = this.#width - width;
      }
      if (this.#y + height > this.#height) {
        this.#y = this.#height - height;
      }
    }
    this.draw(false);
  }
  constructor(gc: CanvasRenderingContext2D) {
    this.#gc = gc;
    this.draw(false);
    document.onkeydown = (evt) => {
      evt.preventDefault();
      switch (evt.key) {
        // case "ArrowUp":
        //   break;
        case "ArrowDown":
          this.down();
          break;
        case "ArrowLeft":
          this.left();
          break;
        case "ArrowRight":
          this.right();
          break;
        case " ":
          this.rotate();
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
      const dispearRows = this.#height - filteredData.length;
      if (dispearRows > 0) {
        this.#data = [...getMap(dispearRows, this.#width), ...filteredData];
      }
      console.info("END");
      const hasReset = this.#reset();
      if (hasReset) {
        this.draw(false);
      }
      this.#init = false;
      return;
    }
    this.#prevData = data;
    this.#render(data);
    this.#init = false;
  }
}
