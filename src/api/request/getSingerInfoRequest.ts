import { axiosInstance } from "../config";

export const getSingerInfoRequest = (id: string | number) => {
  return axiosInstance.get<{
    artist: IArtist;
    hotSongs: IHotSong[];
    more: boolean;
    code: number;
  }>("/artists", { params: { id } });
};

export interface IHotSong {
  rtUrls: any[];
  ar: Ar[];
  al: Al;
  st: number;
  noCopyrightRcmd?: NoCopyrightRcmd;
  songJumpInfo?: any;
  pst: number;
  rtype: number;
  rurl?: any;
  alia: any[];
  pop: number;
  rt?: string;
  mst: number;
  cp: number;
  crbt?: any;
  cf: string;
  dt: number;
  rtUrl?: any;
  ftype: number;
  djId: number;
  no: number;
  fee: number;
  mv: number;
  t: number;
  v: number;
  h: H;
  l: H;
  sq?: H;
  hr?: any;
  cd: string;
  a?: any;
  m: H;
  name: string;
  id: number;
  privilege: Privilege;
}

interface Privilege {
  id: number;
  fee: number;
  payed: number;
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
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  rscl?: any;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}

interface ChargeInfoList {
  rate: number;
  chargeUrl?: any;
  chargeMessage?: any;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType?: any;
}

interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

interface NoCopyrightRcmd {
  type: number;
  typeDesc: string;
  songId: string;
}

interface Al {
  id: number;
  name: string;
  picUrl: string;
  pic_str: string;
  pic: number;
}

interface Ar {
  id: number;
  name: string;
  tns?: string[];
}

export interface IArtist {
  img1v1Id: number;
  topicPerson: number;
  alias: any[];
  picId: number;
  albumSize: number;
  briefDesc: string;
  musicSize: number;
  picUrl: string;
  img1v1Url: string;
  followed: boolean;
  trans: string;
  name: string;
  id: number;
  publishTime: number;
  accountId: number;
  picId_str: string;
  img1v1Id_str: string;
  mvSize: number;
}
