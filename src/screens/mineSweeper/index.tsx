import styled from "styled-components";

const Container = styled.div<{ col: number; row: number }>`
  margin: auto;
  width: ${(props) => props.col * 40}px;
  height: ${(props) => props.row * 40}px;
  display: flex;
  background-color: rgb(192, 192, 192);
  flex-wrap: wrap;
`;

const Square = styled.div`
  display: flex;
  margin: 2px;
  width: 36px;
  height: 36px;
  background-color: aliceblue;
`;

const PalyArea: React.FC<{
  col: number;
  row: number;
}> = ({ col, row }) => {
  //   const width = data[0].length;
  const data = new Array(row * col).fill(0);
  return (
    <>
      {data.map((item, index) => (
        <Square key={index}>{item}</Square>
      ))}
    </>
  );
};

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
