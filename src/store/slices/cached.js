import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isImageCachingGoingOn: false,
  isPatternLoading: false,
  isSVGLoading: false,
  images: {
    svg: "",
    patterns: {},
  },
};

export const cachedSlice = createSlice({
  name: "cached",
  initialState,
  reducers: {
    setImageCachingGoingOn: (state, action) => {
      state.isImageCachingGoingOn = action.payload;
    },
    setSVG: (state, action) => {
      state.images.svg = action.payload;
    },
  },
});

export const { setImageCachingGoingOn, setSVG } = cachedSlice.actions;

export default cachedSlice.reducer;
