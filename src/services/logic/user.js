import { loginUser } from "./auth";
import { register } from "../api";
import store from "../../redux/store";
import { showModalAction } from "../../redux/actions";

export const registerUser = async (email, name, password) => {
  const response = await register(email, name, password);
  if (!response.success) {
    store.dispatch(
      showModalAction("Registration Failed", response.error, null, "Close")
    );
  } else {
    await loginUser(email, name);
  }

  return response
};
