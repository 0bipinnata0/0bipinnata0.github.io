import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState, AppThunk } from "..";
import { getSingerInfoRequest } from "../../api/request";
import type { IHotSong, IArtist } from "../../api/request/getSingerInfoRequest";

type ISingerInfoState = {
  artist?: IArtist;
  hotSongs: IHotSong[];
  status: "idle" | "loading" | "failed";
};

const initialState: ISingerInfoState = {
  hotSongs: [],
  status: "idle",
};

const getCurrentSingerInfoAsync = createAsyncThunk<
  {
    artist: IArtist;
    hotSongs: IHotSong[];
  },
  string
>("singerInfo/getSingerInfo", async (id) => {
  const response = await getSingerInfoRequest(id);
  return response.data;
});

export const singerInfoDetailSlice = createSlice({
  name: "singerInfo",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // changePageCount: (state, action: PayloadAction<number>) => {
    //   state.value.pageCount = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // changeSingerInfoDetailAsync
      .addCase(getCurrentSingerInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentSingerInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const { hotSongs, artist } = action.payload;
        state.artist = artist;
        state.hotSongs = hotSongs;
      })
      .addCase(getCurrentSingerInfoAsync.rejected, (state) => {
        console.log("获取 singerInfo 数据失败！");
        state.status = "failed";
      });
  },
});

export const selectSingerInfo = (state: RootState) => state.singerInfo;

export const changeSingerInfo = (id: string): AppThunk => {
  return (dispatch) => dispatch(getCurrentSingerInfoAsync(id));
};

export default singerInfoDetailSlice.reducer;
