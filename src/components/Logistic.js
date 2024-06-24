import React, { useEffect, useState } from 'react';
import { getOrders, saveOrder, addOrder } from '../controllers/OrderController';
import OrderList from './Forms/OrderList';
import { OrderModel } from '../models/orderModel';
import OrderAddForm from "./Forms/OrderAddForm";
import { useApplicationGlobal } from "../contexts/AppGlobalContext";
import {fetchAllStorages, generateStorage} from "../services/logisticService";
import {
    createCorridor, createShelf,
    createStorage,
    createZone,
    getCorridors, getShelfs,
    getStorages,
    getZones, addProduct, getShelf
} from "../controllers/LogisticController";
import StorageList from "./Forms/StorageList";
import ZoneList from "./Forms/ZoneList";
import {CorridorModel, ShelfModel, ShelfProductModel, ZoneModel} from "../models/logisticModel";
import CorridorList from "./Forms/CorridorList";
import ShelfList from "./Forms/ShelfList";
import ProductShelfItem from "./Forms/ProductShelfItem";
import ProductShelfList from "./Forms/ProductShelfList";
import { deleteProduct} from "../controllers/ProductController";
import ProductAddForm from "./Forms/ProductAddForm";
import ProductModel from "../models/productModel";
import ZoneForm from "./Forms/ZoneForm";
import PropTypes from "prop-types";
import ShelfItem from "./Forms/ShelfItem";

