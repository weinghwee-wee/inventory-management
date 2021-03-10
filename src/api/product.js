import axiosInstance from "./axios-instance";

export const createProduct = async (
  name,
  imageName,
  imageUrl,
  sellPrice,
  buyPrice,
  availableStock
) => {
  const result = await axiosInstance.post("/product", {
    name,
    imageName,
    imageUrl,
    sellPrice,
    buyPrice,
    availableStock,
  });

  return result.data;
};

export const getProducts = async (name) => {
  const result = await axiosInstance.get("/products", { params: { name } });

  return result.data;
};

export const deleteProduct = async (id) => {
  const result = await axiosInstance.delete(`/product/${id}`);

  return result.data;
}
