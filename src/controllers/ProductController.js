// src/controllers/ProductController.js
import { fetchProducts, updateProduct } from '../services/productService';

export const getProducts = async () => {
  return await fetchProducts();
};

export const saveProduct = async (id, newData) => {
  return await updateProduct(id, newData);
};
