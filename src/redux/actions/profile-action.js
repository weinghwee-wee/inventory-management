import { SET_PROFILE } from "../types";

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
