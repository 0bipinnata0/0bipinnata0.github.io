import { axiosInstance } from "../config";

export const getRankListRequest = () => {
  return axiosInstance.get<{
    code: number;
    list: IRank[];
    artistToplist: ArtistToplist;
    rewardToplist: RewardToplist;
  }>(`/toplist/detail`);
};

interface RewardToplist {
  coverUrl: string;
  songs: Song[];
  name: string;
  position: number;
}

interface Song {
  name: string;
  id: number;
  position: number;
  alias: any[];
  status: number;
  fee: number;
  copyrightId: number;
  disc: string;
  no: number;
  artists: Artist[];
  album: Album;
  starred: boolean;
  popularity: number;
  score: number;
  starredNum: number;
  duration: number;
  playedNum: number;
  dayPlays: number;
  hearTime: number;
  sqMusic: SqMusic;
  hrMusic?: any;
  ringtone: string;
  crbt?: any;
  audition?: any;
  copyFrom: string;
  commentThreadId: string;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  copyright: number;
  transName?: any;
  sign?: any;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: any;
  single: number;
  noCopyrightRcmd?: any;
  rtype: number;
  rurl?: any;
  mvid: number;
  bMusic: SqMusic;
  mp3Url?: any;
  hMusic: SqMusic;
  mMusic: SqMusic;
  lMusic: SqMusic;
}

interface SqMusic {
  name?: any;
  id: number;
  size: number;
  extension: string;
  sr: number;
  dfsId: number;
  bitrate: number;
  playTime: number;
  volumeDelta: number;
}

interface Album {
  name: string;
  id: number;
  type: string;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company?: any;
  briefDesc: string;
  artist: Artist;
  songs: any[];
  alias: any[];
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: Artist[];
  subType: string;
  transName?: any;
  onSale: boolean;
  mark: number;
  gapless: number;
  picId_str: string;
}

interface Artist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
}

interface ArtistToplist {
  coverUrl: string;
  artists: Array<{
    first: string;
    second: string;
    third: number;
  }>;
  name: string;
  upateFrequency: string;
  position: number;
  updateFrequency: string;
}


export interface IRank {
  subscribers: any[];
  subscribed?: any;
  creator?: any;
  artists?: any;
  tracks: ITrack[];
  updateFrequency: string;
  backgroundCoverId: number;
  backgroundCoverUrl?: any;
  titleImage: number;
  titleImageUrl?: any;
  englishTitle?: any;
  opRecommend: boolean;
  recommendInfo?: any;
  socialPlaylistCover?: any;
  subscribedCount: number;
  adType: number;
  trackNumberUpdateTime: number;
  userId: number;
  createTime: number;
  highQuality: boolean;
  specialType: number;
  coverImgId: number;
  newImported: boolean;
  anonimous: boolean;
  updateTime: number;
  trackCount: number;
  coverImgUrl: string;
  trackUpdateTime: number;
  commentThreadId: string;
  totalDuration: number;
  privacy: number;
  cloudTrackCount: number;
  playCount: number;
  description?: string;
  ordered: boolean;
  tags: string[];
  status: number;
  name: string;
  id: number;
  coverImgId_str: string;
  ToplistType?: string;
}

export interface ITrack {
  first: string;
  second: string;
}
