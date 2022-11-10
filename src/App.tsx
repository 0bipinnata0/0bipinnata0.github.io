import "./App.css";
import Rectangle from "./screens/Demo/Rectangle";
import Header from "./screens/Header";

const App: React.FC<{}> = () => {
  return (
    <div className="application">
      <Header />
      <div>
        <Rectangle />
        {new Array(100).fill(1).map((i, index) => (
          <div key={index}>{i}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
