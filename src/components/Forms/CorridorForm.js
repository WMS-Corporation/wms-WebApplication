import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductEdit.css';
import {CorridorModel} from "../../models/logisticModel";

const CorridorForm = ({ corridor, onSave, onCancel, error }) => {
    const [editedCorridor, setEditedCorridor] = React.useState(corridor);

    const handleChange = (event) => {
        if (event.target.name === "_expirationDate" && !event.target.value) {
            return;
        }
        setEditedCorridor({
            ...editedCorridor,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { _codCorridor, ...zoneWithoutCod } = editedCorridor;
        onSave(zoneWithoutCod);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="content-edit">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Name *</label>
                        <input className="form-control" type="string" name="_name"
                               value={editedCorridor._name} onChange={handleChange}/>
                    </div>
                </div>
                <div className="button-div-corridor">
                    <button className="btn-Submit" type="submit" onClick={onSave}>Save</button>
                    <button className="btn-Cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
            {error && <div className="error-form">{error}</div>}
        </form>
    );
};

CorridorForm.propTypes = {
    corridor: PropTypes.instanceOf(CorridorModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default CorridorForm;