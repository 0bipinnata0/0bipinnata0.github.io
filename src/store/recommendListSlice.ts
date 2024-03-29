import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from ".";
import { getRecommendListRequest } from "../api/request";

export type IRecommend = {
  id: number;
  picUrl: string;
  playCount: number;
  name: string;
};
type IRecommendState = {
  value: IRecommend[];
  status: "idle" | "loading" | "failed";
};

const initialState: IRecommendState = {
  value: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getRecommendAsync = createAsyncThunk(
  "recommend/fetchRecommend",
  async () => {
    const response = await getRecommendListRequest();
    // The value we return becomes the `fulfilled` action payload
    return response.data.result;
  }
);

export const recommendListSlice = createSlice({
  name: "recommend",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecommendAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getRecommendAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = recommendListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectRecommendList = (state: RootState) => state.recommendList;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export const getRecommendList = (): AppThunk => (dispatch, getState) => {
  // const currentValue = selectRecommendList(getState());
  dispatch(getRecommendAsync());
};

export default recommendListSlice.reducer;
