import { Board } from "./hooks/useBoard";
import PalyArea from "./PalyArea";

const MineSweeper = () => {
  const row = 16;
  const col = 30;
  return (
    <Board row={row} col={col}>
      <PalyArea />
    </Board>
  );
};

export default MineSweeper;
