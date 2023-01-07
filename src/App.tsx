import { useRoutes } from "react-router-dom";
import { IconStyle } from "./assets/iconfont";
import routes from "./routes";
import { GlobalStyle } from "./style";

function App() {
  const element = useRoutes(routes);
  return (
    <>
      <GlobalStyle />
      <IconStyle />
      {element}
    </>
  );
}

export default App;
