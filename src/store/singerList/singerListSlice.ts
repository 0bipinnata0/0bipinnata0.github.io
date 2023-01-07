import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppThunk } from "..";
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from "../../api/request";
import type { IHotSinger } from "../../api/request/getHotSingerListRequest";
import type { ISinger } from "../../api/request/getSingerListRequest";

type ISingerState = {
  value: {
    singerList: IHotSinger[];
    enterLoading: boolean;
    pullUpLoading: boolean;
    pullDownLoading: boolean;
    pageCount: number;
  };
  status: "idle" | "loading" | "failed";
};

const initialState: ISingerState = {
  value: {
    singerList: [],
    enterLoading: true, //控制进场Loading
    pullUpLoading: false, //控制上拉加载动画
    pullDownLoading: false, //控制下拉加载动画
    pageCount: 0, //这里是当前页数，我们即将实现分页功能
  },
  status: "idle",
};

const getHotSingerListAsync = createAsyncThunk<IHotSinger[], number>(
  "singer/getHotSingerListAsync",
  async (count) => {
    const response = await getHotSingerListRequest(count);
    return response.data.artists;
  }
);

const refreshMoreHotSingerListAsync = createAsyncThunk<IHotSinger[], number>(
  "singer/refreshMoreHotSingerListAsync",
  async (count) => {
    const response = await getHotSingerListRequest(count);
    return response.data.artists;
  }
);

const getSingerListAsync = createAsyncThunk<
  ISinger[],
  {
    singer: string;
    area: string;
    alpha: string;
  }
>("singer/getSingerListAsync", async ({ singer, area, alpha }) => {
  const response = await getSingerListRequest(singer, area, alpha, 0);
  return response.data.artists;
});

const refreshMoreSingerListAsync = createAsyncThunk<
  ISinger[],
  {
    singer: string;
    area: string;
    alpha: string;
    pageCount: number;
  }
>(
  "singer/refreshMoreSingerListAsync",
  async ({ singer, area, alpha, pageCount }) => {
    const response = await getSingerListRequest(singer, area, alpha, pageCount);
    return response.data.artists;
  }
);

export const singerListSlice = createSlice({
  name: "singer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changePageCount: (state, action: PayloadAction<number>) => {
      state.value.pageCount = action.payload;
    },
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.value.enterLoading = action.payload;
    },
    changePullUpLoading: (state, action: PayloadAction<boolean>) => {
      state.value.pullUpLoading = action.payload;
    },
    changePullDownLoading: (state, action: PayloadAction<boolean>) => {
      state.value.pullDownLoading = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // getHotSingerListAsync
      .addCase(getHotSingerListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHotSingerListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value.singerList = action.payload;
        state.value.enterLoading = false;
        state.value.pullUpLoading = false;
        state.value.pullDownLoading = false;
      })
      .addCase(getHotSingerListAsync.rejected, (state) => {
        console.log("热门歌手数据获取失败");
        state.status = "failed";
      })
      // refreshMoreHotSingerListAsync
      .addCase(refreshMoreHotSingerListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshMoreHotSingerListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value.singerList = [...state.value.singerList, ...action.payload];
        state.value.enterLoading = false;
        state.value.pullUpLoading = false;
        state.value.pullDownLoading = false;
      })
      .addCase(refreshMoreHotSingerListAsync.rejected, (state) => {
        console.log("热门歌手数据加载更多失败");
        state.status = "failed";
      })
      // getSingerListRequestAsync
      .addCase(getSingerListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingerListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value.singerList = action.payload;
        state.value.enterLoading = false;
        state.value.pullUpLoading = false;
        state.value.pullDownLoading = false;
      })
      .addCase(getSingerListAsync.rejected, (state) => {
        console.log("歌手数据获取失败");
        state.status = "failed";
      })
      // refreshMoreSingerListAsync
      .addCase(refreshMoreSingerListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshMoreSingerListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value.singerList = [...state.value.singerList, ...action.payload];
        state.value.enterLoading = false;
        state.value.pullUpLoading = false;
        state.value.pullDownLoading = false;
      })
      .addCase(refreshMoreSingerListAsync.rejected, (state) => {
        console.log("歌手数据获取失败");
        state.status = "failed";
      });
  },
});

export const {
  changePageCount,
  changeEnterLoading,
  changePullUpLoading,
  changePullDownLoading,
} = singerListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectSingerList = (state: RootState) => state.singerList.value;

//第一次加载热门歌手
export const getHotSingerList = (): AppThunk => (dispatch, getState) => {
  dispatch(getHotSingerListAsync(0));
};

//加载更多热门歌手
export const refreshMoreHotSingerList =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = selectSingerList(getState());
    dispatch(refreshMoreHotSingerListAsync(currentValue.pageCount));
  };

//第一次加载对应类别的歌手
export const getSingerList = (
  singer: string,
  area: string,
  alpha: string
): AppThunk => {
  return (dispatch) => dispatch(getSingerListAsync({ singer, area, alpha }));
};

//加载更多歌手
export const refreshMoreSingerList = (
  singer: string,
  area: string,
  alpha: string
): AppThunk => {
  return (dispatch, getState) => {
    const { pageCount } = selectSingerList(getState());
    return dispatch(
      refreshMoreSingerListAsync({ singer, area, alpha, pageCount })
    );
  };
};
export default singerListSlice.reducer;
