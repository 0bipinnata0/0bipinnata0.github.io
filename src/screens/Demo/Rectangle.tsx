import { useEffect, useRef, useState } from "react";
import "./index.css";
import { Tetris } from "./other";
const Rectangle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      const tetris = new Tetris(context);
      tetris.addEventListener(setScore);
      const time = setInterval(() => tetris.down(), 1_000);
      return () => {
        clearInterval(time);
      };
    }
  }, []);
  return (
    <div>
      得分{score}
      <canvas ref={canvasRef} id="myCanvas" height="500" width="250"></canvas>
    </div>
  );
};

export default Rectangle;
