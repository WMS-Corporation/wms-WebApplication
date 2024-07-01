import { addProductToShelf, getProductFromShelf, updateProductInShelf, deleteProductFromShelf } from '../../services/logisticService';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();

    jest.spyOn(global.localStorage.__proto__, 'getItem');
    global.localStorage.__proto__.getItem = jest.fn(() => 'token');
});

describe('ShelfProductModel related functions', () => {
    const mockCodShelf = '123';
    const mockCodProduct = '456';
    const mockProductData = {
      _codProduct: '456',
      _stock: 10
    };
  
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProductData),
        })
      );
    });
  
    it('adds a product to a shelf', async () => {
      const result = await addProductToShelf(mockCodShelf, mockProductData);
      expect(result).toEqual(mockProductData);
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/logistics/shelf/${mockCodShelf}/product`, expect.anything());
    });
  
    it('gets a product from a shelf', async () => {
      const result = await getProductFromShelf(mockCodShelf, mockCodProduct);
      expect(result).toEqual(mockProductData);
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/logistics/shelf/${mockCodShelf}/product/${mockCodProduct}`, expect.anything());
    });
  
    it('updates a product in a shelf', async () => {
      const result = await updateProductInShelf(mockCodShelf, mockCodProduct, mockProductData);
      expect(result).toEqual(mockProductData);
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/logistics/shelf/${mockCodShelf}/product/${mockCodProduct}`, expect.anything());
    });
  
    it('deletes a product from a shelf', async () => {
      const result = await deleteProductFromShelf(mockCodShelf, mockCodProduct);
      expect(result).toBeUndefined();
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/logistics/shelf/${mockCodShelf}/product/${mockCodProduct}`, expect.anything());
    });
  });
