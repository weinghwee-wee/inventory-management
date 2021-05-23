import axiosInstance from "./axios-instance";

export const login = async (email, password) => {
  const result = await axiosInstance.post("/login", {
    email,
    password,
  });

  return result.data;
};
