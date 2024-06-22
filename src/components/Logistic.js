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
import {CorridorModel, ShelfModel, ShelfProductModel, ZoneModel} from "../models/logisticModel";
import CorridorList from "./Forms/CorridorList";
import ShelfList from "./Forms/ShelfList";
import ProductShelfItem from "./Forms/ProductShelfItem";
import ProductShelfList from "./Forms/ProductShelfList";

const Logistic = () => {
    const [storage, setStorage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingStorage, setEditingStorage] = useState(null);
    const [addingStorage, setAddingStorage] = useState(false);
    const [zones, setZones] = useState(null);
    const [corridors, setCorridors] = useState(null);
    const [viewZones, setViewZones] = useState(false);
    const [viewCorridors, setViewCorridors] = useState(false);
    const [shelfs, setShelfs] = useState(null);
    const [viewShelf, setViewShelf] = useState(false);
    const [product, setProduct] = useState(null);
    const [viewProduct, setViewProduct] = useState(false);

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
            setViewCorridors(false)
            setViewZones(true)
            setViewShelf(false)
            setViewProduct(false)
            setZones(item);
        } else if (Array.isArray(item) && item.every(item => item instanceof CorridorModel)) {
            setViewCorridors(true)
            setViewZones(false)
            setViewShelf(false)
            setViewProduct(false)
            setCorridors(item);
        } else if (Array.isArray(item) && item.every(item => item instanceof ShelfModel)) {
            setViewCorridors(false)
            setViewZones(false)
            setViewShelf(true)
            setViewProduct(false)
            setShelfs(item);
        }else {
            console.log("ciao")
            console.log(item)
            setViewCorridors(false)
            setViewZones(false)
            setViewShelf(false)
            setViewProduct(true)
            setProduct(item);
        }
    }

    const handleBack = (item) => {
        if (Array.isArray(item) && item.every(item => item instanceof ZoneModel)) {
            setViewCorridors(false)
            setViewZones(false)
            setViewShelf(false)
            setViewProduct(false)
        } else if (Array.isArray(item) && item.every(item => item instanceof CorridorModel)) {
            setViewCorridors(false)
            setViewZones(true)
            setViewShelf(false)
            setViewProduct(false)
        } else if (Array.isArray(item) && item.every(item => item instanceof ShelfModel)) {
            setViewCorridors(true)
            setViewZones(false)
            setViewShelf(false)
            setViewProduct(false)
        } else if (Array.isArray(item) && item.every(item => item instanceof ShelfProductModel)) {
            setViewCorridors(false)
            setViewZones(false)
            setViewShelf(true)
            setViewProduct(false)
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

    if (viewZones) {
        return <ZoneList zones={zones} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError} onBack={handleBack}/>;
    } else if(viewCorridors) {
        return <CorridorList corridors={corridors} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError} onBack={handleBack}/>;
    } else if(viewShelf) {
        return <ShelfList shelfs={shelfs} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError} onBack={handleBack}/>;
    } else if(viewProduct) {
        return <ProductShelfList products={product} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError} onBack={handleBack}/>;
    }else {
        return <StorageList storage={storage} onAdd={handleAdd} onSave={handleSave} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError}/>;
    }
};

export default Logistic;