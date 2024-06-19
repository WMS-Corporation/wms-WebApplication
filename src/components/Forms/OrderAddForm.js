import React from 'react';
import PropTypes from 'prop-types';
import { OrderModel } from '../../models/orderModel';
import '../styles/OrderEdit.css';
import {MdDeleteOutline} from "react-icons/md";
import {getProducts} from "../../controllers/ProductController";

const OrderAddForm = ({ order, onSave, onCancel, error }) => {
    const [editedOrder, setEditedOrder] = React.useState(order);
    const [product, setProduct] = React.useState({
        productCode: '',
        quantity: ''
    });
    const [products, setProducts] = React.useState([]);
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

    const handleOrderChange = (event) => {
        if (event.target.name === "_date" && !event.target.value) {
            return;
        }
        setEditedOrder({
            ...editedOrder,
            [event.target.name]: event.target.value,
        });
    };

    const handleProductChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(editedOrder);
    };

    const addProduct = () => {
        setProducts([...products, product]);
        setProduct({ productCode: '', quantity: '' });
    };

    const deleteProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    return (
        <div className="edit-order-page">
            <div className="header-edit-order">
                <h1>Add Order</h1>
            </div>
            <div className="body-order-edit">
                <form onSubmit={handleSubmit}>
                    <div className="form-content-order">
                        <div className="order-section">
                            <div className="content-section-order">
                                <div className="col-md-6-order">
                                    <div className="form-group-order">
                                        <label>Date*</label>
                                        <input className="form-control-order" type="date" name="_date"
                                               value={new Date(editedOrder._date).toISOString().split('T')[0]}
                                               onChange={handleOrderChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6-order">
                                    <div className="form-group-order">
                                        <label>Status*</label>
                                        <input className="form-control-order" type="text" name="_status"
                                               value={editedOrder._status} onChange={handleOrderChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-section-order">
                            <div className="content-section-order">
                                <div className="col-md-6-order">
                                    <div className="form-group-order">
                                        <label>Product Code*</label>
                                        <select className="form-control" name="productCode" value={product.productCode}
                                                onChange={handleProductChange}>
                                            <option value="">Select a product</option>
                                            {availableProducts.map(prod => (
                                                <option key={prod.code} value={prod.code}>{prod.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6-order">
                                    <div className="form-group-order">
                                        <label>Quantity*</label>
                                        <input className="form-control-order" type="number" name="quantity"
                                               value={product.quantity} onChange={handleProductChange}/>
                                    </div>
                                </div>
                                <button type="button" onClick={addProduct} className="btn-AddProduct-order">Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                    <h1>Products Details</h1>
                    <div className="product-list-section-order">
                        <div className="table-section-order">
                            <table>
                                <thead>
                                <tr>
                                    <th>Product Code</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.productCode}</td>
                                        <td>{prod.quantity}</td>
                                        <td className="action">
                                            <div className="delete"><MdDeleteOutline className="delete-icon"
                                                                                     onClick={() => deleteProduct(index)}/>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {error && <div className="error-form-order">Please ensure all required fields are included</div>}
                    <div className="button-div-order">
                        <button className="btn-Submit-order" type="submit">Save</button>
                        <button className="btn-Cancel-order" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

OrderAddForm.propTypes = {
    order: PropTypes.instanceOf(OrderModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default OrderAddForm;