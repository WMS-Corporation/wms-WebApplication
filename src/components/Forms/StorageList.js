
import PropTypes from "prop-types";
import React from "react";
import {StorageModel} from "../../models/logisticModel";
import StorageItem from "./StorageItem";
import {useAuth} from "../../contexts/AuthContext";

const StorageList = ({ storage, onSave, onView, onDelete, onError }) => {
    onError(null)
    const { user } = useAuth() || {};
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Storage List</h1>
                {user._type === "Admin" ? (
                    <button className="btn-Add" onClick={onSave}>
                        Add Storage
                    </button>
                ) : null}
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
                                   onView={onView} onDelete={onDelete} type={user._type}/>
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
    onView: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default StorageList;