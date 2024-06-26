
import PropTypes from "prop-types";
import React from "react";
import { ShelfModel} from "../../models/logisticModel";
import ShelfItem from "./ShelfItem";
import ShelfForm from "./ShelfForm";
import {useAuth} from "../../contexts/AuthContext";

const ShelfList = ({ shelfs, onAdd, onSave, onCancel, onEdit, onDelete, onView, addingShelf, editingShelf, onError, onBack, error }) => {
    const { user } = useAuth() || {};
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Shelf List</h1>
                {user._type === "Admin" ? (
                    <button className="btn-Add" onClick={onAdd}>
                        Add Shelf
                    </button>
                ) : null}
            </div>
            {addingShelf ? (
                <ShelfForm shelf={new ShelfModel()} onSave={onSave} onCancel={onCancel} onError={onError} error={error}/>
            ) : editingShelf ? (
                <ShelfForm shelf={editingShelf} onSave={onSave} onCancel={onCancel} onError={onError} error={error}/>
            ) : null
            }
            <div className="table-task">
                <table>
                    <thead>
                    <tr>
                        <th>Shelf Code</th>
                        <th>Name</th>
                        <th>Products</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shelfs.map((shelf) => (
                        <ShelfItem key={shelf._codShelf} shelf={shelf}
                                  onSave={onSave} onEdit={onEdit} onDelete={onDelete} onView={onView} type={user._type}/>
                    ))}
                    </tbody>
                </table>
                <button className="btn-Back" type="submit" onClick={() => onBack(shelfs)}>Back To Corridor</button>
            </div>
        </div>
    );
};

ShelfList.propTypes = {
    shelfs: PropTypes.arrayOf(PropTypes.instanceOf(ShelfModel)).isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    addingShelf: PropTypes.bool,
    error: PropTypes.string,
    editingShelf: PropTypes.element
};

export default ShelfList;