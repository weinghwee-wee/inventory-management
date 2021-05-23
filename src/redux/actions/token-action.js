import { SET_TOKEN } from "../types";

export const setTokenAction = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};
