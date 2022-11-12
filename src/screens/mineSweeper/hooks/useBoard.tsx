import React, { useContext, useState } from "react";
import Container from "../Container";
import useBoardArray, { BoardItemType } from "./useBoardArray";

const BoardContext = React.createContext<{
  row: number;
  col: number;
  boardArray: BoardItemType[];
  onClickBoardItem: (item: BoardItemType) => void;
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
    const {key} = selected;
    const newArray = boardArray.map((item) => {
      return item.key !== key ? item : { ...item, show: true };
    });
    updateBoardArray(newArray);
  };

  return (
    <BoardContext.Provider value={{ row, col, boardArray, onClickBoardItem }}>
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
