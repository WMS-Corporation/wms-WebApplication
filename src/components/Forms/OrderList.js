import React from 'react';
import PropTypes from 'prop-types';
import { OrderModel } from '../../models/orderModel';
import OrderItem from './OrderItem';
import '../styles/OrderList.css';
import OrderProductDetails from "./OrderProductDetails";

const OrderList = ({ orders, onAdd, onEdit, onSave, onView, viewProductDetailOrder, onError }) => {
    onError(null)
    return (
        <div className="order-list">
            <div className="header-list-order">
                <h1>Order List</h1>
                <button className="btn-Add-order" onClick={onAdd}>
                    Add Order
                </button>
            </div>
            <div className="table-order">
                {viewProductDetailOrder && viewProductDetailOrder._productList ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Product Code</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewProductDetailOrder._productList.map((product) => (
                                <OrderProductDetails key={product._codProduct} product={product} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Order Code</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Products</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <OrderItem key={order._codOrder} order={order} onEdit={onEdit}
                                    onSave={onSave} onView={onView} />
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    );
};

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.instanceOf(OrderModel)).isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    viewProductDetailOrder: PropTypes.instanceOf(OrderModel)
};

export default OrderList;