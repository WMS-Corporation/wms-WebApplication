
import PropTypes from "prop-types";
import React from "react";
import {ZoneModel} from "../../models/logisticModel";
import ZoneItem from "./ZoneItem";
import {useAuth} from "../../contexts/AuthContext";

const ZoneList = ({ zones, onAdd, onSave, onEdit, onDelete, onView, onError, onBack }) => {
    onError(null)
    const { user } = useAuth() || {};
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Zone List</h1>
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
                <button className="btn-Back" type="submit" onClick={() => onBack()}>Back To Storage</button>
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
};

export default ZoneList;