const Logistic = (viewStorage) => {
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
    const [addingZone, setAddingZone] = useState(false);
    const [addingCorridor, setAddingCorridor] = useState(false);
    const [addingShelf, setAddingShelf] = useState(false);
    const [currentZone, setCurrentZone] = useState(null)
    const [currentStorage, setCurrentStorage] = useState(null)
    const [currentCorridor, setCurrentCorridor] = useState(null)
    const [currentShelf, setCurrentShelf] = useState(null)
    const [addingProduct, setAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(false);

    const {
        editingOrder,
        setEditingOrder,
        addingOrder,
        setAddingOrder,
        viewProductDetailOrder,
        setViewProductDetailOrder,
    } = useApplicationGlobal() || {};

    const load = async () => {
        try {
            if(viewZones || addingZone){
                const result = await getZones(currentStorage);
                setZones(result);
            } else if(viewCorridors){
                const result = await getCorridors(currentZone);
                setCorridors(result);
            } else if(viewShelf){
                const result = await getShelfs(currentCorridor);
                setShelfs(result);
            } else if(viewProduct){
                const res = await getShelf(currentShelf)
                const result = res._productList.map(product => new ShelfProductModel(product._codProduct, product._stock))
                setProduct(result);
            }
            const result = await getStorages();
            setStorage(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(viewStorage){
            console.log("ciao")
        }

        load();
    }, []);

    useEffect(() => {
        if (viewZones) {
            load();
        } else if(viewCorridors){
            load();
        } else if(viewShelf){
            load();
        } else if(viewProduct){
            load();
        }
    }, [viewZones, viewCorridors, viewShelf, viewProduct]);

    const handleEdit = (item) => {
        if(viewProduct){
            setEditingProduct(item)
        }
    };

    const handleView = (item, current) => {
        if (viewZones) {
            setViewCorridors(true)
            setViewZones(false)
            setViewShelf(false)
            setViewProduct(false)
            setCurrentZone(current)
            setCorridors(item);
        } else if (viewCorridors) {
            setViewCorridors(false)
            setViewZones(false)
            setViewShelf(true)
            setViewProduct(false)
            setCurrentCorridor(current)
            setShelfs(item);
        }else if(viewShelf){
            setViewCorridors(false)
            setViewZones(false)
            setViewShelf(false)
            setViewProduct(true)
            setCurrentShelf(current)
            setProduct(item);
        } else {
            setViewCorridors(false)
            setViewZones(true)
            setViewShelf(false)
            setViewProduct(false)
            setCurrentStorage(current)
            setZones(item);
        }
    }

    const handleBack = () => {
        if (viewZones) {
            setViewCorridors(false)
            setViewZones(false)
            setViewShelf(false)
            setViewProduct(false)
        } else if (viewCorridors) {
            setAddingCorridor(false)
            setError(null)
            setViewCorridors(false)
            setViewZones(true)
            setViewShelf(false)
            setViewProduct(false)
        } else if (viewShelf) {
            setViewCorridors(true)
            setAddingShelf(false)
            setError(null)
            setViewZones(false)
            setViewShelf(false)
            setViewProduct(false)
        } else {
            setViewCorridors(false)
            setViewZones(false)
            setViewShelf(true)
            setViewProduct(false)
            setAddingProduct(false)
            setError(null)
        }
    }

    const handleAdd = async () => {
        if(viewZones) {
            setAddingZone(true);
            setViewZones(false)
        } else if (viewCorridors){
            setAddingCorridor(true)
        } else if (viewShelf){
            setAddingShelf(true)
        } else if (viewProduct){
            setAddingProduct(true)
            setError(null)
        }

    };

    const handleSave = async (item) => {
        try {
            if (addingZone){
                await createZone(currentStorage, item)
                setAddingZone(false);
                setViewZones(true)
                load();
            } else if (addingCorridor){
                await createCorridor(currentZone, item);
                setAddingCorridor(false);
                load();
            } else if (addingShelf){
                await createShelf(currentCorridor, item);
                setAddingShelf(false);
                load();
            } else if (addingProduct){
                console.log(item)
                await addProduct(currentShelf, item);
                setAddingProduct(false);
                load();
            } else if (editingProduct){
                console.log(item)
                await addProduct(currentShelf, item);
                setAddingProduct(false);
                load();
            }else {
                await createStorage({_zoneCodeList: []});
                setAddingStorage(false);
                load();
                setEditingStorage(null);
            }

        } catch (error) {
            setError(error.message);
            console.log(error)
        }
    };

    const handleCancel = () => {
        if(addingZone){
            setAddingZone(false);
            setViewZones(true)
        } else if(addingCorridor){
            setAddingCorridor(false)
        } else if(addingShelf){
            setAddingShelf(false)
        } else if(addingProduct){
            setAddingProduct(false)
        }
        setError(null)
    };

    // const handleDelete = async (product) => {
    //     if (window.confirm('Are you sure you want to delete this product?')) {
    //         try {
    //             await deleteProduct(product);
    //             loadProducts();
    //         } catch (error) {
    //             setError(error);
    //         }
    //     }
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (viewZones) {
        return <ZoneList zones={zones} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError} onBack={handleBack}/>;
    } else if(viewCorridors) {
        return <CorridorList corridors={corridors} onAdd={handleAdd} onSave={handleSave} onCancel={handleCancel} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} addingCorridor={addingCorridor} onError={setError} onBack={handleBack} error={error}/>;
    } else if(viewShelf) {
        return <ShelfList shelfs={shelfs} onAdd={handleAdd} onSave={handleSave} onCancel={handleCancel} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} addingShelf={addingShelf} onError={setError} onBack={handleBack} error={error}/>;
    } else if(viewProduct) {
        return <ProductShelfList products={product} onAdd={handleAdd} onSave={handleSave} onCancel={handleCancel} onEdit={handleEdit} onDelete={handleCancel} onView={handleView} addingProduct={addingProduct} editingProduct={editingProduct} onError={setError} onBack={handleBack} error={error}/>;
    }else if(addingZone) {
        return <ZoneForm zone={new ZoneModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>;
    }else {
        return <StorageList storage={storage} onAdd={handleAdd} onSave={handleSave} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError}/>;
    }
};

Logistic.propTypes = {
    viewStorage: PropTypes.bool
};

export default Logistic;