import axios from "axios";

/**
 * @deprecated
 */
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default axiosInstance;
