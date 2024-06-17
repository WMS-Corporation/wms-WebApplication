import { getOrders, saveOrder, deleteOrder, addOrder } from '../../controllers/OrderController';
import { fetchOrders, updateOrder, removeOrder, addOrder as addOrderToService } from '../../services/orderService';

jest.mock('../../services/orderService');

describe('OrderController', () => {
  it('should call the fetchOrders service', async () => {
    const orders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];

    fetchOrders.mockImplementation(async () => {
      return orders;
    });

    const result = await getOrders();

    expect(fetchOrders).toHaveBeenCalled();
    expect(result).toEqual(orders);
  });

  it('should call the updateOrder service with correct parameters', async () => {
    const id = 1;
    const newData = { _codOrder: '123', name: 'Updated Order' };
    const expectedData = { name: 'Updated Order' };

    updateOrder.mockImplementation(async (id, data) => {
      return { id, ...data };
    });

    const result = await saveOrder(id, newData);

    expect(updateOrder).toHaveBeenCalledWith(id, expectedData);
    expect(result).toEqual({ id, ...expectedData });
  });

  it('should call the addOrder service with correct parameters', async () => {
    const order = { _codOrder: '123', name: 'New Order', status: 'Status', productList: [], date: '2022-12-31' };
    const expectedData = { name: 'New Order', status: 'Status', productList: [], date: '2022-12-31' };

    addOrderToService.mockImplementation(async (data) => {
      return { id: 3, ...data };
    });

    const result = await addOrder(order);

    expect(addOrderToService).toHaveBeenCalledWith(expectedData);
    expect(result).toEqual({ id: 3, ...expectedData });
  });

  it('should call the removeOrder service with correct parameters', async () => {
    const order = { _codOrder: '123', name: 'Order to delete' };

    removeOrder.mockImplementation(async (codOrder) => {
      return { codOrder };
    });

    const result = await deleteOrder(order);

    expect(removeOrder).toHaveBeenCalledWith(order._codOrder);
    expect(result).toEqual({ codOrder: order._codOrder });
  });
});