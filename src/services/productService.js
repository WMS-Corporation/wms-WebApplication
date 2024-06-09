// src/services/ProductService.js
import ProductModel from '../models/productModel';
import { getAuthHeaders } from './authService';

const API_URL = 'http://localhost:3000';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new ProductModel(item.id, item.name, item.quantity));
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
    return new ProductModel(data.id, data.name, data.quantity);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
