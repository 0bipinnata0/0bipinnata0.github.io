// 排行榜单分为两个部分，一部分是官方榜，另一部分是全球榜。
// 官方榜单数据有 tracks 数组，存放部分歌曲信息，而全球榜没有。

import type { IRank } from "../../../api/request/getRankListRequest";
import { negateFunc } from "../../../api/utils";

// 官方榜单有trace
const isOfficialRank = (rank: IRank) => {
  if (rank.tracks instanceof Array && rank.tracks.length > 0) {
    return true;
  }
  return false;
};

// 全球榜没有trace
const isGlobalRank = (rank: IRank) => negateFunc(isOfficialRank);

// 处理数据，找出第一个没有歌名的排行榜的索引
export const getOfficialAndGlobalRank = (rankList: IRank[]) => {
  return {
    officialList: rankList.filter(isOfficialRank),
    globalList: rankList.filter(isGlobalRank),
  };
};
