import React, {useEffect, useState} from "react";
import {useApplicationGlobal} from "../contexts/AppGlobalContext";
import ProductEditForm from "./Forms/ProductEditForm";
import {getAllUsers, saveUser} from "../controllers/UserController";
import {deleteUser} from "../services/userService";
import UserList from "./Forms/UserList";
import UserAddForm from "./Forms/UserAddForm";
import UserModel from "../models/userModel";
import {registerUser} from "../controllers/RegisterController";

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        editingUser,
        setEditingUser,
        addingUser,
        setAddingUser
    } = useApplicationGlobal() || {};

    const loadUsers = async () => {
        try {
            const result = await getAllUsers();
            setUsers(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleAdd = () => {
        setAddingUser(true);
    };

    const handleSave = async (user) => {
        try {
            if (addingUser) {
                await registerUser(user._username, user._password, user._name, user._surname);
                setAddingUser(false);
            } else {
                await saveUser(user._codUser, user);
            }
            loadUsers()
            setEditingUser(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
        setAddingUser(false);
        setError(null)
    };

    const handleDelete = async (user) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(user._codUser);
                loadUsers();
            } catch (error) {
                setError(error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (addingUser) {
        return <UserAddForm user={new UserModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>;
    } else if (editingUser) {
        return <UserAddForm user={editingUser} onSave={handleSave} onCancel={handleCancel} error={error}/>;
    } else {
        return <UserList users={users} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onSave={handleSave} onError={setError}/>;
    }
};

export default User;