import { StorageModel, ZoneModel, CorridorModel, ShelfModel, ShelfProductModel } from '../models/logisticModel';
import { getAuthHeaders } from './authService';
import { API_URL } from '../config';

export const fetchAllStorages = async () => {
  try {
    const response = await fetch(`${API_URL}/storage/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new StorageModel(item._zoneCodeList, item._codStorage));
  } catch (error) {
    console.error('Error fetching storages:', error);
    throw error;
  }
};

export const fetchStorageByCode = async (codStorage) => {
  try {
    const response = await fetch(`${API_URL}/storage/${codStorage}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new StorageModel(data._zoneCodeList, data._codStorage);
  } catch (error) {
    console.error(`Error fetching storage with code ${codStorage}:`, error);
    throw error;
  }
};

export const generateZone = async (codStorage, zoneData) => {
  try {
    const response = await fetch(`${API_URL}/storage/${codStorage}/zone`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(zoneData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new ZoneModel(data._temperature, data._coolingSystemStatus, data._humidityLevel, data._corridorCodeList, data._codZone);
  } catch (error) {
    console.error('Error generating zone:', error);
    throw error;
  }
};

export const fetchZoneByCode = async (codZone) => {
  try {
    const response = await fetch(`${API_URL}/logistics/zone/${codZone}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new ZoneModel(data._temperature, data._coolingSystemStatus, data._humidityLevel, data._corridorCodeList, data._codZone);
  } catch (error) {
    console.error(`Error fetching storage with code ${codZone}:`, error);
    throw error;
  }
};

export const getAllZones = async (codStorage) => {
  try {
    const response = await fetch(`${API_URL}/logistics/storage/${codStorage}/zone`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    const promises = data.map(item => fetchZoneByCode(item));
    const zones = await Promise.all(promises);
    return zones;
  } catch (error) {
    console.error('Error fetching all zones:', error);
    throw error;
  }
};

export const generateCorridor = async (codZone, corridorData) => {
  try {
    const response = await fetch(`${API_URL}/zone/${codZone}/corridor`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(corridorData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new CorridorModel(data._name, data._shelfCodeList, data._codCorridor);
  } catch (error) {
    console.error('Error generating corridor:', error);
    throw error;
  }
};

export const getAllCorridors = async (codZone) => {
  try {
    const response = await fetch(`${API_URL}/zone/${codZone}/corridor`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new CorridorModel(item._name, item._shelfCodeList, item._codCorridor));
  } catch (error) {
    console.error('Error fetching all corridors:', error);
    throw error;
  }
};

export const generateShelf = async (codCorridor, shelfData) => {
  try {
    const response = await fetch(`${API_URL}/corridor/${codCorridor}/shelf`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(shelfData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new ShelfModel(data._name, data._productList, data._codShelf);
  } catch (error) {
    console.error('Error generating shelf:', error);
    throw error;
  }
};

export const getAllShelfs = async (codCorridor) => {
  try {
    const response = await fetch(`${API_URL}/corridor/${codCorridor}/shelf`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new ShelfModel(item._name, item._productList, item._codShelf));
  } catch (error) {
    console.error('Error fetching all shelfs:', error);
    throw error;
  }
};

export const generateStorage = async (storageData) => {
  try {
    const response = await fetch(`${API_URL}/storage/generation`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(storageData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new StorageModel(data._zoneCodeList, data._codStorage);
  } catch (error) {
    console.error('Error generating storage:', error);
    throw error;
  }
};

export const getAllStorages = async () => {
  try {
    const response = await fetch(`${API_URL}/logistics/storage/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new StorageModel(item._zoneCodeList, item._codStorage));
  } catch (error) {
    console.error('Error fetching all storages:', error);
    throw error;
  }
};

export const addProductToShelf = async (codShelf, productData) => {
  try {
    const response = await fetch(`${API_URL}/shelf/${codShelf}/product`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new ShelfProductModel(data._codProduct, data._stock);
  } catch (error) {
    console.error('Error adding product to shelf:', error);
    throw error;
  }
};

export const getProductFromShelf = async (codShelf, codProduct) => {
  try {
    const response = await fetch(`${API_URL}/shelf/${codShelf}/product/${codProduct}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new ShelfProductModel(data._codProduct, data._stock);
  } catch (error) {
    console.error('Error fetching product from shelf:', error);
    throw error;
  }
};

export const updateProductInShelf = async (codShelf, codProduct, productData) => {
  try {
    const response = await fetch(`${API_URL}/shelf/${codShelf}/product/${codProduct}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new ShelfProductModel(data._codProduct, data._stock);
  } catch (error) {
    console.error('Error updating product in shelf:', error);
    throw error;
  }
};

export const deleteProductFromShelf = async (codShelf, codProduct) => {
  try {
    const response = await fetch(`${API_URL}/shelf/${codShelf}/product/${codProduct}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return;
  } catch (error) {
    console.error('Error deleting product from shelf:', error);
    throw error;
  }
};

export const deleteZone = async (codZone) => {
  try {
    const response = await fetch(`${API_URL}/zone/${codZone}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return;
  } catch (error) {
    console.error('Error deleting zone:', error);
    throw error;
  }
};
export const searchProductsOnShelves = async (productName) => {
  try {
    const response = await fetch(`${API_URL}/shelf/product/search?name=${encodeURIComponent(productName)}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new ShelfProductModel(item._codProduct, item._stock));
  } catch (error) {
    console.error('Error searching products on shelves:', error);
    throw error;
  }
};

// Elimina un corridoio dato il suo codice
export const deleteCorridor = async (codCorridor) => {
  try {
    const response = await fetch(`${API_URL}/corridor/${codCorridor}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return;
  } catch (error) {
    console.error('Error deleting corridor:', error);
    throw error;
  }
};

export const deleteShelf = async (codShelf) => {
  try {
    const response = await fetch(`${API_URL}/shelf/${codShelf}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return;
  } catch (error) {
    console.error('Error deleting shelf:', error);
    throw error;
  }
};

export const updateZone = async (codZone, zoneData) => {
  try {
    const response = await fetch(`${API_URL}/zone/${codZone}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zoneData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error updating zone:', error);
    throw error;
  }
};

export const searchStoragesByName = async (name) => {
  try {
    const response = await fetch(`${API_URL}/storages/search?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error searching storages by name:', error);
    throw error;
  }
};