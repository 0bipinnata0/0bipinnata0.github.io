import Square from "./Square";
import { selectTargetIndex } from "./utils";

const PalyArea: React.FC<{
  col: number;
  row: number;
}> = ({ col, row }) => {
  //   const width = data[0].length;
  const length = row * col;
  const mines = selectTargetIndex(length, 70);
  const data = new Array<number>(length)
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
  return (
    <>
      {data.map((item, index) => (
        <Square key={index}>{item}</Square>
      ))}
    </>
  );
};

export default PalyArea;
