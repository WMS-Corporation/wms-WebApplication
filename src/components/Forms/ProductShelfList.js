
import PropTypes from "prop-types";
import React from "react";
import {ShelfProductModel} from "../../models/logisticModel";
import ProductShelfItem from "./ProductShelfItem";
import ProductShelfForm from "./ProductShelfForm";

const ProductShelfList = ({ products, onAdd, onSave, onCancel, onEdit, onDelete, addingProduct, editingProduct, onError, onBack, error }) => {
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Product List</h1>
                <button className="btn-Add" onClick={onAdd}>
                    Add Product
                </button>
            </div>
            {addingProduct ? (
                <ProductShelfForm product={new ShelfProductModel()} onSave={onSave} onCancel={onCancel} onError={onError} error={error}/>
            ) : editingProduct ? (
                <ProductShelfForm product={editingProduct} onSave={onSave} onCancel={onCancel} onError={onError} error={error} edit={true}/>
            ) : null
            }
            <div className="table-task">
                <table>
                    <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <ProductShelfItem key={product._codProduct} product={product}
                                   onSave={onSave} onEdit={onEdit} onDelete={onDelete}/>
                    ))}
                    </tbody>
                </table>
                <button className="btn-Back" type="submit" onClick={() => onBack(products)}>Back To Shelf</button>
            </div>
        </div>
    );
};

ProductShelfList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.instanceOf(ShelfProductModel)).isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    addingProduct: PropTypes.bool,
    error: PropTypes.string,
    editingProduct: PropTypes.element
};

export default ProductShelfList;