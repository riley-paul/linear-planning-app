import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProjects: [],
  loading: false,
  error: false,
};

export const projectsSlice = createSlice({
  name: "projects",
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
    deleteProject: (state, action) => {
      state.currentProjects = state.currentProjects.filter(
        (project) => project._id !== action.payload
      );
    },
    setProjects: (state, action) => {
      state.currentProjects = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  deleteProject,
  setProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;
