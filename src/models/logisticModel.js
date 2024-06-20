class StorageModel {
    constructor(zoneCodeList, codStorage) {
        this._zoneCodeList = zoneCodeList;
        this._codStorage = codStorage;
    }
}

class ZoneModel {
    constructor(temperature, coolingSystemStatus, humidityLevel, corridorCodeList, codZone) {
        this._temperature = temperature;
        this._coolingSystemStatus = coolingSystemStatus;
        this._humidityLevel = humidityLevel;
        this._corridorCodeList = corridorCodeList;
        this._codZone = codZone;
    }
}

class CorridorModel {
    constructor(name, shelfCodeList, codCorridor) {
        this._name = name;
        this._shelfCodeList = shelfCodeList;
        this._codCorridor = codCorridor;
    }
}

class ShelfModel {
    constructor(name, productList, codShelf) {
        this._name = name;
        this._productList = productList;
        this._codShelf = codShelf;
    }
}

class ShelfProductModel {
    constructor(codProduct, stock) {
        this._codProduct = codProduct;
        this._stock = stock;
    }
}

module.exports = { StorageModel, ZoneModel, CorridorModel, ShelfModel, ShelfProductModel };