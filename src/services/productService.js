// src/services/ProductService.js
import ProductModel from '../models/productModel';
import { getAuthHeaders } from './authService';
import { API_URL } from '../config';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new ProductModel(item._codProduct, item._name, item._category, item._expirationDate, item._type));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const updateProduct = async (id, newData) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(newData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new ProductModel(data.id, data.name, data.category, data.expirationDate, data.type);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}/products/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new ProductModel(data.id, data.name, data.category, data.expirationDate, data.type);
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const removeProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return id;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
