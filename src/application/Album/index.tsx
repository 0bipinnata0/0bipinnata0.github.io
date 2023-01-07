import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import globalStyle from "../../assets/global-style";
import Loading from "../../baseUI/loading";
import Scroll from "../../baseUI/scroll";
import Header from "./../../baseUI/header/index";
import AlbumMenu from "./AlbumMenu";
import AlbumSongList from "./AlbumSongList";
import AlbumTopDesc from "./AlbumTopDesc";
import useAlbum from "./hooks/useAlbum";
import { Container } from "./style";

export const HEADER_HEIGHT = 45;

const Album = () => {
  const [showStatus, setShowStatus] = useState(true);
  const { currentAlbum, loading } = useAlbum();
  const handleBack = () => {
    setShowStatus(false);
  };
  const navigate = useNavigate();
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const handleScroll = (pos: { y: number }) => {
    if (!currentAlbum) {
      return;
    }
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current!;
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = globalStyle["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2).toString();
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = "1";
      setTitle("歌单");
      setIsMarquee(false);
    }
  };
  const headerEl = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container>
        <Header handleClick={handleBack} ref={headerEl} isMarquee={isMarquee}>
          {title}
        </Header>
        <Scroll bounceTop={false} onScroll={handleScroll}>
          <div>
            <AlbumTopDesc />
            <AlbumMenu />
            <AlbumSongList />
          </div>
        </Scroll>
        {loading ? <Loading /> : null}
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);
