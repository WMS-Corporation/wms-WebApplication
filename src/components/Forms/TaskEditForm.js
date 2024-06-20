import React from 'react';
import PropTypes from 'prop-types';
import { TaskModel } from '../../models/taskModel';
import '../styles/TaskEdit.css';
import {getProducts} from "../../controllers/ProductController";
import {MdDeleteOutline} from "react-icons/md";

const TaskEditForm = ({ task, onSave, onCancel, error }) => {
    const [editedTask, setEditedTask] = React.useState(task);

    const [product, setProduct] = React.useState({
        _codProduct: '',
        _from: '',
        _to: '',
        _quantity: ''
    });
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
        const {name, value} = event.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value === '' ? null : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(editedTask);
    };

    const addProduct = () => {
        const updatedProductList = [...(editedTask._productList || []), product];
        setEditedTask({
            ...editedTask,
            _productList: updatedProductList
        });
        setProduct({ _codProduct: '', _from: '', _to: '', _quantity: '' });
    };

    const deleteProduct = (index) => {
        const updatedProductList = editedTask._productList.filter((_, i) => i !== index);
        setEditedTask({
            ...editedTask,
            _productList: updatedProductList
        });
    };

    return (
        <div className="edit-task-page">
            <div className="header-edit">
                <h1>Edit Task</h1>
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
                                        <select className="form-control" name="_type" value={editedTask._type}
                                                onChange={handleTaskChange}>
                                            <option value="">Select type</option>
                                            <option value="Loading">Loading</option>
                                            <option value="Unloading">Unloading</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Status*</label>
                                        <select className="form-control" name="_status" value={editedTask._status}
                                                onChange={handleTaskChange}>
                                            <option value="">Select status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Suspended">Suspended</option>
                                            <option value="Processing">Processing</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-section">
                            <div className="content-section">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Product Code*</label>
                                        <select className="form-control" name="_codProduct" value={product._codProduct}
                                                onChange={handleProductChange}>
                                            <option value="">Select a product</option>
                                            {availableProducts.map(prod => (
                                                <option key={prod._codProduct}
                                                        value={prod._codProduct}>{prod._codProduct}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>From*</label>
                                        <input className="form-control" type="text" name="_from" value={product._from}
                                               onChange={handleProductChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>To*</label>
                                        <input className="form-control" type="text" name="_to" value={product._to}
                                               onChange={handleProductChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Quantity*</label>
                                        <input className="form-control" type="number" name="_quantity"
                                               value={product._quantity} onChange={handleProductChange}/>
                                    </div>
                                </div>
                                <button type="button" onClick={addProduct} className="btn-AddProduct">Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                    <h1>Products Details</h1>
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
                            {(editedTask._productList || []).map((prod, index) => (
                                <tr key={index}>
                                    <td>{prod._codProduct}</td>
                                    <td>{prod._from}</td>
                                    <td>{prod._to}</td>
                                    <td>{prod._quantity}</td>
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
                    {error && <div className="error-form-task">{error}</div>}
                    <div className="button-div">
                        <button className="btn-Submit-task" type="submit">Save</button>
                        <button className="btn-Cancel-task" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

TaskEditForm.propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default TaskEditForm;