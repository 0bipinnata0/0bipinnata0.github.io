import React from "react";
import { Outlet } from "react-router-dom";
import Loading from "../../baseUI/loading";
import Scroll from "../../baseUI/scroll";
import useRankList from "./hooks/useRankList";
import RankList from "./RankList";
import { Container, EnterLoading } from "./style";
const Rank: React.FC<{}> = () => {
  const { loading, globalList, officialList } = useRankList();
  let displayStyle = loading ? { display: "none" } : { display: "" };
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            官方榜
          </h1>
          <RankList list={officialList} />
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          <RankList list={globalList} global />
          <EnterLoading show={loading}>
            <Loading />
          </EnterLoading>
        </div>
      </Scroll>
      <Outlet />
    </Container>
  );
};

export default React.memo(Rank);
