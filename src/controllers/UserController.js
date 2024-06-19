import { fetchUser, updateUser, deleteUser, fetchAllUsers } from '../services/userService';

export const getUser = async (codUser) => {
  return await fetchUser(codUser);
};

export const saveUser = async (codUser, userData) => {
  const dataToSend = { ...userData };
  delete dataToSend._codUser;
  return await updateUser(codUser, dataToSend);
};

export const removeUser = async (user) => {
  return await deleteUser(user._codUser);
};

export const getAllUsers = async () => {
  return await fetchAllUsers();
};