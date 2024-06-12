import {register} from "../services/registerUserService";

export const registerUser = async (username, password, name, surname) => {
    return await register(username, password, name, surname);
};
