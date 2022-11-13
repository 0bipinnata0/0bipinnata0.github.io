import styled from "@emotion/styled";
import useBoard from "./hooks/useBoard";
import { BoardItemType } from "./hooks/useBoardArray";
import useIcon from "./hooks/useIcon";

const BaseCell = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* box-shadow: inset 0 0 0 2px whitesmoke; */
  user-select: none;
  box-shadow: -2px -2px 5px #fff, 2px 2px 3px #ddd;

  &:hover {
    box-shadow: inset 0 0 0 2px yellow;
  }
`;

const ShowCell = styled(BaseCell)`
  box-shadow: none;
  width: 38px;
  height: 38px;
  background-color: #dde7c7;
  border: 1px solid rgb(138, 138, 138);
  &:hover {
    box-shadow: none;
  }
`;

const Cell: React.FC<{ item: BoardItemType }> = ({ item }) => {
  const { onClickBoardItem, toggleFlag, expandItemHandle } = useBoard();
  const { show, value } = item;
  const view = useIcon(value);
  if (!show) {
    return (
      <BaseCell
        onClick={() => onClickBoardItem(item)}
        onContextMenu={(evt) => {
          evt.preventDefault();
          toggleFlag(item);
        }}
      >
        {item.flag ? "🚩" : null}
      </BaseCell>
    );
  }
  return (
    <ShowCell
      onClick={() => expandItemHandle(item)}
      onContextMenu={(evt) => {
        evt.preventDefault();
        toggleFlag(item);
      }}
    >
      {view}
    </ShowCell>
  );
};

export default Cell;
