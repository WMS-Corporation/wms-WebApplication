
import LoginModel from '../models/loginModel';

const API_URL = 'http://localhost:3000/api';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(new LoginModel(username, password)),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.token; // Assuming the token is returned in the 'token' field
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};
