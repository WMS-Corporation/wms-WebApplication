import React from 'react';
import PropTypes from 'prop-types';
import ProductModel from '../../models/productModel';
import '../styles/ProductList.css';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Expiration Date</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product) => {
            console.log(product._expirationDate);
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
        })}
        </tbody>
      </table>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.instanceOf(ProductModel)).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductList;