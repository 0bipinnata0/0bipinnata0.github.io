import { BoardItemType } from "./hooks/useBoardArray";
function random(min: number, max: number) {
  const scope = max - min + 1;
  const random = Math.floor(Math.random() * scope);
  return random + min;
}

export function selectTargetIndex(length: number, selectedNums: number) {
  const indexArr = new Array<number>(length).fill(0).map((_, index) => index);
  const result: number[] = [];
  for (let time = 0; time < selectedNums; time++) {
    const randomIndex = random(0, length - 1 - time);
    result.push(indexArr[randomIndex]);
    // exchange
    [indexArr[randomIndex], indexArr[length - time - 1]] = [
      indexArr[length - time - 1],
      indexArr[randomIndex],
    ];
  }
  return result;
}

export function handleDifferentBoardItem(
  item: BoardItemType,
  board: BoardItemType[],
  col: number,
  row: number
): number[] {
  const { value, key } = item;
  // 地雷的附近必定被数字包裹，根据数字的生成规则自然得出的结论
  if (value !== 0) {
    return [key];
  }
  return expandBoard(item, board, col, row);
}

export function getSurroundArr(
  middle: number,
  col: number,
  row: number
): number[] {
  const surroundArr: number[] = [];
  const middleRow = Math.floor(middle / col);
  {
    const center = middle;
    const min = middleRow * col;
    const max = min + col - 1;
    const left = center - 1;
    const right = center + 1;
    if (left >= min) {
      surroundArr.push(left);
    }
    if (right <= max) {
      surroundArr.push(right);
    }
  }
  {
    const topRow = middleRow - 1;
    if (topRow >= 0) {
      const center = middle - col;
      surroundArr.push(center);
      const min = topRow * col;
      const max = min + col - 1;
      const left = center - 1;
      const right = center + 1;
      if (left >= min) {
        surroundArr.push(left);
      }
      if (right <= max) {
        surroundArr.push(right);
      }
    }
  }

  {
    const bottomRow = middleRow + 1;
    if (bottomRow < row) {
      const center = middle + col;
      surroundArr.push(center);
      const min = bottomRow * col;
      const max = min + col - 1;
      const left = center - 1;
      const right = center + 1;
      if (left >= min) {
        surroundArr.push(left);
      }
      if (right <= max) {
        surroundArr.push(right);
      }
    }
  }
  return surroundArr;
}

function expandBoard(
  item: BoardItemType,
  board: BoardItemType[],
  col: number,
  row: number
) {
  const showSet = new Set<number>([item.key]);
  const doneEmptySet = new Set([item]);
  const doingQueue = [item];
  let head = doingQueue.shift();
  while (head) {
    const { key } = head;
    const surroundIndex = getSurroundArr(key, col, row);
    surroundIndex.forEach((index) => {
      const item = board[index];
      if (item.value !== 0) {
        showSet.add(item.key);
        return;
      }
      if (doingQueue.includes(item)) {
        return;
      }
      if (doneEmptySet.has(item)) {
        return;
      }
      showSet.add(item.key);
      doingQueue.push(item);
      doneEmptySet.add(item);
    });

    head = doingQueue.shift();
  }

  return [...showSet];
}
