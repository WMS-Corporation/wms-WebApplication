import React from 'react';
import PropTypes from 'prop-types';
import { OrderModel, ProductOrderModel } from '../../models/orderModel';
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import '../styles/OrderItem.css';

const OrderItem = ({ order, onEdit, onDelete, onView }) => {
  return (
    <tr key={order._codOrder}>
      <td>{order._codOrder}</td>
      <td>{order._date instanceof Date && !isNaN(order._date) ? order._date.toISOString().substring(0, 10) : 'N/A'}</td>
      <td>{order._status}</td>
      <td>{order._productList.length}</td>
      <td className="action">
          <div className="view"><FaEye className="view-icon" onClick={() => onView(order)}/></div>
          <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(order)}/></div>
          <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(order)}/></div>
      </td>
    </tr>
  );
};

OrderItem.propTypes = {
  order: PropTypes.instanceOf(OrderModel).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default OrderItem;