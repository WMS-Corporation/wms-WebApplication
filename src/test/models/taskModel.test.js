import { TaskModel, ProductTaskModel } from '../../models/taskModel';

describe('TaskModel', () => {
  it('should correctly set properties', () => {
    const codOperator = 'testCodOperator';
    const date = '2022-12-31';
    const type = 'testType';
    const status = 'testStatus';
    const productList = [{ _codProduct: 'testCodProduct', _from: 'testFrom', _to: 'testTo', _quantity: 10 }];
    const codTask = 'testCodTask';
    const model = new TaskModel(codOperator, date, type, status, productList, codTask);

    expect(model._codOperator).toBe(codOperator);
    expect(model._date).toEqual(new Date(date));
    expect(model._type).toBe(type);
    expect(model._status).toBe(status);
    expect(model._productList).toEqual(productList.map(product => new ProductTaskModel(product._codProduct, product._from, product._to, product._quantity)));
    expect(model._codTask).toBe(codTask);
  });
});