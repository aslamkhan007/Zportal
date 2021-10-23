import axios from 'axios'
import * as CONFIG from '../../../src/config.json'

export const createStageAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.post(`${CONFIG.API_URL}/api/stage/create`, data, {
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

export const listStageAction = async (projectId) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/stage/list/${projectId}`, {
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

export const editStageAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.patch(`${CONFIG.API_URL}/api/stage/operations`, data, {
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
