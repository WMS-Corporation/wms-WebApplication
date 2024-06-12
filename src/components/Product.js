// src/components/Product.js
import React, { useEffect, useState } from 'react';
import { getProducts, saveProduct, deleteProduct  } from '../controllers/ProductController';
import ProductList from './Forms/ProductList';

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

  const handleDelete = async (product) => {    
    // Handle the delete operation here
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product);
        loadProducts(); // Reload the products after deleting
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

  return <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default Product;