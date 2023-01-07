import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import { Navigate, RouteObject } from "react-router-dom";
import Album from "../application/Album";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Navigate to="/recommend" />,
      },
      {
        path: "/recommend",
        element: <Recommend />,
        children: [
          {
            path: "/recommend/:id",
            element: <Album />,
          },
        ],
      },
      {
        path: "/singers",
        element: <Singers />,
      },
      {
        path: "/rank",
        element: <Rank />,
        children: [
          {
            path: "/rank/:id",
            element: <Album />,
          },
        ],
      },
    ],
  },
];

export default routes;
