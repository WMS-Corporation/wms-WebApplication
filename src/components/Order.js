import React, { useEffect, useState } from 'react';
import { getOrders, saveOrder, deleteOrder, addOrder } from '../controllers/OrderController';
import OrderList from './Forms/OrderList';
import OrderEditForm from './Forms/OrderEditForm';
import { OrderModel } from '../models/orderModel';
import OrderAddForm from "./Forms/OrderAddForm";
import { useApplicationGlobal } from "../contexts/AppGlobalContext";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        editingOrder,
        setEditingOrder,
        addingOrder,
        setAddingOrder,
        viewProductDetailOrder,
        setViewProductDetailOrder,
    } = useApplicationGlobal() || {};

    const loadOrders = async () => {
        try {
            const result = await getOrders();
            setOrders(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleEdit = (order) => {
        setEditingOrder(order);
    };

    const handleView = (order) => {
        setViewProductDetailOrder(order);
    }

    const handleAdd = () => {
        setAddingOrder(true);
    };

    const handleSave = async (order) => {
        try {
            if (addingOrder) {
                await addOrder(order);
                setAddingOrder(false);
            } else {
                await saveOrder(order._codOrder, order);
            }
            loadOrders();
            setEditingOrder(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setEditingOrder(null);
        setAddingOrder(false);
        setError(null)
    };

    const handleDelete = async (order) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(order);
                loadOrders();
            } catch (error) {
                setError(error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (addingOrder) {
        return <OrderAddForm order={new OrderModel()} onSave={handleSave} onCancel={handleCancel} error={error} />;
    } else if (editingOrder) {
        return <OrderEditForm order={editingOrder} onSave={handleSave} onCancel={handleCancel} error={error}/>;
    } else {
        return <OrderList orders={orders} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onSave={handleSave} onView={handleView} viewProductDetailOrder={viewProductDetailOrder} onError={setError}/>;
    }
};

export default Order;