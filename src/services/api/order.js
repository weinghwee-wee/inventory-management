import axiosInstance from "./axios-instance";

export const createOrder = async (
  name,
  location,
  phoneNo,
  total,
  items,
  shippingFee
) => {
  const result = await axiosInstance.post("/order", {
    name,
    location,
    phoneNo,
    total,
    items,
    shippingFee,
  });

  return result.data;
};

export const getOrders = async () => {
  const result = await axiosInstance.get("/orders");

  return result.data;
};

// export const deleteProduct = async (id) => {
//   const result = await axiosInstance.delete(`/product/${id}`);

//   return result.data;
// }

export const editOrder = async (id, updateObject) => {
  const result = await axiosInstance.put(`/order/${id}`, updateObject);

  return result.data;
}
