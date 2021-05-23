import axiosInstance from "./axios-instance";

export const register = async (email, name, password) => {
  const result = await axiosInstance.post("/user", {
    email,
    name,
    password,
  });

  return result.data;
};
