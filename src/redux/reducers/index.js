import { combineReducers } from "redux";
import modalReducer from "./modal-reducer";
import profileReducer from "./profile-reducer";
import tokenReducer from "./token-reducer";

export default combineReducers({
  modal: modalReducer,
  profile: profileReducer,
  token: tokenReducer,
});
