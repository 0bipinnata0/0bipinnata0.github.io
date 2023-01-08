import { axiosInstance } from "../config";

export const getHotSingerListRequest = (count: number) => {
  const limit = 30;
  return axiosInstance.get<{
    artists: IHotSinger[];
    code: number;
    more: boolean;
  }>(`/top/artists`, {
    params: {
      limit,
      offset: limit * count,
    },
  });
};

export interface IHotSinger {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: string[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  showPrivateMsg?: any;
  isSubed?: any;
  accountId?: number;
  picId_str?: string;
  img1v1Id_str?: string;
  transNames?: string[];
  followed: boolean;
  mvSize?: any;
  publishTime?: any;
  identifyTag?: any;
  alg?: any;
  fansCount: number;
}
