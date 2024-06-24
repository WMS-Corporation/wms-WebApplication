
import PropTypes from "prop-types";
import React from "react";
import {CorridorModel, ZoneModel} from "../../models/logisticModel";
import CorridorItem from "./CorridorItem";
import CorridorForm from "./CorridorForm";

const CorridorList = ({ corridors, onAdd, onSave, onCancel, onEdit, onDelete, onView, addingCorridor, onError, onBack, error }) => {
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Corridor List</h1>
                <button className="btn-Add" onClick={onAdd}>
                    Add Corridor
                </button>
            </div>
            {addingCorridor ? (
                <CorridorForm corridor={new CorridorModel()} onSave={onSave} onCancel={onCancel} onError={onError} error={error}/>
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
                                      onSave={onSave} onEdit={onEdit} onDelete={onDelete} onView={onView}/>
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
    error: PropTypes.string
};

export default CorridorList;