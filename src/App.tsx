import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./screens/Header";

const App: React.FC<{}> = () => {
  return (
    <div className="application">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
