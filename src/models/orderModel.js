class OrderModel {
    constructor(date, status, productList, codOrder) {
      this._date = date ? new Date(date) : new Date();
      this._status = status;
      this._productList = productList ? productList.map(product => new ProductOrderModel(product._codProduct, product._quantity)) : [];
      this._codOrder = codOrder;
    }
  }
  
  class ProductOrderModel {
    constructor(codProduct, quantity) {
      this._codProduct = codProduct;
      this._quantity = quantity;
    }
  }
  
  export { OrderModel, ProductOrderModel };