import { axiosInstance } from "../config";

export interface ISinger {
  albumSize: number;
  alias: any[];
  briefDesc: string;
  fansCount: number;
  followed: boolean;
  id: number;
  img1v1Id: number;
  img1v1Id_str?: string;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picId_str?: string;
  picUrl: string;
  topicPerson: number;
  trans: string;
  transNames?: string[];
  accountId?: number;
}

export const getSingerListRequest = (
  singer: string,
  area: string,
  alpha: string,
  offset?: number
) => {
  return axiosInstance.get<{
    artists: ISinger[];
    code: number;
    more: boolean;
  }>(`/artist/list`, {
    params: {
      type: singer,
      area,
      initial: alpha.toLowerCase(),
      offset,
    },
  });
};
