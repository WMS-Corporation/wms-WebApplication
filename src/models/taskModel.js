class TaskModel {
    constructor(codOperator, date, type, status, productList, codTask) {
      this._codOperator = codOperator;
      this._date = date ? new Date(date) : new Date();
      this._type = type;
      this._status = status;
      this._productList = productList ? productList.map(product => new ProductTaskModel(product._codProduct, product._from, product._to, product._quantity)) : [];
      this._codTask = codTask;
    }
  }
  
  class ProductTaskModel {
    constructor(codProduct, from, to, quantity) {
      this._codProduct = codProduct;
      this._from = from;
      this._to = to;
      this._quantity = quantity;
    }
  }
  
  export { TaskModel, ProductTaskModel };