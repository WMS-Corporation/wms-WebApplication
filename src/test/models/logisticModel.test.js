const { StorageModel, ZoneModel, CorridorModel, ShelfModel, ShelfProductModel } = require('../../models/logisticModel');

test('StorageModel should store zoneCodeList and codStorage', () => {
    const model = new StorageModel(['zone1', 'zone2'], 'storage1');
    expect(model._zoneCodeList).toEqual(['zone1', 'zone2']);
    expect(model._codStorage).toBe('storage1');
});

test('ZoneModel should store temperature, coolingSystemStatus, humidityLevel, corridorCodeList, and codZone', () => {
    const model = new ZoneModel(20.5, 'active', 50, ['corridor1', 'corridor2'], 'zone1');
    expect(model._temperature).toBe(20.5);
    expect(model._coolingSystemStatus).toBe('active');
    expect(model._humidityLevel).toBe(50);
    expect(model._corridorCodeList).toEqual(['corridor1', 'corridor2']);
    expect(model._codZone).toBe('zone1');
});

test('CorridorModel should store name, shelfCodeList, and codCorridor', () => {
    const model = new CorridorModel('corridor1', ['shelf1', 'shelf2'], 'corridor1');
    expect(model._name).toBe('corridor1');
    expect(model._shelfCodeList).toEqual(['shelf1', 'shelf2']);
    expect(model._codCorridor).toBe('corridor1');
});

test('ShelfModel should store name, productList, and codShelf', () => {
    const model = new ShelfModel('shelf1', ['product1', 'product2'], 'shelf1');
    expect(model._name).toBe('shelf1');
    expect(model._productList).toEqual(['product1', 'product2']);
    expect(model._codShelf).toBe('shelf1');
});

test('ShelfProductModel should store codProduct and stock', () => {
    const model = new ShelfProductModel('product1', 100);
    expect(model._codProduct).toBe('product1');
    expect(model._stock).toBe(100);
});