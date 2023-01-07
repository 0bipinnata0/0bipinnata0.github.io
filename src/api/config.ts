import axios, { AxiosRequestConfig } from "axios";
const pendingMap = new Map();

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config: AxiosRequestConfig<any>) {
  let { url, method, params, data } = config;
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config: AxiosRequestConfig<any>) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}
/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: AxiosRequestConfig<any>) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}
// npx NeteaseCloudMusicApi
const createInstance = () => {
  const baseUrl = "https://music-api-five.vercel.app";
  //axios 的实例及拦截器配置
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10_000,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      removePending(config);
      addPending(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      removePending(response.config);
      return response;
    },
    (error) => {
      console.log(error, "网络错误");
      error.config && removePending(error.config);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

const axiosInstance = createInstance();

export { axiosInstance };

// 歌手种类
export const singerTypes = [
  {
    key: "-1",
    value: "全部",
  },
  { key: "1", value: "男歌手" },
  { key: "2", value: "女歌手" },
  { key: "3", value: "乐队" },
];
// 地区首字母
export const areaTypes = [
  {
    key: "-1",
    value: "全部",
  },
  {
    key: "7",
    value: "华语",
  },
  {
    key: "96",
    value: "欧美",
  },
  {
    key: "8",
    value: "日本",
  },
  {
    key: "16",
    value: "韩国",
  },
  {
    key: "0",
    value: "其他",
  },
];

// 歌手首字母

export const alphaTypes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .map((char) => ({ key: char, value: char }));
