import { fetchOrders, updateOrder, removeOrder, addOrder } from '../../services/orderService';
import { OrderModel } from '../../models/orderModel';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();

    jest.spyOn(global.localStorage.__proto__, 'getItem');
    global.localStorage.__proto__.getItem = jest.fn(() => 'token');
});

test('fetchOrders › should fetch orders and return an array of OrderModel', async () => {
    const mockData = [
        { _date: '2022-12-31', _status: 'Status1', _productList: [{ _codProduct: '1', _quantity: '10' }], _codOrder: '1' },
        { _date: '2023-01-01', _status: 'Status2', _productList: [{ _codProduct: '2', _quantity: '20' }], _codOrder: '2' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchOrders();

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/orders/all`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
    });

    expect(data).toEqual(mockData.map(item => new OrderModel(item._date, item._status, item._productList, item._codOrder)));
});

test('updateOrder › should update an order and return the updated OrderModel', async () => {
    const mockData = {
        _date: '2023-01-01',
        _status: 'UpdatedStatus',
        _productList: [{ _codProduct: '1', _quantity: '15' }],
        _codOrder: '1',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const data = await updateOrder(mockData._codOrder, {
        _date: mockData._date,
        _status: mockData._status,
        _productList: mockData._productList,
    });

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/orders/${mockData._codOrder}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _date: mockData._date,
            _status: mockData._status,
            _productList: mockData._productList,
        }),
    });

    expect(data).toEqual(new OrderModel(mockData._date, mockData._status, mockData._productList, mockData._codOrder));
});

test('addOrder › should add an order and return the added order', async () => {
    const mockData = { _date: '2023-01-01', _status: 'NewStatus', _productList: [{ _codProduct: '3', _quantity: '30' }], _codOrder: '3' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const data = await addOrder(mockData);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/orders/generation`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockData)
    });
    expect(data).toEqual(new OrderModel(mockData._date, mockData._status, mockData._productList, mockData._codOrder));
});

test('removeOrder › should remove an order and return the id of the removed order', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const data = await removeOrder('1');

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/orders/1`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
    });
    expect(data).toEqual('1');
});