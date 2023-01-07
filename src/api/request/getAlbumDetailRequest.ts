import { axiosInstance } from "../config";

export const getAlbumDetailRequest = (id: string | number) => {
  return axiosInstance.get<{
    code: number;
    playlist: IPlaylist;
    privileges: Privilege[];
    fromUserCount: number;
  }>("/playlist/detail", {
    params: { id },
  });
};

interface Privilege {
  id: number;
  fee: number;
  payed: number;
  realPayed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  paidBigBang: boolean;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}

interface ChargeInfoList {
  rate: number;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
}

export interface IPlaylist {
  id: number;
  name: string;
  coverImgId: number;
  coverImgUrl: string;
  coverImgId_str: string;
  adType: number;
  userId: number;
  createTime: number;
  status: number;
  opRecommend: boolean;
  highQuality: boolean;
  newImported: boolean;
  updateTime: number;
  trackCount: number;
  specialType: number;
  privacy: number;
  trackUpdateTime: number;
  commentThreadId: string;
  playCount: number;
  trackNumberUpdateTime: number;
  subscribedCount: number;
  cloudTrackCount: number;
  ordered: boolean;
  description: string;
  tags: string[];
  backgroundCoverId: number;
  titleImage: number;
  copied: boolean;
  subscribers: Subscriber[];
  subscribed: boolean;
  creator: Creator;
  tracks: Track[];
  trackIds: TrackId[];
  shareCount: number;
  commentCount: number;
  gradeStatus: string;
  algTags: string[];
}

interface TrackId {
  id: number;
  v: number;
  t: number;
  at: number;
  uid: number;
  rcmdReason: string;
}

interface Track {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  pop: number;
  st: number;
  rt?: string;
  fee: number;
  v: number;
  cf: string;
  al: Al;
  dt: number;
  h?: H;
  m?: H;
  l: H;
  sq?: H;
  hr?: H;
  cd: string;
  no: number;
  ftype: number;
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  resourceState: boolean;
  version: number;
  single: number;
  rtype: number;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
}

interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

interface Al {
  id: number;
  name: string;
  picUrl: string;
  pic_str?: string;
  pic: number;
}

interface Ar {
  id: number;
  name: string;
}

interface Creator {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags: string[];
  experts: Experts;
  djStatus: number;
  vipType: number;
  authenticationTypes: number;
  avatarDetail: AvatarDetail;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  anchor: boolean;
  avatarImgId_str: string;
}

interface AvatarDetail {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
}

interface Experts {
  "1": string;
  "2": string;
}

interface Subscriber {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  djStatus: number;
  vipType: number;
  authenticationTypes: number;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  anchor: boolean;
  avatarImgId_str: string;
}
