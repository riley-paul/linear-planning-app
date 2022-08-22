import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCenterline: null,
  loading: false,
  error: false,
};

export const centerlineSlice = createSlice({
  name: "centerline",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    setCenterline: (state, action) => {
      state.currentCenterline = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  fetchCenterline,
} = centerlineSlice.actions;

export default centerlineSlice.reducer;
