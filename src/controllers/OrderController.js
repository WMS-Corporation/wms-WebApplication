import { fetchOrders, updateOrder, removeOrder, addOrder as addOrderToService } from '../services/orderService';

export const getOrders = async () => {
  return await fetchOrders();
};

export const saveOrder = async (codOrder, newData) => {
  const dataToSend = { ...newData };
  delete dataToSend._codOrder;
  return await updateOrder(codOrder, dataToSend);
};

export const addOrder = async (order) => {
  const dataToSend = { ...order };
  delete dataToSend._codOrder;
  return await addOrderToService(dataToSend);
};

export const deleteOrder = async (order) => {
  return await removeOrder(order._codOrder);
};