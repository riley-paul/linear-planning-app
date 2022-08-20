import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../redux/userSlice";
import http from "../utils/http";

export const logoutHandler = (dispatch) => {
  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutStart());
    try {
      const res = await http.post("/auth/logout");
      dispatch(logoutSuccess(res.data));
    } catch (err) {
      dispatch(logoutFailure());
    }
  };
  return handleLogout;
};

export const loginHandler = (dispatch, userCred) => {
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await http.post("/auth/login", userCred);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  return handleLogin;
};

export const registerHandler = (dispatch, userCred) => {
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await http.post("/auth/register", userCred);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  return handleRegister;
};
