import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Tab, TabItem, Top } from "./style";

const Home: React.FC<{}> = (props) => {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink
          to="/recommend"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span> 推荐 </span>
          </TabItem>
        </NavLink>
        <NavLink
          to="/singers"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span> 歌手 </span>
          </TabItem>
        </NavLink>
        <NavLink
          to="/rank"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span> 排行榜 </span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
    </div>
  );
};

export default React.memo(Home);
