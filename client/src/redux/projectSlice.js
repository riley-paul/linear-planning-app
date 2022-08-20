import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProject: null,
  loading: false,
  error: false,
};

export const projectSlice = createSlice({
  name: "project",
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
    fetchProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  fetchProject,
} = projectSlice.actions;

export default projectSlice.reducer;
