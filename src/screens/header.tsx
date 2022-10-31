import "./header.css";

const Header: React.FC<{}> = () => {
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
            <input placeholder="音乐/视频/电台/用户" />
          </div>
        </div>
        <div className="m-creator-center">
          <a>创作者中心</a>
        </div>
        <div className="user">
          <img src={process.env.PUBLIC_URL + "/avatar.jpg"} alt="avatar" />
        </div>
      </header>
      <header className="nav-2"></header>
    </div>
  );
};

export default Header;
