import DataModel from '../models/dataModel';

const API_URL = 'https://api.example.com';

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new DataModel(item.id, item.name));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
