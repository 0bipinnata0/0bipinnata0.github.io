import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../../baseUI/loading";
import Scroll from "../../baseUI/scroll";
import RecommendList from "../../components/list/RecommendList";
import Slider from "../../components/slider";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { getBannerList, selectBannerList } from "../../store/bannerListSlice";
import {
  getRecommendList,
  selectRecommendList,
} from "../../store/recommendListSlice";
import { EnterLoading } from "../Rank/style";
import { Content } from "./style";

const Recommend: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const bannerList = useAppSelector(selectBannerList);

  const { value: recommendList, status: enterLoading } =
    useAppSelector(selectRecommendList);

  useEffect(() => {
    if (!bannerList.length) {
      dispatch(getBannerList());
    }
    if (!recommendList.length) {
      dispatch(getRecommendList());
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Content>
      <Outlet />
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      <EnterLoading show={enterLoading === "loading"}>
        <Loading />
      </EnterLoading>
    </Content>
  );
};

export default React.memo(Recommend);
