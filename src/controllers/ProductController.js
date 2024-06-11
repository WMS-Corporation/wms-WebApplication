// src/controllers/ProductController.js
import { fetchProducts, updateProduct, removeProduct } from '../services/productService';

export const getProducts = async () => {
  return await fetchProducts();
};

export const saveProduct = async (id, newData) => {
  return await updateProduct(id, newData);
};

export const editProduct = async (product) => {
  return await updateProduct(product._codProduct, product);
};

export const deleteProduct = async (product) => {
  return await removeProduct(product._codProduct);
};