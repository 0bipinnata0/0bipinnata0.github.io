import styled from "styled-components";
import { selectTargetIndex } from "./utils";

const Cell = styled.div`
  display: flex;
  margin: 2px;
  width: 36px;
  height: 36px;
  background-color: aliceblue;
  justify-content: center;
  align-items: center;
`;

const useIcon = (type: number) => {
  switch (type) {
    case -1:
      return <>"🚩"</>;
    case 1:
      return <div>1</div>;
    default:
      return null;
  }
};

const Square: React.FC<{ children: number }> = ({ children }) => {
  const view = useIcon(children);
  return <Cell>{view}</Cell>;
};

const PalyArea: React.FC<{
  col: number;
  row: number;
}> = ({ col, row }) => {
  //   const width = data[0].length;
  const length = row * col;
  const mine = selectTargetIndex(length, 70);
  console.info(mine);
  const data = new Array<number>(length).fill(0);
  return (
    <>
      {data.map((item, index) => (
        <Square key={index}>{item}</Square>
      ))}
    </>
  );
};

export default PalyArea;
