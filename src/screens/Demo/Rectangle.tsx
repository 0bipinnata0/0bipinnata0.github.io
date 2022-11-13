import { useEffect, useRef } from "react";
import "./index.css";
import { Tetris } from "./other";
const Rectangle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      const tetris = new Tetris(context);
      const time = setInterval(() => tetris.down(), 1_000);
      return () => {
        clearInterval(time);
      };
    }
  }, []);
  return (
    <canvas ref={canvasRef} id="myCanvas" height="500" width="250"></canvas>
  );
};

export default Rectangle;
