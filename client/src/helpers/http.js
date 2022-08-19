import axios from "../../../client-rev/node_modules/axios";

const getBaseUrl = () => process.env.REACT_APP_API_URL;

export default axios.create({ baseURL: getBaseUrl() });
