import UserModel from '../models/userModel';
import { getAuthHeaders } from './authService';
import { API_URL } from '../config';

export const fetchUser = async (codUser) => {
  try {
    const response = await fetch(`${API_URL}/users/${codUser}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new UserModel(data._codUser, data._username, data._password, data._name, data._surname, data._type);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (codUser, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${codUser}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (codUser) => {
  try {
    const response = await fetch(`${API_URL}/users/${codUser}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }
    const data = await response.json();
    return data.map(item => new UserModel(item._codUser, item._username, item._password, item._name, item._surname, item._type));
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};