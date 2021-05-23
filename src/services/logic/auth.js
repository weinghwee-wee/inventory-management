import { login } from "../api";
import store from "../../redux/store";
import { setProfileAction, setTokenAction, showModalAction } from "../../redux/actions";

export const loginUser = async (email, password) => {
  const response = await login(email, password);

  if (response.success) {
    const { _id, email, name } = response.result.user;
    const { token } = response.result;

    store.dispatch(setProfileAction(_id, name, email));
    store.dispatch(setTokenAction(token));
  } else {
    store.dispatch(showModalAction("Login Failed", response.error, null, "Close"))
  }

  return response
};
