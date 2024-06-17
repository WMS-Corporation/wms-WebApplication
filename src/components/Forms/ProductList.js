import React from 'react';
import PropTypes from 'prop-types';
import ProductModel from '../../models/productModel';
import ProductItem from './ProductItem';
import '../styles/ProductList.css';

const ProductList = ({ products, onAdd, onEdit, onDelete, onSave }) => {
  return (
    <div className="product-list">
      <div className="header-list">
        <h1>Product List</h1>
        <button className="btn-Add" onClick={onAdd}>
          Add Product
        </button>
      </div>
      <div className="table-product">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Expiration Date</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductItem key={product._codProduct} product={product} onEdit={onEdit} onDelete={onDelete}
                onSave={onSave} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.instanceOf(ProductModel)).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ProductList;