import { useState } from "react";
import styled from "styled-components";
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

const Square: React.FC<{ children: number }> = ({ children }) => {
  const [show, setState] = useState(false);
  const view = useIcon(children);
  return <Cell onClick={() => setState(true)}>{show ? view : null}</Cell>;
};

export default Square;
