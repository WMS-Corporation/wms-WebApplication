import { fetchProducts, updateProduct, removeProduct } from '../services/productService';

export const getProducts = async () => {
  return await fetchProducts();
};

export const saveProduct = async (id, newData) => {
  const dataToSend = { ...newData };
  delete dataToSend._codProduct;
  return await updateProduct(id, dataToSend);
};

export const deleteProduct = async (product) => {
  return await removeProduct(product._codProduct);
};