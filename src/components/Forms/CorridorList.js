
import PropTypes from "prop-types";
import React from "react";
import {CorridorModel, ZoneModel} from "../../models/logisticModel";
import CorridorItem from "./CorridorItem";

const CorridorList = ({ corridors, onAdd, onSave, onEdit, onDelete, onView, onError, onBack }) => {
    onError(null)
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Corridor List</h1>
                <button className="btn-Add" onClick={onAdd}>
                    Add Corridor
                </button>
            </div>
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
                <button className="btn-Back" type="submit" onClick={() => onBack(corridors)}>Back To Zone</button>
            </div>
        </div>
    );
};
CorridorList.propTypes = {
    corridors: PropTypes.arrayOf(PropTypes.instanceOf(CorridorModel)).isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default CorridorList;