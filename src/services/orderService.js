import { OrderModel } from '../models/orderModel';
import { getAuthHeaders } from './authService';
import { API_URL } from '../config';

export const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/orders/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new OrderModel(item._date, item._status, item._productList, item._codOrder));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrder = async (codOrder, newData) => {
  try {
    const response = await fetch(`${API_URL}/orders/${codOrder}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(newData),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }
    const data = await response.json();
    return new OrderModel(data._date, data._status, data._productList, data._codOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const addOrder = async (order) => {
  console.log(order)
  try {
    const response = await fetch(`${API_URL}/orders/generation`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(order),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }
    const data = await response.json();
    return new OrderModel(data._date, data._status, data._productList, data._codOrder);
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

export const removeOrder = async (codOrder) => {
  try {
    const response = await fetch(`${API_URL}/orders/${codOrder}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }
    return codOrder;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};