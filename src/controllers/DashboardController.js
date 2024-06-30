import {fetchOrders} from "../services/orderService";
import {fetchTasks} from "../services/taskService";
import {fetchAllUsers} from "../services/userService";
import {getAllZones} from "../services/logisticService";
import {getAllStorages} from "../services/logisticService";

import { saveAs } from 'file-saver';

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

export const generateAndDownloadReport = async () => {
    const tasks = await getTasks();
    const orders = await getOrders();
    const users = await getUsers();
    const storages = await getStorages();
    let zones = [];
    for (const storage of storages) {
        const storageZones = await getZones(storage._codStorage);
        zones = zones.concat(storageZones.map(zone => ({ ...zone, storageName: storage._codStorage })));
    }

    // Elaborazione dei dati per il CSV
    const csvRows = [
        ["Type", "Quantity", "Details"],
    ["Task", tasks.length, `Completed: ${tasks.filter(t => t._status === 'Completed').length}, Pending: ${tasks.filter(t => t._status === 'Pending').length}, Suspended: ${tasks.filter(t => t._status === 'Suspended').length}, Processing: ${tasks.filter(t => t._status === 'Processing').length}`],
    ["Orders", orders.length, `Completed: ${orders.filter(o => o._status === 'Completed').length}, Pending: ${orders.filter(o => o._status === 'Pending').length}, Suspended: ${orders.filter(o => o._status === 'Suspended').length}, Processing: ${orders.filter(o => o._status === 'Processing').length}`],
    ["Operational", users.filter(user => user._type === "Operational").length, ""],
    [""],
        ["Cod Storage", "Cod Zone", "Zone Data"]
    ];

    // Aggiungi informazioni su storage e zone
    storages.forEach(storage => {
        const storageZones = zones.filter(zone => zone.storageName === storage._codStorage);
        storageZones.forEach(zone => {
            csvRows.push([`Storage (${storage._codStorage})`, zone._codZone, `Temperature: ${zone._temperature}, Umidity: ${zone._humidityLevel}`]);
        });
    });

    const csvContent = csvRows.map(e => e.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, "dashboard_report.csv");
};