import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import albumDetailSlice from "./albumDetail/albumDetailSlice";
import bannerListSlice from "./bannerListSlice";
import categorySlice from "./category/categorySlice";
import rankListSlice from "./rankList/rankListSlice";
import recommendListSlice from "./recommendListSlice";
import singerInfoSlice from "./singerInfo/singerInfoSlice";
import singerListSlice from "./singerList/singerListSlice";

export const store = configureStore({
  reducer: {
    bannerList: bannerListSlice,
    recommendList: recommendListSlice,
    singerList: singerListSlice,
    category: categorySlice,
    rankList: rankListSlice,
    album: albumDetailSlice,
    singerInfo: singerInfoSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
