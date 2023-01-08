import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/header";
import Loading from "../../baseUI/loading";
import Scroll, { ScrollElement } from "../../baseUI/scroll";
import { HEADER_HEIGHT } from "../Album";
import { EnterLoading } from "../Rank/style";
import SongsList from "../SongsList";
import useSingerInfo from "./hooks/useSingerInfo";
import {
  BgLayer,
  CollectButton,
  Container,
  ImgWrapper,
  SongListWrapper,
} from "./style";

const Singer: React.FC<{}> = () => {
  const { artist, hotSongs, loading } = useSingerInfo();
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();

  const collectButton = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const songScrollWrapper = useRef<HTMLDivElement>(null);
  const songScroll = useRef<ScrollElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  // 图片初始高度
  const initialHeight = useRef(0);

  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    if (
      imageWrapper.current &&
      songScrollWrapper.current &&
      layer.current &&
      songScroll.current
    ) {
      const h = imageWrapper.current.offsetHeight;
      initialHeight.current = h;
      songScrollWrapper.current.style.top = `${h - OFFSET}px`;
      //把遮罩先放在下面，以裹住歌曲列表
      layer.current.style.top = `${h - OFFSET}px`;
      songScroll.current.refresh();
    }
    //eslint-disable-next-line
  }, [loading]);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback((pos: { y: number }) => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
    if (imageDOM && buttonDOM && headerDOM && layerDOM) {
      // 指的是滑动距离占图片高度的百分比
      const percent = Math.abs(newY / height);
      //说明: 在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM其实是起一个遮罩的作用，给歌单内容提供白色背景
      //因此在处理的过程中，随着内容的滚动，遮罩也跟着移动
      if (newY > 0) {
        //处理往下拉的情况,效果：图片放大，按钮跟着偏移
        imageDOM.style["transform"] = `scale(${1 + percent})`;
        buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
        layerDOM.style.top = `${height - OFFSET + newY}px`;
      } else if (newY >= minScrollY) {
        //往上滑动，但是还没超过Header部分
        layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
        layerDOM.style.zIndex = "1";
        imageDOM.style.paddingTop = "75%";
        imageDOM.style.height = "0";
        imageDOM.style.zIndex = "-1";
        buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
        buttonDOM.style["opacity"] = `${1 - percent * 2}`;
      } else if (newY < minScrollY) {
        //往上滑动，但是超过Header部分
        layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
        layerDOM.style.zIndex = "1";
        //防止溢出的歌单内容遮住Header
        headerDOM.style.zIndex = "100";
        //此时图片高度与Header一致
        imageDOM.style.height = `${HEADER_HEIGHT}px`;
        imageDOM.style.paddingTop = "0";
        imageDOM.style.zIndex = "99";
      }
    }
  }, []);
  if (!artist) {
    return null;
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container>
        <Header handleClick={setShowStatusFalse} ref={header}>
          {artist.name}
        </Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter" />
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer} />
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList songs={hotSongs} showCollect={false} />
          </Scroll>
        </SongListWrapper>
        {loading ? (
          <EnterLoading style={{ zIndex: 100 }}>
            <Loading />
          </EnterLoading>
        ) : null}
      </Container>
    </CSSTransition>
  );
};

export default Singer;
