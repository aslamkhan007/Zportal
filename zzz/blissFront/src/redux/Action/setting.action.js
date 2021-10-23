
import axios from 'axios'
import * as CONFIG from '../../../src/config.json'

export const recycleBinActions = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.patch(`${CONFIG.API_URL}/api/settings/recyclebin/actions`, data, {
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

export const getRecycleBinItems = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/settings/recyclebin/list?isDeleted=true`, {
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

export const searchRecycleBinItems = async (text) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/settings//recyclebin/search/${text}?isDeleted=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log("error", error);
        return error;
    }
}

export const searchArchiveItems = async (text) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/settings//recyclebin/search/${text}?archived=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log("error", error);
        return error;
    }
}

export const getArchivedItems = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/settings/recyclebin/list?archived=true`, {
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








