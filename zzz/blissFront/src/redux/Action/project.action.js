
import axios from 'axios'
import * as CONFIG from '../../../src/config.json'

export const createProjectAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.post(`${CONFIG.API_URL}/api/project/create`, data, {
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

export const createStatusAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.post(`${CONFIG.API_URL}/api/project/createStatus`, data, {
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

export const listProjectAction = async (workspaceId) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/project/list/${workspaceId}`, {
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


export const getProjectAction = async (projectId) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/project/getProject/${projectId}`, {
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

export const editProjectAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.patch(`${CONFIG.API_URL}/api/project/operation`, data, {
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

export const editStatusAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.patch(`${CONFIG.API_URL}/api/project/statusOperations`, data, {
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



export const ProjectAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.patch(`${CONFIG.API_URL}/api/project/operation`, data, {
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

export const getProjectBoardView = async (projectId) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/project/getProjectBoardView/${projectId}`, {
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

export const getProjectGanttView = async (projectId) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.get(`${CONFIG.API_URL}/api/project/getProjectGanttView/${projectId}`, {
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









