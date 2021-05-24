import { axiosPublicInstance } from "./axios-instance";

export const login = async (email, password) => {
  const result = await axiosPublicInstance.post("/login", {
    email,
    password,
  });

  return result.data;
};

export const logout = async (token) => {
  const result = await axiosPublicInstance.post("/logout", {
    token,
  });

  return result.data;
};
