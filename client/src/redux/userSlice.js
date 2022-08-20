import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    logoutFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
