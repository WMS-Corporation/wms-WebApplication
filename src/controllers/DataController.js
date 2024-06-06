import { fetchData } from '../services/apiService';

export const getData = async () => {
  return await fetchData();
};