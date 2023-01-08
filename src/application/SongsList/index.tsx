import React from "react";
import { SongsContainer, SongItemContainer } from "./style";
import { getName } from "../../api/utils";
import type { IHotSong } from "../../api/request/getSingerInfoRequest";

const Collect: React.FC<{
  count: number;
  show?: boolean;
}> = ({ count, show = false }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="add_list">
      <i className="iconfont">&#xe62d;</i>
      <span> 收藏 ({Math.floor(count / 1000) / 10} 万)</span>
    </div>
  );
};

const SongItem: React.FC<{
  item: IHotSong;
  offset: number;
  selectItem: React.MouseEventHandler<Element>;
}> = ({ item, selectItem, offset }) => {
  return (
    <li key={item.id} onClick={selectItem}>
      <span className="index">{offset + 1}</span>
      <div className="info">
        <span>{item.name}</span>
        <span>
          {getName(item.ar)}
          {item.al.name}
        </span>
      </div>
    </li>
  );
};

const SongsList = React.forwardRef<
  HTMLDivElement,
  {
    songs: IHotSong[];
    showCollect: boolean;
    collectCount?: number;
    showBackground?: boolean;
  }
>((props, refs) => {
  const {
    collectCount = 0,
    showCollect,
    songs,
    showBackground = false,
  } = props;

  const totalCount = songs.length;

  const selectItem: React.MouseEventHandler<Element> = (evt) => {
    console.log(evt);
  };

  return (
    <SongsContainer ref={refs} showBackground={showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={selectItem}>
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部 <span className="sum">(共 {totalCount} 首)</span>
          </span>
        </div>
        <Collect count={collectCount} show={showCollect} />
        <SongItemContainer>
          {songs.map((song, index) => (
            <SongItem
              item={song}
              offset={index}
              selectItem={selectItem}
              key={index}
            />
          ))}
        </SongItemContainer>
      </div>
    </SongsContainer>
  );
});

export default React.memo(SongsList);
