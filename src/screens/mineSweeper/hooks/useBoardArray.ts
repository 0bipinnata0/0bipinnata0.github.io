import { useMemo } from "react";
import { selectTargetIndex } from "../utils";

export interface BoardItemType {
  value: number;
  show: boolean;
  key: number;
}

const useBoardArray = (row: number, col: number): BoardItemType[] => {
  const data = useMemo(() => {
    console.info("re render");
    const length = row * col;
    const mines = selectTargetIndex(length, 70);
    const mapArray = new Array<number>(length)
      .fill(0)
      .map((v, index) => (mines.includes(index) ? -1 : v))
      .map((v, index, arr) => {
        if (v < 0) {
          return v;
        }
        const leftTop = arr[index - col - 1];
        const top = arr[index - col];
        const rightTop = arr[index - col + 1];
        const left = arr[index - 1];
        const right = arr[index + 1];
        const leftBottom = arr[index + col - 1];
        const bottom = arr[index + col];
        const rightBottom = arr[index + col + 1];
        const surrounding = [
          leftTop,
          top,
          rightTop,
          left,
          right,
          leftBottom,
          bottom,
          rightBottom,
        ]
          .filter((v) => v)
          .filter((v) => v < 0);

        return surrounding.length;
      });
    return mapArray.map((v, index) => ({
      value: v,
      show: false,
      key: index,
    }));
  }, [row, col]);

  return data;
};

export default useBoardArray;
