import { 
    fetchAllStorages,
    fetchStorageByCode,
    generateZone,
    getAllZones,
    generateCorridor,
    getAllCorridors,
    generateShelf,
    getAllShelfs,
    generateStorage,
    getAllStorages,
    addProductToShelf, 
    getProductFromShelf, 
    updateProductInShelf, 
    deleteProductFromShelf
  } from '../services/logisticService';
  
  export const addProduct = async (codShelf, product) => {
    return await addProductToShelf(codShelf, product);
  };
  
  export const getProduct = async (codShelf, codProduct) => {
    return await getProductFromShelf(codShelf, codProduct);
  };
  
  export const updateProduct = async (codShelf, codProduct, productData) => {
    return await updateProductInShelf(codShelf, codProduct, productData);
  };
  
  export const deleteProduct = async (codShelf, codProduct) => {
    return await deleteProductFromShelf(codShelf, codProduct);
  };
  
  export const createShelf = async (codCorridor, shelfData) => {
    return await generateShelf(codCorridor, shelfData);
  };
  
  export const getShelfs = async (codCorridor) => {
    return await getAllShelfs(codCorridor);
  };
  
  export const createCorridor = async (codZone, corridorData) => {
    return await generateCorridor(codZone, corridorData);
  };
  
  export const getCorridors = async (codZone) => {
    return await getAllCorridors(codZone);
  };
  
  export const createZone = async (codStorage, zoneData) => {
    return await generateZone(codStorage, zoneData);
  };
  
  export const getZones = async (codStorage) => {
    return await getAllZones(codStorage);
  };
  
  export const createStorage = async (storageData) => {
    return await generateStorage(storageData);
  };
  
  export const getStorages = async () => {
    return await getAllStorages();
  };
  
  export const getStorage = async (codStorage) => {
    return await fetchStorageByCode(codStorage);
  };