
import PropTypes from "prop-types";
import React from "react";
import {StorageModel} from "../../models/logisticModel";
import StorageItem from "./StorageItem";

const StorageList = ({ storage, onAdd, onSave, onView, onDelete, onError }) => {
    onError(null)
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Storage List</h1>
                <button className="btn-Add" onClick={onSave}>
                    Add Storage
                </button>
            </div>
            <div className="table-task">
                <table>
                    <thead>
                    <tr>
                        <th>Storage Code</th>
                        <th>Zones</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {storage.map((store) => (
                        <StorageItem key={store._codStorage} storage={store}
                                   onView={onView} onDelete={onDelete}/>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

StorageList.propTypes = {
    storage: PropTypes.arrayOf(PropTypes.instanceOf(StorageModel)).isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default StorageList;