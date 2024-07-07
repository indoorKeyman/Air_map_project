import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Map from "./routes/Map";
import Shopping from "./routes/Shopping";
import Commu from "./routes/Commu";
import Shop from "./components/Shop";
import Dine from "./components/Dine";
import MakePosts from "./routes/MakePosts";
import About from "./routes/About";
import Depart from "./components/Arrival";
import Arrival from "./components/Depart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
        children: [
          {
            path: "arrival",
            element: <Arrival />,
          },
          {
            path: "depart",
            element: <Depart />,
          },
        ],
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "shopping",
        element: <Shopping />,
        children: [
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "dine",
            element: <Dine />,
          },
        ],
      },
      {
        path: "commu",
        element: <Commu />,
      },
      {
        path: "makeposts",
        element: <MakePosts />,
      },
    ],
  },
]);

export default router;
