import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setProject,
} from "../redux/projectSlice";
import http from "../utils/http";

export const loadProjectHandler = (dispatch) => {
  const handleLoadProjects = async (id) => {
    dispatch(fetchStart());
    try {
      const res = await http.get(`/projects/${id}`);
      dispatch(fetchSuccess());
      dispatch(setProject(res.data));
    } catch (err) {
      dispatch(fetchFailure());
    }
  };
  return handleLoadProjects;
};
