import React, { useEffect, useState } from 'react';
import { getOrders, saveOrder, addOrder } from '../controllers/OrderController';
import OrderList from './Forms/OrderList';
import { OrderModel } from '../models/orderModel';
import OrderAddForm from "./Forms/OrderAddForm";
import { useApplicationGlobal } from "../contexts/AppGlobalContext";
import {fetchAllStorages, generateStorage} from "../services/logisticService";
import {createStorage, getStorages} from "../controllers/LogisticController";
import StorageList from "./Forms/StorageList";
import ZoneList from "./Forms/ZoneList";
import {ZoneModel} from "../models/logisticModel";

const Logistic = () => {
    const [storage, setStorage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingStorage, setEditingStorage] = useState(null);
    const [addingStorage, setAddingStorage] = useState(false);
    const [zones, setZones] = useState(null)

    const {
        editingOrder,
        setEditingOrder,
        addingOrder,
        setAddingOrder,
        viewProductDetailOrder,
        setViewProductDetailOrder,
    } = useApplicationGlobal() || {};

    const loadStorages = async () => {
        try {
            const result = await getStorages();
            setStorage(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStorages();
    }, []);

    const handleEdit = (storage) => {
        setEditingStorage(storage)
    };

    const handleView = (item) => {
        if (Array.isArray(item) && item.every(item => item instanceof ZoneModel)) {
            console.log(item)
            setZones(item);
        }
    }

    const handleAdd = () => {
        setAddingStorage(true);
    };

    const handleSave = async (storage) => {
        try {
            if (addingStorage) {
                await createStorage(storage);
                setAddingStorage(false);
            }
            loadStorages();
            setEditingStorage(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setEditingStorage(null);
        setAddingStorage(false);
        setError(null)
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (zones) {
        //return <OrderAddForm order={new OrderModel()} onSave={handleSave} onCancel={handleCancel} error={error} />;
        return <ZoneList zones={zones} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError}/>;
    } else {
        return <StorageList storage={storage} onAdd={handleAdd} onSave={handleSave} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError}/>;
    }
};

export default Logistic;