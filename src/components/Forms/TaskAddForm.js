import React from 'react';
import PropTypes from 'prop-types';
import { TaskModel } from '../../models/taskModel';
import '../styles/TaskEdit.css';
import {MdDeleteOutline} from "react-icons/md";
import {getProducts} from "../../controllers/ProductController";

const TaskAddForm = ({ task, onSave, onCancel, error }) => {
    const [editedTask, setEditedTask] = React.useState(task);
    const [product, setProduct] = React.useState({
        productCode: '',
        from: '',
        to: '',
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

    const handleTaskChange = (event) => {
        if (event.target.name === "_date" && !event.target.value) {
            return;
        }
        setEditedTask({
            ...editedTask,
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
        onSave(editedTask);
    };

    const addProduct = () => {
        setProducts([...products, product]);
        setProduct({ productCode: '', from: '', to: '', quantity: '' });
    };

    const deleteProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    return (
        <div className="edit-task-page">
            <div className="header-edit">
                <h1>Add Task</h1>
            </div>
            <div className="body-task-edit">
                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="task-section">
                            <div className="content-section">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Operator Code*</label>
                                        <input className="form-control" type="text" name="_codOperator"
                                               value={editedTask._codOperator}
                                               onChange={handleTaskChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date*</label>
                                        <input className="form-control" type="date" name="_date"
                                               value={new Date(editedTask._date).toISOString().split('T')[0]}
                                               onChange={handleTaskChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Type *</label>
                                        <input className="form-control" type="text" name="_type"
                                               value={editedTask._type}
                                               onChange={handleTaskChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Status*</label>
                                        <input className="form-control" type="text" name="_status"
                                               value={editedTask._status} onChange={handleTaskChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-section">
                            <div className="content-section">
                                <div className="col-md-6">
                                    <div className="form-group">
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>From*</label>
                                        <input className="form-control" type="text" name="from" value={product.from}
                                               onChange={handleProductChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>To*</label>
                                        <input className="form-control" type="text" name="to" value={product.to}
                                               onChange={handleProductChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Quantity*</label>
                                        <input className="form-control" type="number" name="quantity"
                                               value={product.quantity} onChange={handleProductChange}/>
                                    </div>
                                </div>
                                <button type="button" onClick={addProduct} className="btn-AddProduct">Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                    <h1>Products Details</h1>
                    <div className="product-list-section">
                        <div className="table-section">
                            <table>
                                <thead>
                                <tr>
                                    <th>Product Code</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.productCode}</td>
                                        <td>{prod.from}</td>
                                        <td>{prod.to}</td>
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
                    {error && <div className="error-form-task">Please ensure all required fields are included</div>}
                    <div className="button-div">
                        <button className="btn-Submit-task" type="submit">Save</button>
                        <button className="btn-Cancel-task" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

TaskAddForm.propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default TaskAddForm;