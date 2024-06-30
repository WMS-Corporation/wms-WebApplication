
import PropTypes from "prop-types";
import React from "react";
import {CorridorModel, ZoneModel} from "../../models/logisticModel";
import CorridorItem from "./CorridorItem";
import CorridorForm from "./CorridorForm";
import {useAuth} from "../../contexts/AuthContext";

const CorridorList = ({ corridors, onAdd, onSave, onEdit, onDelete, onView, currentZone, onBack }) => {
    const { user } = useAuth() || {};
    return (
        <div className="task-list">
            {currentZone ? (
                <>
                    <h1>Zone</h1>
                    <div className="content-section-view">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Zone Code</label>
                                <input className="form-control" type="string"
                                       value={currentZone._codZone} readOnly={true}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Temperature</label>
                                <input className="form-control" type="string"
                                       value={currentZone._temperature} readOnly={true}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Cooling System</label>
                                <input className="form-control" type="string"
                                       value={currentZone._coolingSystemStatus}
                                       readOnly={true}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Humidity Level</label>
                                <input className="form-control" type="string"
                                       value={currentZone._humidityLevel} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                </>

            ) : null}
            <div className="header-list">
                <h2>Corridor List</h2>
                {user._type === "Admin" ? (
                    <button className="btn-Add" onClick={onAdd}>
                        Add Corridor
                    </button>
                ) : null}
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
                                      onSave={onSave} onEdit={onEdit} onDelete={onDelete} onView={onView}
                                      type={user._type}/>
                    ))}
                    </tbody>
                </table>
                <button className="btn-Back" type="submit" onClick={() => onBack()}>Back to Storage</button>
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
    currentZone: PropTypes.element
};

export default CorridorList;