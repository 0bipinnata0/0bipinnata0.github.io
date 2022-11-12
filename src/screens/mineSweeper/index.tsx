import styled from "styled-components";
import useBoard, { Board } from "./hooks/useBoard";
import PalyArea from "./PalyArea";

const Flex = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
`;
const Header = () => {
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
        <div>剩余:{leftBombs}</div>
      </Flex>
    </Flex>
  );
};

const MineSweeper = () => {
  const row = 16;
  const col = 30;
  const bombs = 70;
  return (
    <>
      <Board row={row} col={col} bombs={bombs} header={<Header />}>
        <PalyArea />
      </Board>
    </>
  );
};

export default MineSweeper;
