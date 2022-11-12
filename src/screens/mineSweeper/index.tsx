import styled from "styled-components";
import PalyArea from "./PalyArea";

const Container = styled.div<{ col: number; row: number }>`
  margin: auto;
  width: ${(props) => props.col * 40}px;
  height: ${(props) => props.row * 40}px;
  display: flex;
  background-color: rgb(192, 192, 192);
  flex-wrap: wrap;
`;

const MineSweeper = () => {
  const row = 16;
  const col = 30;
  return (
    <Container row={row} col={col}>
      <PalyArea row={row} col={col} />
    </Container>
  );
};

export default MineSweeper;
