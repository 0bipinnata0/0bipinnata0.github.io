import React, { useContext, useState } from "react";
import Container from "../Container";
import { handleDifferentBoardItem } from "../utils";
import useBoardArray, { BoardItemType } from "./useBoardArray";

const BoardContext = React.createContext<{
  row: number;
  col: number;
  bombs: number;
  boardArray: BoardItemType[];
  onClickBoardItem: (item: BoardItemType) => void;
  toggleFlag: (item: BoardItemType) => void;
  setRow: React.Dispatch<React.SetStateAction<number>>;
  setCol: React.Dispatch<React.SetStateAction<number>>;
  setBombs: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const Board: React.FC<
  React.PropsWithChildren<{
    header: React.ReactNode;
    row: number;
    col: number;
    bombs: number;
  }>
> = ({
  row: defaultRow,
  col: defaultCol,
  children,
  header,
  bombs: defaultBombs,
}) => {
  const [row, setRow] = useState(defaultRow);
  const [col, setCol] = useState(defaultCol);
  const [bombs, setBombs] = useState(defaultBombs);
  const [boardArray, updateBoardArray] = useBoardArray(row, col, bombs);

  const onClickBoardItem = (selected: BoardItemType) => {
    if (selected.show) {
      return;
    }
    // 踩中炸弹
    if (selected.value === -1) {
      const endArray = boardArray.map((item) =>
        item.value === -1 ? { ...item, show: true } : item
      );
      updateBoardArray(endArray);
      return;
    }
    const turnShowArray = handleDifferentBoardItem(
      selected,
      boardArray,
      col,
      row
    );
    const newArray = boardArray.map((item) => {
      return turnShowArray.includes(item.key)
        ? { ...item, show: true, flag: false }
        : item;
    });
    updateBoardArray(newArray);
  };

  const toggleFlag = (selected: BoardItemType) => {
    if (selected.show) {
      return;
    }
    updateBoardArray(
      boardArray.map((item) =>
        item === selected ? { ...item, flag: !item.flag } : item
      )
    );
  };

  return (
    <BoardContext.Provider
      value={{
        row,
        col,
        boardArray,
        onClickBoardItem,
        toggleFlag,
        setRow,
        setCol,
        bombs,
        setBombs,
      }}
    >
      {header}
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
