import { fetchData } from '../services/homeService';

export const getData = async () => {
  return await fetchData();
};