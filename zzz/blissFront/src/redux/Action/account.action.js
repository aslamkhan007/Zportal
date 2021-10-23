
import axios from 'axios'
import * as CONFIG from '../../../src/config.json'

export const changeProfilePicture = async (data) => {

    try {
        const formData = new FormData();
        for (let file of data) {
            formData.append("profileImage", file);
        }
        let token = localStorage.getItem("blissToken")
        let res = await axios.post(`${CONFIG.API_URL}/api/auth/changeProfile`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log("error", error);
        return error;
    }
};

export const changePassword = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.post(`${CONFIG.API_URL}/api/auth/changePassword`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log("error", error);
        return error;
    }
};

export const changeTimeZone = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.patch(`${CONFIG.API_URL}/api/auth/changeTimeZone`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log("error", error);
        return error;
    }
};






