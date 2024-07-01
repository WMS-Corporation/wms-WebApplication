import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductEdit.css';
import {ZoneModel} from "../../models/logisticModel";

const ZoneForm = ({ zone, onSave, onCancel, error }) => {
    const [editedZone, setEditedZone] = React.useState(zone);

    const handleChange = (event) => {
        if (event.target.name === "_expirationDate" && !event.target.value) {
            return;
        }
        setEditedZone({
            ...editedZone,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { _codZone, ...zoneWithoutCod } = editedZone;
        onSave(zoneWithoutCod);
    };

    return (
        <div className="edit-page">
            <div className="header-edit">
                {editedZone._temperature ? (
                    <h1>Edit Zone</h1>
                ) : <h1>Add Zone</h1>}
            </div>
            <div className="body-edit">
                <form onSubmit={handleSubmit}>
                    <div className="content-edit">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Temperature *</label>
                                <input className="form-control" type="number" name="_temperature"
                                       value={editedZone._temperature} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Cooling System Status *</label>
                                <select className="form-control"
                                        name="_coolingSystemStatus"
                                        value={editedZone._coolingSystemStatus}
                                        onChange={handleChange}>
                                    <option value="">Select status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Humidity Level *</label>
                                <input className="form-control" type="number" name="_humidityLevel" value={editedZone._humidityLevel}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                    {error && <div className="error-form">{error}</div>}
                    <div className="button-div">
                        <button className="btn-Submit" type="submit" onClick={onSave}>Save</button>
                        <button className="btn-Cancel" type="button" onClick={onCancel}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

ZoneForm.propTypes = {
    zone: PropTypes.instanceOf(ZoneModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default ZoneForm;