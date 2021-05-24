import { CLEAR_PROFILE, SET_PROFILE } from "../types";

const initialState = {
  id: "",
  email: "",
  name: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload;
    case CLEAR_PROFILE:
      return initialState;
    default:
      return state;
  }
};

export default profileReducer;
