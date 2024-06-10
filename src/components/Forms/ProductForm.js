import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/ProductForm.css';

const ProductForm = ({ onSave, initialName, initialQuantity }) => {
  const [name, setName] = useState(initialName);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [errors, setErrors] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    onSave({ name, quantity })
      .catch((error) => {
        setErrors(error);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div>
      {errors && <div className="error">{errors.message}</div>}
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <button onClick={handleSave} disabled={saving}>Save</button>
    </div>
  );
};

ProductForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  initialName: PropTypes.string,
  initialQuantity: PropTypes.number
};

export default ProductForm;
