import "./App.css";
import Header from "./screens/Header";

const App: React.FC<{}> = () => {
  return (
    <div className="application">
      <Header />
      <div>
        {new Array(100).fill(1).map((i) => (
          <div>{i}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
