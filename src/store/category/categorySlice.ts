import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

type ICategoryState = { singer: string; area: string; alpha: string };

const initialState: ICategoryState = {
  singer: "",
  area: "",
  alpha: "",
};

export const categoryListSlice = createSlice({
  name: "category",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeSinger: (state, action: PayloadAction<string>) => {
      state.singer = action.payload;
    },
    changeArea: (state, action: PayloadAction<string>) => {
      state.area = action.payload;
    },
    changeAlpha: (state, action: PayloadAction<string>) => {
      state.alpha = action.payload;
    },
  },
});

export const { changeSinger, changeArea, changeAlpha } =
  categoryListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectCategory = (state: RootState) => state.category;

export default categoryListSlice.reducer;
