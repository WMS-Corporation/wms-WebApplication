import { OrderModel, ProductOrderModel } from '../../models/orderModel';

describe('OrderModel', () => {
  it('should correctly set properties', () => {
    const date = '2022-12-31';
    const status = 'testStatus';
    const productList = [{ _codProduct: 'testCodProduct', _quantity: 10 }];
    const codOrder = 'testCodOrder';
    const model = new OrderModel(date, status, productList, codOrder);

    expect(model._date).toEqual(new Date(date));
    expect(model._status).toBe(status);
    expect(model._productList).toEqual(productList.map(product => new ProductOrderModel(product._codProduct, product._quantity)));
    expect(model._codOrder).toBe(codOrder);
  });
});