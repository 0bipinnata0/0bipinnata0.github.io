import React, { useContext, useState } from "react";
import Container from "../Container";
import { handleDifferentBoardItem } from "../utils";
import useBoardArray, { BoardItemType } from "./useBoardArray";

const BoardContext = React.createContext<{
  row: number;
  col: number;
  boardArray: BoardItemType[];
  onClickBoardItem: (item: BoardItemType) => void;
  toggleFlag: (item: BoardItemType) => void;
} | null>(null);

export const Board: React.FC<
  React.PropsWithChildren<{
    row: number;
    col: number;
  }>
> = ({ row, col, children }) => {
  const boardArrayRaw = useBoardArray(row, col);
  const [boardArray, updateBoardArray] = useState(boardArrayRaw);
  const onClickBoardItem = (selected: BoardItemType) => {
    const turnShowArray = handleDifferentBoardItem(
      selected,
      boardArray,
      col,
      row
    );
    const newArray = boardArray.map((item) => {
      return turnShowArray.includes(item.key) ? { ...item, show: true } : item;
    });
    updateBoardArray(newArray);
  };

  const toggleFlag = (selected: BoardItemType) => {
    updateBoardArray(
      boardArray.map((item) =>
        item === selected ? { ...item, flag: !item.flag } : item
      )
    );
  };

  return (
    <BoardContext.Provider
      value={{ row, col, boardArray, onClickBoardItem, toggleFlag }}
    >
      <Container row={row} col={col}>
        {children}
      </Container>
    </BoardContext.Provider>
  );
};

const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === null) {
    throw new Error("context is not init");
  }
  return context;
};

export default useBoard;
