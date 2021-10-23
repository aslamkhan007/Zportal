
import axios from 'axios'
import * as CONFIG from '../../../src/config.json'

export const createTicketAction = async (data) => {
    console.log("data===", data)
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.post(`${CONFIG.API_URL}/api/ticket/create`, data, {
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


export const editTicketAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.patch(`${CONFIG.API_URL}/api/ticket/operations`, data, {
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