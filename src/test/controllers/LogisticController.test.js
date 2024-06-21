import * as logisticController from '../../controllers/LogisticController';
import {
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
    deleteProductFromShelf,
    searchStoragesByName, 
    deleteCorridor, 
    deleteShelf, 
    updateZone 
} from '../../services/logisticService';


jest.mock('../../services/logisticService');

describe('LogisticController', () => {
    it('should add a product to a shelf', async () => {
        const codShelf = 'shelf123';
        const product = { codProduct: 'prod123', stock: 10 };
        const expectedResponse = { success: true };

        addProductToShelf.mockImplementation(async () => expectedResponse);

        const result = await logisticController.addProduct(codShelf, product);

        expect(addProductToShelf).toHaveBeenCalledWith(codShelf, product);
        expect(result).toEqual(expectedResponse);
    });

    it('should get a product from a shelf', async () => {
        const codShelf = 'shelf123';
        const codProduct = 'prod123';
        const expectedProduct = { codProduct: 'prod123', stock: 10 };

        getProductFromShelf.mockImplementation(async () => expectedProduct);

        const result = await logisticController.getProduct(codShelf, codProduct);

        expect(getProductFromShelf).toHaveBeenCalledWith(codShelf, codProduct);
        expect(result).toEqual(expectedProduct);
    });

    it('should update a product in a shelf', async () => {
        const codShelf = 'shelf123';
        const codProduct = 'prod123';
        const productData = { stock: 20 };
        const expectedResponse = { success: true };

        updateProductInShelf.mockImplementation(async () => expectedResponse);

        const result = await logisticController.updateProduct(codShelf, codProduct, productData);

        expect(updateProductInShelf).toHaveBeenCalledWith(codShelf, codProduct, productData);
        expect(result).toEqual(expectedResponse);
    });

    it('should delete a product from a shelf', async () => {
        const codShelf = 'shelf123';
        const codProduct = 'prod123';
        const expectedResponse = { success: true };

        deleteProductFromShelf.mockImplementation(async () => expectedResponse);

        const result = await logisticController.deleteProduct(codShelf, codProduct);

        expect(deleteProductFromShelf).toHaveBeenCalledWith(codShelf, codProduct);
        expect(result).toEqual(expectedResponse);
    });
    it('should create a shelf in a corridor', async () => {
        const codCorridor = 'corridor123';
        const shelfData = { name: 'Shelf A', productList: [], codShelf: 'shelf123' };
        const expectedResponse = { success: true };

        generateShelf.mockImplementation(async () => expectedResponse);

        const result = await logisticController.createShelf(codCorridor, shelfData);

        expect(generateShelf).toHaveBeenCalledWith(codCorridor, shelfData);
        expect(result).toEqual(expectedResponse);
    });

    it('should get all shelves in a corridor', async () => {
        const codCorridor = 'corridor123';
        const expectedResponse = [{ name: 'Shelf A', productList: [], codShelf: 'shelf123' }];

        getAllShelfs.mockImplementation(async () => expectedResponse);

        const result = await logisticController.getShelfs(codCorridor);

        expect(getAllShelfs).toHaveBeenCalledWith(codCorridor);
        expect(result).toEqual(expectedResponse);
    });

    it('should create a corridor in a zone', async () => {
        const codZone = 'zone123';
        const corridorData = { name: 'Corridor A', shelfCodeList: [], codCorridor: 'corridor123' };
        const expectedResponse = { success: true };

        generateCorridor.mockImplementation(async () => expectedResponse);

        const result = await logisticController.createCorridor(codZone, corridorData);

        expect(generateCorridor).toHaveBeenCalledWith(codZone, corridorData);
        expect(result).toEqual(expectedResponse);
    });

    it('should get all corridors in a zone', async () => {
        const codZone = 'zone123';
        const expectedResponse = [{ name: 'Corridor A', shelfCodeList: [], codCorridor: 'corridor123' }];

        getAllCorridors.mockImplementation(async () => expectedResponse);

        const result = await logisticController.getCorridors(codZone);

        expect(getAllCorridors).toHaveBeenCalledWith(codZone);
        expect(result).toEqual(expectedResponse);
    });

    it('should create a zone in a storage', async () => {
        const codStorage = 'storage123';
        const zoneData = { temperature: 5, coolingSystemStatus: 'active', humidityLevel: 30, corridorCodeList: [], codZone: 'zone123' };
        const expectedResponse = { success: true };

        generateZone.mockImplementation(async () => expectedResponse);

        const result = await logisticController.createZone(codStorage, zoneData);

        expect(generateZone).toHaveBeenCalledWith(codStorage, zoneData);
        expect(result).toEqual(expectedResponse);
    });

    it('should get all zones in a storage', async () => {
        const codStorage = 'storage123';
        const expectedResponse = [{ temperature: 5, coolingSystemStatus: 'active', humidityLevel: 30, corridorCodeList: [], codZone: 'zone123' }];

        getAllZones.mockImplementation(async () => expectedResponse);

        const result = await logisticController.getZones(codStorage);

        expect(getAllZones).toHaveBeenCalledWith(codStorage);
        expect(result).toEqual(expectedResponse);
    });

    it('should create a storage', async () => {
        const storageData = { zoneCodeList: [], codStorage: 'storage123' };
        const expectedResponse = { success: true };

        generateStorage.mockImplementation(async () => expectedResponse);

        const result = await logisticController.createStorage(storageData);

        expect(generateStorage).toHaveBeenCalledWith(storageData);
        expect(result).toEqual(expectedResponse);
    });

    it('should get all storages', async () => {
        const expectedResponse = [{ zoneCodeList: [], codStorage: 'storage123' }];

        getAllStorages.mockImplementation(async () => expectedResponse);

        const result = await logisticController.getStorages();

        expect(getAllStorages).toHaveBeenCalled();
        expect(result).toEqual(expectedResponse);
    });

    it('should get a storage by code', async () => {
        const codStorage = 'storage123';
        const expectedResponse = { zoneCodeList: [], codStorage: 'storage123' };

        fetchStorageByCode.mockImplementation(async () => expectedResponse);

        const result = await logisticController.getStorage(codStorage);

        expect(fetchStorageByCode).toHaveBeenCalledWith(codStorage);
        expect(result).toEqual(expectedResponse);
    });
});

