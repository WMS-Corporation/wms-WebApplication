// src/components/Product.js
import React, { useEffect, useState } from 'react';
import { getProducts } from '../controllers/ProductController';
import ProductList from './Forms/ProductList';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default Product;
