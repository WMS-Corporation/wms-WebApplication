class ProductModel {
  constructor(codProduct, name, category, expirationDate, type) {
    this._codProduct = codProduct;
    this._name = name;
    this._category = category;
    this._expirationDate = expirationDate ? new Date(expirationDate) : new Date();
    this._type = type;
  }
}

export default ProductModel;