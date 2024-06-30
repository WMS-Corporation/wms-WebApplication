import React, { useEffect, useState } from 'react';
import { getOrders, saveOrder, addOrder } from '../controllers/OrderController';
import OrderList from './Forms/OrderList';
import { OrderModel } from '../models/orderModel';
import OrderAddForm from "./Forms/OrderAddForm";
import { useApplicationGlobal } from "../contexts/AppGlobalContext";
import {fetchAllStorages, generateStorage} from "../services/logisticService";
import {
    createCorridor,
    createShelf,
    createStorage,
    createZone,
    getCorridors,
    getShelfs,
    getStorages,
    getZones,
    addProduct,
    getShelfOfCorridor,
    updateProduct,
    updateShelf,
    updateCorridor,
    modifyZone,
    deleteProduct,
    removeShelf,
    removeCorridor, removeZone, removeStorage
} from "../controllers/LogisticController";
import StorageList from "./Forms/StorageList";
import ZoneList from "./Forms/ZoneList";
import {CorridorModel, ShelfModel, ShelfProductModel, ZoneModel} from "../models/logisticModel";
import CorridorList from "./Forms/CorridorList";
import ShelfList from "./Forms/ShelfList";
import ProductShelfList from "./Forms/ProductShelfList";
import ZoneForm from "./Forms/ZoneForm";
import PropTypes from "prop-types";
import CorridorForm from "./Forms/CorridorForm";
import ShelfForm from "./Forms/ShelfForm";
import ProductShelfForm from "./Forms/ProductShelfForm";

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
    const [currentProduct, setCurrentProduct] = useState(null)
    const [addingProduct, setAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingShelf, setEditingShelf] = useState(null);
    const [editingCorridor, setEditingCorridor] = useState(null);
    const [editingZone, setEditingZone] = useState(null);

    const load = async () => {
        try {
            if(viewZones || addingZone){
                const result = await getZones(currentStorage._codStorage);
                setZones(result);
            } else if(viewCorridors){
                const result = await getCorridors(currentZone._codZone);
                setCorridors(result);
            } else if(viewShelf){
                const result = await getShelfs(currentCorridor._codCorridor);
                setShelfs(result);
            } else if(viewProduct){
                const res = await getShelfOfCorridor(currentShelf._codShelf)
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
            setCurrentProduct(item._codProduct)
            setAddingProduct(false)
            setViewProduct(false)
            setError(null)
        }else if(viewShelf){
            setEditingShelf(item)
            setCurrentShelf(item)
            setAddingShelf(false)
            setViewShelf(false)
            setError(null)
        }else if(viewCorridors){
            setEditingCorridor(item)
            setCurrentCorridor(item)
            setAddingCorridor(false)
            setViewCorridors(false)
            setError(null)
        } else if(viewZones){
            setEditingZone(item)
            setCurrentZone(item)
            setViewZones(false)
            setAddingZone(false)
            setError(null)
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
        } else if (viewProduct) {
            setAddingProduct(false)
            setError(null)
            setViewZones(false)
            setViewShelf(true)
            setViewCorridors(false)
            setViewProduct(false)
        }else {
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
            setEditingZone(null)
            setError(null)
        } else if (viewCorridors){
            setAddingCorridor(true)
            setEditingCorridor(null)
            setViewCorridors(false)
            setError(null)
        } else if (viewShelf){
            setAddingShelf(true)
            setEditingShelf(null)
            setViewShelf(false)
            setError(null)
        } else if (viewProduct){
            setAddingProduct(true)
            setEditingProduct(null)
            setViewProduct(false)
            setError(null)
        }

    };

    const handleSave = async (item) => {
        try {
            if (addingZone){
                await createZone(currentStorage._codStorage, item)
                setAddingZone(false);
                setViewZones(true)
                load();
            } else if (addingCorridor){
                await createCorridor(currentZone._codZone, item);
                setAddingCorridor(false);
                setViewCorridors(true)
                load();
            } else if (addingShelf){
                await createShelf(currentCorridor._codCorridor, item);
                setAddingShelf(false);
                setViewShelf(true)
                load();
            } else if (addingProduct){
                await addProduct(currentShelf._codShelf, item);
                setAddingProduct(false);
                setViewProduct(true)
                load();
            } else if (editingProduct){
                await updateProduct(currentShelf._codShelf, currentProduct, item);
                setEditingProduct(null);
                setViewProduct(true)
                load();
            }else if (editingShelf){
                await updateShelf(currentShelf._codShelf, item)
                setEditingShelf(null);
                setViewShelf(true)
                load();
            } else if (editingCorridor){
                await updateCorridor(currentCorridor._codCorridor, item)
                setEditingCorridor(null);
                setViewCorridors(true)
                load();
            } else if (editingZone){
                await modifyZone(currentZone._codZone, item)
                setEditingZone(null);
                setViewZones(true)
                load();
            } else {
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
            setViewCorridors(true)
        } else if(addingShelf){
            setAddingShelf(false)
            setViewShelf(true)
        } else if(addingProduct){
            setAddingProduct(false)
            setViewProduct(true)
        } else if(editingProduct){
            setEditingProduct(null)
            setViewProduct(true)
        } else if(editingShelf){
            setEditingShelf(null)
            setViewShelf(true)
        } else if(editingCorridor){
            setEditingCorridor(null)
            setViewCorridors(true)
        } else if(editingZone){
            setEditingZone(null)
            setViewZones(true)
        }
        setError(null)
    };

    const handleDelete = async (item) => {
        if(viewProduct){
            if (window.confirm('Are you sure you want to delete this product?')) {
                try {
                    await deleteProduct(currentShelf._codShelf, item);
                    load();
                } catch (error) {
                    setError(error);
                }
            }
        } else if(viewShelf){
            if (window.confirm('Are you sure you want to delete this shelf?')) {
                try {
                    await removeShelf(item);
                    load();
                } catch (error) {
                    setError(error);
                }
            }
        } else if(viewCorridors){
            if (window.confirm('Are you sure you want to delete this corridor?')) {
                try {
                    await removeCorridor(item);
                    load();
                } catch (error) {
                    setError(error);
                }
            }
        } else if(viewZones){
            if (window.confirm('Are you sure you want to delete this zone?')) {
                try {
                    await removeZone(item);
                    load();
                } catch (error) {
                    setError(error);
                }
            }
        } else {
            if (window.confirm('Are you sure you want to delete this storage?')) {
                try {
                    await removeStorage(item);
                    load();
                } catch (error) {
                    setError(error);
                }
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (viewZones) {
        return <ZoneList zones={zones} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} currentStorage={currentStorage} onError={setError} onBack={handleBack}/>;
    } else if(viewCorridors) {
        return <CorridorList corridors={corridors} onAdd={handleAdd} onSave={handleSave} onCancel={handleCancel} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} currentZone={currentZone} addingCorridor={addingCorridor} editingCorridor={editingCorridor} onError={setError} onBack={handleBack} error={error}/>;
    } else if(viewShelf) {
        return <ShelfList shelfs={shelfs} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} currentCorridor={currentCorridor} onError={setError} onBack={handleBack}/>;
    } else if(viewProduct) {
        return <ProductShelfList products={product} onAdd={handleAdd} onSave={handleSave} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} currentShelf={currentShelf} onBack={handleBack}/>;
    }else if(addingZone) {
        return <ZoneForm zone={new ZoneModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>;
    } else if(editingZone) {
        return <ZoneForm zone={editingZone} onSave={handleSave} onCancel={handleCancel} error={error}/>;
    }else if(addingCorridor) {
        return <CorridorForm corridor={new CorridorModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>
    }else if(editingCorridor) {
        return <CorridorForm corridor={editingCorridor} onSave={handleSave} onCancel={handleCancel} error={error}/>
    }else if(addingShelf) {
        return <ShelfForm shelf={new ShelfModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>
    }else if(editingShelf) {
        return <ShelfForm shelf={editingShelf} onSave={handleSave} onCancel={handleCancel} error={error}/>
    }else if(addingProduct) {
        return <ProductShelfForm product={new ShelfProductModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>
    }else if(editingProduct) {
        return <ProductShelfForm product={editingProduct} onSave={handleSave} onCancel={handleCancel} error={error}/>
    }else {
        return <StorageList storage={storage} onAdd={handleAdd} onSave={handleSave} onView={handleView} onDelete={handleDelete} onError={setError}/>;
    }
};

Logistic.propTypes = {
    viewStorage: PropTypes.bool
};

export default Logistic;