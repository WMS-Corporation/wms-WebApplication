
import PropTypes from "prop-types";
import React from "react";
import {ShelfProductModel} from "../../models/logisticModel";
import ProductShelfItem from "./ProductShelfItem";
import ProductShelfForm from "./ProductShelfForm";
import {useAuth} from "../../contexts/AuthContext";

const ProductShelfList = ({ products, onAdd, onSave, onEdit, onDelete, currentShelf, onBack }) => {
    const { user } = useAuth() || {};
    return (
        <div className="task-list">
            {currentShelf ? (
                <>
                    <h1>Shelf</h1>
                    <div className="content-section-view">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Shelf Code</label>
                                <input className="form-control" type="string"
                                       value={currentShelf._codShelf} readOnly={true}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control" type="string"
                                       value={currentShelf._name} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                </>

            ) : null}
            <div className="header-list">
                <h2>Product List</h2>
                {user._type === "Admin" ? (
                    <button className="btn-Add" onClick={onAdd}>
                        Add Product
                    </button>
                ) : null}
            </div>
            <div className="table-task">
                <table>
                    <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Stock</th>
                        {user._type === "Admin" ? (
                            <th>Action</th>
                        ) : null}
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <ProductShelfItem key={product._codProduct} product={product}
                                   onSave={onSave} onEdit={onEdit} onDelete={onDelete} type={user._type}/>
                    ))}
                    </tbody>
                </table>
                <button className="btn-Back" type="submit" onClick={() => onBack(products)}>Back to Corridor</button>
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
    onBack: PropTypes.func.isRequired,
    currentShelf: PropTypes.element
};

export default ProductShelfList;