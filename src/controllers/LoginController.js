import { login } from '../services/authService';

export const loginUser = async (username, password) => {
  return await login(username, password);
};
