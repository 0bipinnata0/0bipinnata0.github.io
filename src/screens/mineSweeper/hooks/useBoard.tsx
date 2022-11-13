import React, { useContext, useState } from "react";
import Container from "../Container";
import {
  expandBoard,
  getSurroundArr,
  handleDifferentBoardItem,
} from "../utils";
import useBoardArray, { BoardItemType } from "./useBoardArray";

const BoardContext = React.createContext<{
  row: number;
  col: number;
  bombs: number;
  boardArray: BoardItemType[];
  onClickBoardItem: (item: BoardItemType) => void;
  expandItemHandle: (item: BoardItemType) => void;
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

  const expandItemHandle = (selected: BoardItemType) => {
    const surroundingKeys = getSurroundArr(selected.key, col, row);
    const surroundingHiddenItem = boardArray
      .filter((item) => surroundingKeys.includes(item.key))
      .filter((item) => !item.show);

    const flagIndex = surroundingHiddenItem
      .filter((item) => item.flag)
      .map((item) => item.key);
    if (flagIndex.length === selected.value) {
      const expandItems = surroundingHiddenItem.filter((item) => !item.flag);
      console.info("expandItems", expandItems);
      // 排除周围标记项
      const endExpand = expandBoard(expandItems, boardArray, col, row).filter(
        (index) => !flagIndex.includes(index)
      );

      const endArray = boardArray.map((item) =>
        !endExpand.includes(item.key)
          ? item
          : item.value === -1
          ? item
          : { ...item, show: true, flag: false }
      );
      updateBoardArray(endArray);
      return;
    }
  };

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
        expandItemHandle,
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
