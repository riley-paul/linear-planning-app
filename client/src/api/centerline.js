import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setCenterline,
} from "../redux/centerlineSlice";
import http from "../utils/http";

export const loadProjectHandler = (dispatch) => {
  const handleLoadCenterline = async (id) => {
    dispatch(fetchStart());
    try {
      const res = await http.get(`/centerlines/${id}`);
      dispatch(fetchSuccess());
      dispatch(setCenterline(res.data));
    } catch (err) {
      dispatch(fetchFailure());
    }
  };
  return handleLoadCenterline;
};

export const addCenterlineHandler = (dispatch) => {
  const handleAddCenterline = async (data) => {
    dispatch(fetchStart());
    try {
      const res = await http.post(`/centerlines`, data);
      dispatch(fetchSuccess());
      dispatch(setCenterline(res.data));
    } catch (err) {
      dispatch(fetchFailure());
    }
  };
  return handleAddCenterline;
};
