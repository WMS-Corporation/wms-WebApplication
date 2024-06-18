import React from 'react';
import PropTypes from 'prop-types';
import { OrderModel } from '../../models/orderModel';
import '../styles/OrderEdit.css';

const OrderEditForm = ({ order, onSave, onCancel }) => {
    const [editedOrder, setEditedOrder] = React.useState(order);

    const handleChange = (event) => {
        if (event.target.name === "_date" && !event.target.value) {
            return;
        }
        setEditedOrder({
            ...editedOrder,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(editedOrder);
    };

    return (
        <div className="edit-order-page">
            <div className="header-edit">
                <h1>Edit Order</h1>
            </div>
            <div className="body-order-edit">
                <form onSubmit={handleSubmit}>
                    <div className="content-section">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Date *</label>
                                <input className="form-control" type="date" name="_date"
                                    value={new Date(editedOrder._date).toISOString().split('T')[0]} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Status *</label>
                                <input className="form-control" type="text" name="_status"
                                    value={editedOrder._status} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="button-div">
                        <button className="btn-Submit" type="submit">Save</button>
                        <button className="btn-Cancel" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

OrderEditForm.propTypes = {
    order: PropTypes.instanceOf(OrderModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default OrderEditForm;