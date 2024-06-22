
import PropTypes from "prop-types";
import React from "react";
import {ShelfModel, ShelfProductModel, ZoneModel} from "../../models/logisticModel";
import ProductShelfItem from "./ProductShelfItem";

const ProductShelfList = ({ products, onAdd, onSave, onEdit, onDelete, onError, onBack }) => {
    onError(null)
    console.log(products)
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Product List</h1>
                <button className="btn-Add" onClick={onAdd}>
                    Add Product
                </button>
            </div>
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
                <button className="btn-Back" type="submit" onClick={() => onBack(products)}>Back To Corridor</button>
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
};

export default ProductShelfList;