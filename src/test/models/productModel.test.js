import ProductModel from '../../models/ProductModel';

describe('ProductModel', () => {
  it('should correctly set properties', () => {
    const codProduct = 'testCodProduct';
    const name = 'testName';
    const category = 'testCategory';
    const expirationDate = '2022-12-31';
    const type = 'testType';
    const model = new ProductModel(codProduct, name, category, expirationDate, type);

    expect(model._codProduct).toBe(codProduct);
    expect(model._name).toBe(name);
    expect(model._category).toBe(category);
    expect(model._expirationDate).toEqual(new Date(expirationDate));
    expect(model._type).toBe(type);
  });
});