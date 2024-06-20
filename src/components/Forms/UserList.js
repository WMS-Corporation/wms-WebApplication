import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UserList.css';
import UserModel from "../../models/userModel";
import UserItem from "./UserItem";

const UserList = ({ users, onAdd, onEdit, onDelete, onSave, onError }) => {
    onError(null)
    return (
        <div className="user-list">
            <div className="header-list">
                <h1>User List</h1>
                <button className="btn-Add" onClick={onAdd}>
                    Add User
                </button>
            </div>
            <div className="table-user">
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <UserItem key={user._codUser} user={user} onEdit={onEdit} onDelete={onDelete}
                                  onSave={onSave}/>

                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.instanceOf(UserModel)).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default UserList;