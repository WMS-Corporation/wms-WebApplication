import React, { useEffect, useState } from 'react';
import { getProducts, saveProduct } from '../controllers/ProductController';
import ProductForm from './Forms/ProductForm';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await getProducts();
        setProducts(result);
        if (result.length > 0) setCurrentProduct(result[0]);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleSave = async (newData) => {
    if (currentProduct) {
      try {
        const updatedProduct = await saveProduct(currentProduct.id, newData);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setCurrentProduct(updatedProduct);
      } catch (error) {
        console.error('Error saving product:', error);
        throw error;
      }
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      {currentProduct && (
        <ProductForm
          onSave={handleSave}
          initialName={currentProduct.name}
          initialQuantity={currentProduct.quantity}
        />
      )}
    </div>
  );
};

export default Product;
