import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductEdit.css';
import {ShelfModel} from "../../models/logisticModel";

const ShelfForm = ({ shelf, onSave, onCancel, error }) => {
    const [editedShelf, setEditedShelf] = React.useState(shelf);

    const handleChange = (event) => {
        if (event.target.name === "_expirationDate" && !event.target.value) {
            return;
        }
        setEditedShelf({
            ...editedShelf,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { _codShelf, ...zoneWithoutCod } = editedShelf;
        onSave(zoneWithoutCod);
    };

    return (
    <div className="edit-page">
        <div className="header-edit">
            {editedShelf._name ? (
                <h1>Edit Shelf</h1>
            ) : <h1>Add Shelf</h1>}
        </div>
        <div className="body-edit">
            <form onSubmit={handleSubmit}>
                <div className="content-edit">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name *</label>
                            <input className="form-control" type="string" name="_name"
                                   value={editedShelf._name} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="button-div-corridor">
                        <button className="btn-Submit" type="submit" onClick={onSave}>Save</button>
                        <button className="btn-Cancel" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
                {error && <div className="error-form">{typeof error === 'string' ? error : error.toString()}</div>}
            </form>
        </div>
    </div>
)
    ;
};

ShelfForm.propTypes = {
    shelf: PropTypes.instanceOf(ShelfModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default ShelfForm;