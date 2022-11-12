import { Link } from "react-router-dom";
import SubNav from "../SubNav";
import "./header.css";

const Header: React.FC<{}> = () => {
  return (
    <div className="container">
      <header className="m-top">
        <div className="logo" />
        <div className="nav">
          <ul>
            <li>
              <Link to="/">
                <em>发现方块</em>
              </Link>
            </li>
            <li>
              <Link to="/minesweeper">
                <em>我的扫雷</em>
              </Link>
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
      <SubNav />
    </div>
  );
};

export default Header;
