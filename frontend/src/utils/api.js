import axios from "axios";
import { USER_API_END_POINT } from "./constant.js";

export const register = async (data) => {
    const response = await axios.post(`${USER_API_END_POINT}/register`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    return response;
};

export const login = async (data) => {
    const response = await axios.post(`${USER_API_END_POINT}/login`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    return response;
};

export const logout = async () => {
    const response = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
    });
    return response;
};