describe('createShelf', () => {
    it('should create a new shelf in a corridor', async () => {
        const codCorridor = 'corridor123';
        const shelfData = { name: 'Shelf A', capacity: 100 };
        generateShelf.mockResolvedValue(shelfData);

        const result = await logisticController.createShelf(codCorridor, shelfData);

        expect(generateShelf).toHaveBeenCalledWith(codCorridor, shelfData);
        expect(result).toEqual(shelfData);
    });
});

describe('getShelfs', () => {
    it('should retrieve all shelves in a corridor', async () => {
        const codCorridor = 'corridor123';
        const shelves = [{ name: 'Shelf A', capacity: 100 }];
        getAllShelfs.mockResolvedValue(shelves);

        const result = await logisticController.getShelfs(codCorridor);

        expect(getAllShelfs).toHaveBeenCalledWith(codCorridor);
        expect(result).toEqual(shelves);
    });
});

describe('createCorridor', () => {
    it('should create a new corridor in a zone', async () => {
        const codZone = 'zone123';
        const corridorData = { name: 'Corridor 1', length: 50 };
        generateCorridor.mockResolvedValue(corridorData);

        const result = await logisticController.createCorridor(codZone, corridorData);

        expect(generateCorridor).toHaveBeenCalledWith(codZone, corridorData);
        expect(result).toEqual(corridorData);
    });
});

describe('getCorridors', () => {
    it('should retrieve all corridors in a zone', async () => {
        const codZone = 'zone123';
        const corridors = [{ name: 'Corridor 1', length: 50 }];
        getAllCorridors.mockResolvedValue(corridors);

        const result = await logisticController.getCorridors(codZone);

        expect(getAllCorridors).toHaveBeenCalledWith(codZone);
        expect(result).toEqual(corridors);
    });
});

describe('createZone', () => {
    it('should create a new zone in a storage', async () => {
        const codStorage = 'storage123';
        const zoneData = { name: 'Zone A', temperature: 20 };
        generateZone.mockResolvedValue(zoneData);

        const result = await logisticController.createZone(codStorage, zoneData);

        expect(generateZone).toHaveBeenCalledWith(codStorage, zoneData);
        expect(result).toEqual(zoneData);
    });
});

describe('getZones', () => {
    it('should retrieve all zones in a storage', async () => {
        const codStorage = 'storage123';
        const zones = [{ name: 'Zone A', temperature: 20 }];
        getAllZones.mockResolvedValue(zones);

        const result = await logisticController.getZones(codStorage);

        expect(getAllZones).toHaveBeenCalledWith(codStorage);
        expect(result).toEqual(zones);
    });
});

describe('createStorage', () => {
    it('should create a new storage', async () => {
        const storageData = { name: 'Storage 1', location: 'Location A' };
        generateStorage.mockResolvedValue(storageData);

        const result = await logisticController.createStorage(storageData);

        expect(generateStorage).toHaveBeenCalledWith(storageData);
        expect(result).toEqual(storageData);
    });
});

describe('getStorages', () => {
    it('should retrieve all storages', async () => {
        const storages = [{ name: 'Storage 1', location: 'Location A' }];
        getAllStorages.mockResolvedValue(storages);

        const result = await logisticController.getStorages();

        expect(getAllStorages).toHaveBeenCalled();
        expect(result).toEqual(storages);
    });
});

describe('getStorage', () => {
    it('should retrieve a storage by code', async () => {
        const codStorage = 'storage123';
        const storage = { name: 'Storage 1', location: 'Location A' };
        fetchStorageByCode.mockResolvedValue(storage);

        const result = await logisticController.getStorage(codStorage);

        expect(fetchStorageByCode).toHaveBeenCalledWith(codStorage);
        expect(result).toEqual(storage);
    });
});

it('should create a storage', async () => {
    const storageData = { zoneCodeList: [], codStorage: 'storage123' };
    const expectedResponse = { success: true };

    generateStorage.mockImplementation(async () => expectedResponse);

    const result = await logisticController.createStorage(storageData);

    expect(generateStorage).toHaveBeenCalledWith(storageData);
    expect(result).toEqual(expectedResponse);
});

it('should get all storages', async () => {
    const expectedResponse = [{ codStorage: 'storage123', zoneCodeList: [] }];

    getAllStorages.mockImplementation(async () => expectedResponse);

    const result = await logisticController.getStorages();

    expect(getAllStorages).toHaveBeenCalled();
    expect(result).toEqual(expectedResponse);
});

it('should get a specific storage by code', async () => {
    const codStorage = 'storage123';
    const expectedResponse = { codStorage: 'storage123', zoneCodeList: [] };

    fetchStorageByCode.mockImplementation(async () => expectedResponse);

    const result = await logisticController.getStorage(codStorage);

    expect(fetchStorageByCode).toHaveBeenCalledWith(codStorage);
    expect(result).toEqual(expectedResponse);
});

it('should search storages by name', async () => {
    const name = 'Warehouse A';
    const expectedResponse = [{ codStorage: 'storage123', name: 'Warehouse A' }];

    searchStoragesByName.mockImplementation(async () => expectedResponse);

    const result = await logisticController.searchStorages(name);

    expect(searchStoragesByName).toHaveBeenCalledWith(name);
    expect(result).toEqual(expectedResponse);
});

it('should remove a corridor', async () => {
    const codCorridor = 'corridor123';
    const expectedResponse = { success: true };

    deleteCorridor.mockImplementation(async () => expectedResponse);

    const result = await logisticController.removeCorridor(codCorridor);

    expect(deleteCorridor).toHaveBeenCalledWith(codCorridor);
    expect(result).toEqual(expectedResponse);
});

it('should remove a shelf', async () => {
    const codShelf = 'shelf123';
    const expectedResponse = { success: true };

    deleteShelf.mockImplementation(async () => expectedResponse);

    const result = await logisticController.removeShelf(codShelf);

    expect(deleteShelf).toHaveBeenCalledWith(codShelf);
    expect(result).toEqual(expectedResponse);
});

it('should modify a zone', async () => {
    const codZone = 'zone123';
    const zoneData = { temperature: 5, coolingSystemStatus: 'active' };
    const expectedResponse = { success: true };

    updateZone.mockImplementation(async () => expectedResponse);

    const result = await logisticController.modifyZone(codZone, zoneData);

    expect(updateZone).toHaveBeenCalledWith(codZone, zoneData);
    expect(result).toEqual(expectedResponse);
});