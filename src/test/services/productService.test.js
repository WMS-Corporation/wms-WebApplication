import { fetchProducts, updateProduct, removeProduct, addProduct } from '../../services/productService';
import ProductModel from '../../models/productModel';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();

    jest.spyOn(global.localStorage.__proto__, 'getItem');
    global.localStorage.__proto__.getItem = jest.fn(() => 'token');
});

test('fetchProducts › should fetch products and return an array of ProductModel', async () => {
    const mockData = [
        { _codProduct: '1', _name: 'Product1', _category: 'Category1', _expirationDate: '2022-12-31', _type: 'Type1' },
        { _codProduct: '2', _name: 'Product2', _category: 'Category2', _expirationDate: '2023-01-01', _type: 'Type2' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchProducts();

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/products/all`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
    });

    expect(data).toEqual(mockData.map(item => new ProductModel(item._codProduct, item._name, item._category, item._expirationDate, item._type)));
});

test('updateProduct › should update a product and return the updated ProductModel', async () => {
    // Ensure mockData has the correct values
    const mockData = {
        id: '1',
        name: 'UpdatedProduct',
        category: 'UpdatedCategory',
        expirationDate: new Date('2023-01-01T00:00:00.000Z'),
        type: 'UpdatedType',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const data = await updateProduct(mockData.id, {
        name: mockData.name,
        category: mockData.category,
        expirationDate: mockData.expirationDate,
        type: mockData.type,
    });

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/products/${mockData.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: mockData.name,
            category: mockData.category,
            expirationDate: mockData.expirationDate,
            type: mockData.type,
        }),
    });

    expect(data).toEqual(new ProductModel(mockData.id, mockData.name, mockData.category, mockData.expirationDate, mockData.type));
});


test('addProduct › should add a product and return the added product', async () => {
    const mockData = { id: '3', name: 'New Product', category: 'New Category', expirationDate: '2023-01-01', type: 'New Type' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const data = await addProduct(mockData);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/products/create`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockData)
    });
    expect(data).toEqual(new ProductModel(mockData.id, mockData.name, mockData.category, mockData.expirationDate, mockData.type));
});

test('removeProduct › should remove a product and return the id of the removed product', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const data = await removeProduct('1');

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/products/1`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
    });
    expect(data).toEqual('1');
});