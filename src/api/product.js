import axiosInstance from "./axios-instance";

export const createProduct = async (
  name,
  image,
  sellPrice,
  buyPrice,
  availableStock
) => {
  const result = await axiosInstance.post("/product", {
    name,
    image,
    sellPrice,
    buyPrice,
    availableStock,
  });

  return result.data;
};

export const getProducts = async (name) => {
  const result = await axiosInstance.get("/products", { name });

  return result.data;
};
