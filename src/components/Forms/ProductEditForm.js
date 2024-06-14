import React from 'react';
import PropTypes from 'prop-types';
import ProductModel from '../../models/productModel';

const ProductEditForm = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = React.useState(product);

  const handleChange = (event) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="_name" value={editedProduct._name} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="_category" value={editedProduct._category} onChange={handleChange} />
      </label>
        <label>
        Expiration Date:
        <input
            type="date"
            name="_expirationDate"
            value={new Date(editedProduct._expirationDate).toISOString().split('T')[0]}
            onChange={handleChange}
        />
        </label>
      <label>
        Type:
        <input type="text" name="_type" value={editedProduct._type} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

ProductEditForm.propTypes = {
  product: PropTypes.instanceOf(ProductModel).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductEditForm;