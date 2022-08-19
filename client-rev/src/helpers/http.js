import axios from "axios";

const getBaseUrl = () => process.env.REACT_APP_API_URL;

export default axios.create({ baseURL: getBaseUrl(), withCredentials: true });
