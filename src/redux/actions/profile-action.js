import { SET_PROFILE, CLEAR_PROFILE } from "../types";

export const setProfileAction = (id, name, email) => {
  return {
    type: SET_PROFILE,
    payload: {
      id,
      name,
      email,
    },
  };
};

export const clearProfileAction = () => {
  return {
    type: CLEAR_PROFILE,
  };
};
