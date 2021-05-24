import { axiosPublicInstance } from "./axios-instance";

export const register = async (email, name, password) => {
  const result = await axiosPublicInstance.post("/user", {
    email,
    name,
    password,
  });

  return result.data;
};
