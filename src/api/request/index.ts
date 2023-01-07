import { axiosInstance } from "../config";
export { getHotSingerListRequest } from "./getHotSingerListRequest";
export { getSingerListRequest } from "./getSingerListRequest";
export { getRankListRequest } from "./getRankListRequest";
export { getAlbumDetailRequest } from "./getAlbumDetailRequest";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};
