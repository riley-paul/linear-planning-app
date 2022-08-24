import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  deleteProject,
  setProjects,
  addProject,
} from "../redux/projectsSlice";
import http from "../utils/http";

export const loadProjectsHandler = (dispatch) => {
  const handleLoadProjects = async () => {
    dispatch(fetchStart());
    try {
      const res = await http.get(`/projects`);
      dispatch(fetchSuccess());
      dispatch(setProjects(res.data));
    } catch (err) {
      dispatch(fetchFailure());
    }
  };
  return handleLoadProjects;
};

export const deleteProjectHandler = (dispatch) => {
  const handleDeleteProject = async (id) => {
    dispatch(fetchStart());
    try {
      await http.delete(`/projects/${id}`);
      dispatch(fetchSuccess());
      dispatch(deleteProject(id));
    } catch (err) {
      dispatch(fetchFailure());
    }
  };
  return handleDeleteProject;
};

export const addProjectHandler = (dispatch) => {
  const handleAddProject = async (data) => {
    dispatch(fetchStart());
    try {
      const res = await http.post(`/projects`, data);
      dispatch(fetchSuccess());
      dispatch(addProject(res.data));
    } catch (err) {
      dispatch(fetchFailure());
    }
  };
  return handleAddProject;
};