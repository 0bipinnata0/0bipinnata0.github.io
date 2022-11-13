import { useState } from "react";
import styled from "styled-components";
import useBoard, { Board } from "./hooks/useBoard";
import PalyArea from "./PalyArea";

const Flex = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  margin: 2px;
`;
const Header: React.FC<{
  reset: () => void;
}> = ({ reset }) => {
  const { boardArray, row, col, bombs, setRow, setCol, setBombs } = useBoard();
  const leftBombs = boardArray
    .filter((item) => !item.flag)
    .filter((item) => !item.show)
    .filter((item) => item.value === -1).length;
  return (
    <Flex>
      <Flex>
        <div>
          row:
          <input
            defaultValue={row}
            type="number"
            onChange={(v) => {
              setRow(+v.target.value);
            }}
          />
        </div>
        <div>
          col:
          <input
            defaultValue={col}
            type="number"
            onChange={(v) => {
              setCol(+v.target.value);
            }}
          />
        </div>
        <div>
          bomb:
          <input
            defaultValue={bombs}
            type="number"
            onChange={(v) => {
              setBombs(+v.target.value);
            }}
          />
        </div>
      </Flex>
      <Flex>
        <button onClick={reset}>重置</button>
      </Flex>
      <Flex>
        <div>剩余:{leftBombs}</div>
      </Flex>
    </Flex>
  );
};

const MineSweeper = () => {
  const row = 16;
  const col = 30;
  const bombs = 70;
  const [randomValue, setRandomValue] = useState(Date.now());
  const resetHandle = () => {
    setRandomValue(Date.now() + Math.random());
  };
  return (
    <>
      <Board
        row={row}
        col={col}
        bombs={bombs}
        header={<Header reset={resetHandle} />}
        key={randomValue}
      >
        <PalyArea />
      </Board>
    </>
  );
};

export default MineSweeper;
