import axios from "axios";
import { logoutUser } from "../logic";
import store from "../../redux/store";

/**
 * @deprecated
 */

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const axiosPublicInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// check for token
axiosInstance.interceptors.request.use(
  async (config) => {
    const authenticated = checkAuth();

    // call logout when the accesstoken is expired
    if (!authenticated) {
      // call logout
      await logoutUser();

      throw new Error("Unauthorized");
    } else {
      // set the new accesstoken to the request headers
      const { token } = store.getState();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    res.data.success = true;
    return res;
  },
  async (err) => {
    if (err.response) {
      err.response.data.success = false;
      return err.response;
    }

    // show error modal (Network error etc)
    // store.dispatch(showModalAction("Error", err.message, null, "Close"));

    return {
      data: {
        message: err.message,
        success: false,
      },
    };
  }
);

axiosPublicInstance.interceptors.response.use(
  (res) => {
    res.data.success = true;
    return res;
  },
  async (err) => {
    if (err.response) {
      err.response.data.success = false;
      return err.response;
    }

    // show error modal (Network error etc)
    // store.dispatch(showModalAction("Error", err.message, null, "Close"));

    return {
      data: {
        message: err.message,
        success: false,
      },
    };
  }
);

const checkAuth = async () => {
  const { token } = store.getState();
  if (!token) {
    return false;
  }

  return true;
};
