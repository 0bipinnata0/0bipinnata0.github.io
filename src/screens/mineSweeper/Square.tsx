import { useState } from "react";
import styled from "styled-components";
import useBoard from "./hooks/useBoard";
import { BoardItemType } from "./hooks/useBoardArray";
import useIcon from "./hooks/useIcon";

const Cell = styled.div`
  display: flex;
  margin: 2px;
  width: 36px;
  height: 36px;
  background-color: aliceblue;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Square: React.FC<{ children: BoardItemType }> = ({ children: item }) => {
  const { onClickBoardItem } = useBoard();
  const { show, value } = item;
  const view = useIcon(value);
  return (
    <Cell onClick={() => onClickBoardItem(item)}>{show ? view : null}</Cell>
  );
};

export default Square;
