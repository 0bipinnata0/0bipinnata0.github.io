import "./App.css";

const App: React.FC<{}> = () => {
  return (
    <div className="container">
      <header className="m-top">
        <div className="logo" />
        <div className="nav">
          <ul>
            <li>
              <em>发现音乐</em>
            </li>
            <li>
              <em>我的音乐</em>
            </li>
            <li>
              <em>关注</em>
            </li>
            <li>
              <em>商城</em>
            </li>
            <li>
              <em>音乐人</em>
            </li>
            <li>
              <em>下载客户端</em>
            </li>
          </ul>
        </div>
        <div className="search">
          <div className="srchbg">
            <input />
          </div>
        </div>
        <div className="m-creator-center"></div>
        <div className="user"></div>
      </header>
      <header className="nav-2"></header>
    </div>
  );
};

export default App;
