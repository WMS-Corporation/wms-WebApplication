import React, { useEffect, useState } from 'react';
import { getProducts, saveProduct, deleteProduct  } from '../controllers/ProductController';
import ProductList from './Forms/ProductList';
import ProductEditForm from './Forms/ProductEditForm';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = async (editedProduct) => {
    try {
      await saveProduct(editedProduct._codProduct, editedProduct);
      loadProducts();
      setEditingProduct(null);
    } catch (error) {
      setError(error);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleDelete = async (product) => {    
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product);
        loadProducts();
      } catch (error) {
        setError(error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (editingProduct) {
    return <ProductEditForm product={editingProduct} onSave={handleSave} onCancel={handleCancel} />;
  } else {
    return <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} onSave={handleSave} />;
  }
};

export default Product;