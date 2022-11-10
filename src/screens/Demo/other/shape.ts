import { getMap } from "./util";

export default class Shape {
  width!: number;
  height!: number;
  #value!: number[][];

  get value() {
    return this.#value;
  }
  set value(value: number[][]) {
    this.#value = value;
    this.#changePosition();
  }
  #changePosition() {
    const rectangle = this.#value;
    const row = rectangle[0];
    this.width = row.length;
    this.height = rectangle.length;
  }

  constructor(value: number[][]) {
    this.value = value;
  }
  getRotated() {
    const newV = getMap(this.width, this.height);
    this.#value.forEach((row, r) => {
      row.forEach((v, c) => {
        newV[c][this.height - 1 - r] = v;
      });
    });
    return newV;
  }
  rotate() {
    const newV = this.getRotated();
    this.value = newV;
  }
}

export function getBlock() {
  //方块的类型
  const blockType = [
    new Shape([[1, 1, 1, 1]]),
    new Shape([
      [1, 1],
      [1, 1],
    ]),
    new Shape([
      [1, 1, 0],
      [0, 1, 1],
    ]),
    new Shape([
      [0, 1, 1],
      [1, 1, 0],
    ]),
    new Shape([
      [0, 1, 0],
      [1, 1, 1],
    ]),
    new Shape([
      [1, 0, 0],
      [1, 1, 1],
    ]),
    new Shape([
      [0, 0, 1],
      [1, 1, 1],
    ]),
  ];
  let index = Math.floor(Math.random() * 7);
  return blockType[index];
}
