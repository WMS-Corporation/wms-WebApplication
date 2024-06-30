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
            {viewProductDetailOrder ? (
                <>
                    <h1>Order</h1>
                    <div className="content-section-view">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Order Code</label>
                                <input className="form-control" type="string"
                                       value={viewProductDetailOrder._codOrder} readOnly={true}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Date</label>
                                <input className="form-control" type="date"
                                       value={new Date(viewProductDetailOrder._date).toISOString().split('T')[0]}
                                       readOnly={true}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Status</label>
                                <input className="form-control" type="string"
                                       value={viewProductDetailOrder._status} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            <div className="header-list-order">
                {viewProductDetailOrder ? (
                    <h2>Product List</h2>
                ) : <h1>Order List</h1>}
                {!viewProductDetailOrder ? (
                    <button className="btn-Add-order" onClick={onAdd}>
                        Add Order
                    </button>
                ) : null}
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
                            <OrderProductDetails key={product._codProduct} product={product}/>
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