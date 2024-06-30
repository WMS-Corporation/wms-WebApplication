import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ProductModel from '../../models/productModel';
import '../styles/ProductEdit.css';
import {CorridorModel, ShelfModel, ShelfProductModel, ZoneModel} from "../../models/logisticModel";
import {getProducts} from "../../controllers/ProductController";

const ProductShelfForm = ({ product, onSave, onCancel, error, edit }) => {
    const [editedProduct, setEditedProduct] = React.useState(product);
    const [availableProducts, setAvailableProducts] = React.useState([]);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setAvailableProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
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
            {editedProduct._quantity ? (
                <h1>Edit Product</h1>
            ) : <h1>Add Product</h1>}
        </div>
        <div className="body-edit">
            <form onSubmit={handleSubmit}>
                <div className="content-edit">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Product Code *</label>
                            <select className="form-control" name="_codProduct" value={product._codProduct}
                                    onChange={handleChange} disabled={edit}>
                                <option value="">Select a product</option>
                                {availableProducts.map(prod => (
                                    <option key={prod._codProduct} value={prod._codProduct}>{prod._codProduct}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Stock *</label>
                            <input className="form-control" type="number" name="_stock"
                                   value={editedProduct._stock} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="button-div">
                            <button className="btn-Submit-task" type="submit" onClick={onSave}>Save</button>
                            <button className="btn-Cancel-task" type="button" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>

                </div>
                {error && <div className="error-form-task">{typeof error === 'string' ? error : error.toString()}</div>}
            </form>
        </div>
    </div>
    );
};

ProductShelfForm.propTypes = {
    product: PropTypes.instanceOf(ShelfProductModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string,
    edit: PropTypes.bool
};

export default ProductShelfForm;