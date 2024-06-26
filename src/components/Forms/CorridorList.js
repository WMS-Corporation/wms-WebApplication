
import PropTypes from "prop-types";
import React from "react";
import {CorridorModel, ZoneModel} from "../../models/logisticModel";
import CorridorItem from "./CorridorItem";
import CorridorForm from "./CorridorForm";
import {useAuth} from "../../contexts/AuthContext";

const CorridorList = ({ corridors, onAdd, onSave, onCancel, onEdit, onDelete, onView, addingCorridor, editingCorridor, onError, onBack, error }) => {
    const { user } = useAuth() || {};
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Corridor List</h1>
                {user._type === "Admin" ? (
                    <button className="btn-Add" onClick={onAdd}>
                        Add Corridor
                    </button>
                ) : null}
            </div>
            {addingCorridor ? (
                <CorridorForm corridor={new CorridorModel()} onSave={onSave} onCancel={onCancel} onError={onError} error={error}/>
            ) : editingCorridor ? (
                <CorridorForm corridor={editingCorridor} onSave={onSave} onCancel={onCancel} onError={onError} error={error}/>
            ) : null
            }
            <div className="table-task">
                <table>
                    <thead>
                    <tr>
                        <th>Corridor Code</th>
                        <th>Name</th>
                        <th>Shelf</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {corridors.map((corridor) => (
                        <CorridorItem key={corridor._codCorridor} corridor={corridor}
                                      onSave={onSave} onEdit={onEdit} onDelete={onDelete} onView={onView} type={user._type}/>
                    ))}
                    </tbody>
                </table>
                <button className="btn-Back" type="submit" onClick={() => onBack()}>Back To Zone</button>
            </div>
        </div>
    );
};
CorridorList.propTypes = {
    corridors: PropTypes.arrayOf(PropTypes.instanceOf(CorridorModel)).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    addingCorridor: PropTypes.bool,
    error: PropTypes.string,
    editingCorridor: PropTypes.element
};

export default CorridorList;