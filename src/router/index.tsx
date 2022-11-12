import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Rectangle from "../screens/Demo/Rectangle";
import MineSweeper from "../screens/mineSweeper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <>
            <Rectangle />
            {new Array(100).fill(1).map((i, index) => (
              <div key={index}>{i}</div>
            ))}
          </>
        ),
      },
      {
        path: "minesweeper",
        element: <MineSweeper />,
      },
    ],
  },
]);

export default router;
