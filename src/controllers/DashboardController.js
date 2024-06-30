import {fetchOrders} from "../services/orderService";
import {fetchTasks} from "../services/taskService";
import {fetchAllUsers} from "../services/userService";
import {getAllZones} from "../services/logisticService";
import {getAllStorages} from "../services/logisticService";

export const getOrders = async () => {
    return await fetchOrders();
};

export const getTasks = async () => {
    return await fetchTasks();
};

export const getUsers = async () => {
    return await fetchAllUsers();
};

export const getZones = async (codStorage) => {
    return await getAllZones(codStorage);
};

export const getStorages = async () => {
    return await getAllStorages();
};