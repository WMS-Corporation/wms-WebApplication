import React from "react";
import PropTypes from "prop-types";
import UserModel from "../../models/userModel";

const UserAddForm = ({ user, onSave, onCancel, error }) => {
    const [editedUser, setEditedUser] = React.useState(user);
    editedUser._password = ""
    const handleChange = (event) => {
        if (!event.target.value) {
            return;
        }
        setEditedUser({
            ...editedUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(editedUser);
    };

    return (
        <div className="edit-page">
            <div className="header-edit">
                <h1>Add User</h1>
            </div>
            <div className="body-edit">
                <form onSubmit={handleSubmit}>
                    <div className="content-edit">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Name *</label>
                                <input className="form-control" type="text" name="_name" value={editedUser._name}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Surname *</label>
                                <input className="form-control" type="text" name="_surname"
                                       value={editedUser._surname} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Username *</label>
                                <input className="form-control" type="text"
                                       name="_username"
                                       value={editedUser._username}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Password *</label>
                                <input className="form-control" type="password"
                                       name="_password"
                                       value={editedUser._password}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Type *</label>
                                <select className="form-control" name="_type" value={editedUser._type}
                                        onChange={handleChange}>
                                    <option value="Admin">Admin</option>
                                    <option value="Operational">Operational</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {error && <div className="error-form">{error}</div>}
                    <div className="button-div">
                        <button className="btn-Submit" type="submit">Save</button>
                        <button className="btn-Cancel" type="button" onClick={onCancel}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

UserAddForm.propTypes = {
    user: PropTypes.instanceOf(UserModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default UserAddForm;