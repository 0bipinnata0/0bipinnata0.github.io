import useBoard from "./hooks/useBoard";
import Square from "./Square";

const PalyArea = () => {
  //   const width = data[0].length;
  const { boardArray } = useBoard();
  return (
    <>
      {boardArray.map((item) => (
        <Square key={item.key}>{item}</Square>
      ))}
    </>
  );
};

export default PalyArea;
