import React from 'react';
import PropTypes from 'prop-types';
import ProductModel from '../../models/productModel';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <tr key={product._codProduct}>
      <td>{product._name}</td>
      <td>{product._category}</td>
      <td>{product._expirationDate instanceof Date && !isNaN(product._expirationDate) ? product._expirationDate.toISOString().substring(0, 10) : 'N/A'}</td>
      <td>{product._type}</td>
      <td><button onClick={() => onEdit(product)}>Edit</button></td>
      <td><button onClick={() => onDelete(product)}>Delete</button></td>
    </tr>
  );
};

ProductItem.propTypes = {
  product: PropTypes.instanceOf(ProductModel).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductItem;