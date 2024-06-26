import React from 'react';
import PropTypes from 'prop-types';
import ProductModel from '../../models/productModel';
import ProductItem from './ProductItem';
import '../styles/ProductList.css';
import {useAuth} from "../../contexts/AuthContext";

const ProductList = ({ products, onAdd, onEdit, onDelete, onSave, onError }) => {
  onError(null)
  const { user } = useAuth() || {};
  return (
    <div className="product-list">
      <div className="header-list">
        <h1>Product List</h1>
        {user._type === "Admin" ? (
            <button className="btn-Add" onClick={onAdd}>
              Add Product
            </button>
        ) : null}
      </div>
      <div className="table-product">
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Expiration Date</th>
              <th>Type</th>
                {user._type === "Admin" ? (
                    <th>Action</th>
                ) : null}

            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductItem key={product._codProduct} product={product} onEdit={onEdit} onDelete={onDelete}
                onSave={onSave} type={user._type}/>
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
  onError: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ProductList;