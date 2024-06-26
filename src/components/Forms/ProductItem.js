import React from 'react';
import PropTypes from 'prop-types';
import ProductModel from '../../models/productModel';
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import '../styles/ProductItem.css';

const ProductItem = ({ product, onEdit, onDelete, type }) => {
  return (
    <tr key={product._codProduct}>
      <td>{product._name}</td>
      <td>{product._category}</td>
      <td>{product._expirationDate instanceof Date && !isNaN(product._expirationDate) ? product._expirationDate.toISOString().substring(0, 10) : 'N/A'}</td>
      <td>{product._type}</td>
        {type === "Admin" ? (
            <td className="action">

                <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(product)}/></div>
                <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(product)}/>
                </div>
            </td>
        ) : null}

    </tr>
  );
};

ProductItem.propTypes = {
    product: PropTypes.instanceOf(ProductModel).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    type: PropTypes.string
};

export default ProductItem;