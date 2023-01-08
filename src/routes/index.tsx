import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import { Navigate, RouteObject } from "react-router-dom";
import Album from "../application/Album";
import Singer from "../application/Singer";

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
        children: [
          {
            path: "/singers/:id",
            element: <Singer />,
          },
        ],
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
