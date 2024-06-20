import RegisterModel from "../models/registerModel";
import { API_URL } from '../config';

export const register = async (username, password, name, surname, type) => {
    if(!type){
        type = "Operational"
    }
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new RegisterModel(username, password, name, surname, type)),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message)
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};