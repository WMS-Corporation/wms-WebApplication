import { getProducts, saveProduct, deleteProduct, addProduct } from '../../controllers/ProductController';
import { fetchProducts, updateProduct, removeProduct, addProduct as addProductToService } from '../../services/productService';

jest.mock('../../services/productService');

describe('ProductController', () => {
  it('should call the fetchProducts service', async () => {
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

    fetchProducts.mockImplementation(async () => {
      return products;
    });

    const result = await getProducts();

    expect(fetchProducts).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  it('should call the updateProduct service with correct parameters', async () => {
    const id = 1;
    const newData = { _codProduct: '123', name: 'Updated Product' };
    const expectedData = { name: 'Updated Product' };

    updateProduct.mockImplementation(async (id, data) => {
      return { id, ...data };
    });

    const result = await saveProduct(id, newData);

    expect(updateProduct).toHaveBeenCalledWith(id, expectedData);
    expect(result).toEqual({ id, ...expectedData });
  });

  it('should call the addProduct service with correct parameters', async () => {
    const product = { _codProduct: '123', name: 'New Product', category: 'Category', expirationDate: '2022-12-31', type: 'Type' };
    const expectedData = { name: 'New Product', category: 'Category', expirationDate: '2022-12-31', type: 'Type' };

    addProductToService.mockImplementation(async (data) => {
      return { id: 3, ...data };
    });

    const result = await addProduct(product);

    expect(addProductToService).toHaveBeenCalledWith(expectedData);
    expect(result).toEqual({ id: 3, ...expectedData });
  });

  it('should call the removeProduct service with correct parameters', async () => {
    const product = { _codProduct: '123', name: 'Product to delete' };

    removeProduct.mockImplementation(async (codProduct) => {
      return { codProduct };
    });

    const result = await deleteProduct(product);

    expect(removeProduct).toHaveBeenCalledWith(product._codProduct);
    expect(result).toEqual({ codProduct: product._codProduct });
  });
});