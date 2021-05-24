import { CLEAR_TOKEN, SET_TOKEN } from "../types";

export const setTokenAction = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const clearTokenAction = () => {
  return {
    type: CLEAR_TOKEN,
  };
};
