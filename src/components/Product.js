import React, { useEffect, useState } from 'react';
import { getProducts, saveProduct, deleteProduct, addProduct  } from '../controllers/ProductController';
import ProductList from './Forms/ProductList';
import ProductEditForm from './Forms/ProductEditForm';
import ProductModel from '../models/productModel';
import ProductAddForm from "./Forms/ProductAddForm";
import {useApplicationGlobal} from "../contexts/AppGlobalContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    editingProduct,
    setEditingProduct,
    addingProduct,
    setAddingProduct
  } = useApplicationGlobal() || {};

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

  const handleAdd = () => {
    setAddingProduct(true);
  };

  const handleSave = async (product) => {
    try {
      if (addingProduct) {
        await addProduct(product);
        setAddingProduct(false);
      } else {
        await saveProduct(product._codProduct, product);
      }
      loadProducts();
      setEditingProduct(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setAddingProduct(false);
    setError(null)
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

  if (addingProduct) {
    return <ProductAddForm product={new ProductModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>;
  } else if (editingProduct) {
    return <ProductEditForm product={editingProduct} onSave={handleSave} onCancel={handleCancel} />;
  } else {
    return <ProductList products={products} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onSave={handleSave} />;
  }
};

export default Product;