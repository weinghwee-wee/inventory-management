import axios from "axios";

/**
 * @deprecated
 */

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.response.use(
  (res) => {
    res.data.success = true
    return res
  },
  async (err) => {
    if (err.response) {
      err.response.data.success = false
      return err.response
    }

    // show error modal (Network error etc)
    // store.dispatch(showModalAction("Error", err.message, null, "Close"));

    return {
      data: {
        message: err.message,
        success: false
      },
    };
  }
);

export default axiosInstance;
