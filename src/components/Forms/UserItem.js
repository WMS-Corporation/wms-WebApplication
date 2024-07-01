import {FiEdit2} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";
import PropTypes from "prop-types";
import React from "react";
import UserModel from "../../models/userModel";

const UserItem = ({ user, onEdit, onDelete }) => {
    return (
        <tr key={user._codUser}>
            <td>{user._username}</td>
            <td>{user._name}</td>
            <td>{user._surname}</td>
            <td>{user._type}</td>
            <td className="action">
                <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(user)}/></div>
                <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(user)}/></div>
            </td>
        </tr>
    );
};

UserItem.propTypes = {
    user: PropTypes.instanceOf(UserModel).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserItem;