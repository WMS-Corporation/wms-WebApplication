import React from 'react';
import PropTypes from 'prop-types';
import ProductModel from '../../models/productModel';
import '../styles/ProductEdit.css';

const ProductEditForm = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = React.useState(product);

  const handleChange = (event) => {
      if (event.target.name === "_expirationDate" && !event.target.value) {
          return;
      }
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
      <div className="edit-page">
          <div className="header-edit">
              <h1>Edit Product</h1>
          </div>
          <div className="body-edit">
              <form onSubmit={handleSubmit}>
                  <div className="content-edit">
                      <div className="col-md-6">
                          <div className="form-group">
                              <label>Name *</label>
                              <input className="form-control" type="text" name="_name" value={editedProduct._name}
                                     onChange={handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                              <label>Category *</label>
                              <input className="form-control" type="text" name="_category"
                                     value={editedProduct._category} onChange={handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                              <label>Expiration Date *</label>
                              <input className="form-control" type="date"
                                     name="_expirationDate"
                                     value={new Date(editedProduct._expirationDate).toISOString().split('T')[0]}
                                     onChange={handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                              <label>Type *</label>
                              <select className="form-control" name="_type" value={editedProduct._type}
                                      onChange={handleChange}>
                                  <option value="Refrigerated">Refrigerated</option>
                                  <option value="NoRefrigerated">NoRefrigerated</option>
                              </select>
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

ProductEditForm.propTypes = {
    product: PropTypes.instanceOf(ProductModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ProductEditForm;