import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductList.css';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProductList;
