import { useEffect, useMemo, useState } from "react";
import { getSurroundArr, selectTargetIndex } from "../utils";

export interface BoardItemType {
  value: number;
  show: boolean;
  key: number;
  flag: boolean;
}

const useBoardArray = (row: number, col: number, bombs: number) => {
  const data = useMemo(() => {
    console.info("re render");
    const length = row * col;
    const mines = selectTargetIndex(length, bombs);
    const mapArray = new Array<number>(length)
      .fill(0)
      .map((v, index) => (mines.includes(index) ? -1 : v))
      .map((v, index, arr) => {
        if (v < 0) {
          return v;
        }
        const surroundAIndex = getSurroundArr(index, col, row);
        const surrounding = surroundAIndex
          .map((v) => arr[v])
          .filter((v) => v < 0);
        return surrounding.length;
      });
    return mapArray.map((v, index) => ({
      value: v,
      show: false,
      key: index,
      flag: false,
    }));
  }, [row, col, bombs]);
  const [boardArray, update] = useState(data);
  useEffect(() => {
    update(data);
  }, [data]);
  return [boardArray, update] as const;
};

export default useBoardArray;
