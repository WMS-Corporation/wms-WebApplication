
import './styles/SettingsPage.css';
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {useAuth} from "../contexts/AuthContext";
import {saveUser} from "../controllers/UserController";
const Setting = () => {
    const { theme, toggleTheme } = useTheme() || {};
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const {user} = useAuth() || {};
    const [editedUser, setEditedUser] = React.useState(user);
    const handleChange = (event) => {
        if (!event.target.value) {
            return;
        }
        setEditedUser({
            ...editedUser,
            [event.target.name]: event.target.value,
        });
    };
    const handleSave = async () => {
        toggleTheme(selectedTheme);
        if(user._password === editedUser._password){
            editedUser._password = ""
        }
        await saveUser(editedUser._codUser, editedUser);
    };
    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <div className="setting">
                <div className="settings-section">
                    <h2>General Settings</h2>
                    <div className="form-group">
                        <label>Theme</label>
                        <select className="form-control" value={selectedTheme}
                                onChange={(e) => setSelectedTheme(e.target.value)}>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>
                <div className="settings-section">
                    <h2>Account Settings</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" type="text"
                               name="_username"
                               placeholder="Enter a new username"
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password"
                               name="_password"
                               placeholder="Enter a new password"
                               onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <button className="btn-Submit-setting" onClick={handleSave}>Save</button>
        </div>
    );
};

export default Setting;
