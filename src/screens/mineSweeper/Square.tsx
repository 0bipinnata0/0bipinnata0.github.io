import Cell from "./Cell";
import { BoardItemType } from "./hooks/useBoardArray";

const Square: React.FC<{ children: BoardItemType }> = ({ children: item }) => {
  return <Cell item={item} />;
};

export default Square;
