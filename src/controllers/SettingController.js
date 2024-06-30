import {updateUser} from "../services/userService";

export const saveUser = async (codUser, userData) => {
    const dataToSend = { ...userData };
    delete dataToSend._codUser;
    return await updateUser(codUser, dataToSend);
};