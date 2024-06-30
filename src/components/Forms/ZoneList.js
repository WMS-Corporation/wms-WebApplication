
import PropTypes from "prop-types";
import React from "react";
import {ZoneModel} from "../../models/logisticModel";
import ZoneItem from "./ZoneItem";
import {useAuth} from "../../contexts/AuthContext";

const ZoneList = ({ zones, onAdd, onSave, onEdit, onDelete, onView, onError, onBack, currentStorage }) => {
    onError(null)
    const { user } = useAuth() || {};
    return (
        <div className="task-list">
            {currentStorage ? (
                <>
                    <h1>Storage</h1>
                    <div className="content-section-view-zone">
                        <div className="col-md-6">
                            <div className="form-group-zone">
                                <label>Storage Code</label>
                                <input className="form-control" type="string"
                                       value={currentStorage._codStorage} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            <div className="header-list">
                <h2>Zone List</h2>
                {user._type === "Admin" ? (
                    <button className="btn-Add" onClick={onAdd}>
                        Add Zone
                    </button>
                ) : null}
            </div>
            <div className="table-task">
                <table>
                <thead>
                    <tr>
                        <th>Zone Code</th>
                        <th>Temperature</th>
                        <th>Cooling System Status</th>
                        <th>Humidity Level</th>
                        <th>Corridors</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {zones.map((zone) => (
                        <ZoneItem key={zone._codZone} zone={zone}
                                  onSave={onSave} onEdit={onEdit} onDelete={onDelete} onView={onView} type={user._type}/>
                    ))}
                    </tbody>
                </table>
                <button className="btn-Back" type="submit" onClick={() => onBack()}>Back</button>
            </div>
        </div>
    );
};

ZoneList.propTypes = {
    zones: PropTypes.arrayOf(PropTypes.instanceOf(ZoneModel)).isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    currentStorage: PropTypes.element
};

export default ZoneList;