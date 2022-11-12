import styled from "styled-components";

const Container = styled.div<{ col: number; row: number }>`
  margin: auto;
  width: ${(props) => props.col * 40}px;
  height: ${(props) => props.row * 40}px;
  display: flex;
  background-color: rgb(192, 192, 192);
  flex-wrap: wrap;
`;

export default Container;
