
import PropTypes from "prop-types";
import React from "react";
import { ShelfModel} from "../../models/logisticModel";
import ShelfItem from "./ShelfItem";
import ShelfForm from "./ShelfForm";
import {useAuth} from "../../contexts/AuthContext";

const ShelfList = ({ shelfs, onAdd, onSave, onEdit, onDelete, onView, currentCorridor, onBack }) => {
    const { user } = useAuth() || {};
    return (
        <div className="task-list">
            {currentCorridor ? (
                <>
                    <h1>Corridor</h1>
                    <div className="content-section-view">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Corridor Code</label>
                                <input className="form-control" type="string"
                                       value={currentCorridor._codCorridor} readOnly={true}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control" type="string"
                                       value={currentCorridor._name} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                </>

            ) : null}
            <div className="header-list">
                <h2>Shelf List</h2>
                {user._type === "Admin" ? (
                    <button className="btn-Add" onClick={onAdd}>
                        Add Shelf
                    </button>
                ) : null}
            </div>
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
                <button className="btn-Back" type="submit" onClick={() => onBack(shelfs)}>Back To Zone</button>
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
    currentCorridor: PropTypes.element
};

export default ShelfList;