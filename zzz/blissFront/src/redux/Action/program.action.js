import axios from 'axios'
import * as CONFIG from '../../../src/config.json'
import { programsConstants } from "../ActionType";

export const createProgramAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.post(`${CONFIG.API_URL}/api/program/create`, data, {
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

export const listProgramAction = (workspaceId) => async (dispatch) => {
    //   console.log("in program reducer workspaceId", workspaceId)
    try {
        let token = localStorage.getItem("blissToken")
        let result = await axios.get(`${CONFIG.API_URL}/api/program/list/${workspaceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("in program reducer", result.data)
        if (result.data.status === 200) {
            dispatch({
                type: programsConstants.LIST_PROGRAMS_SECCESS,
                payload: result.data.results,
            });
        } else {
            dispatch({
                type: programsConstants.LIST_PROGRAMS_FAILURE,
                payload: {
                    error: result.data.message,
                    programsError: true,
                },
            });
        }
    } catch (error) {
        console.log("error", error);
        return error;
    }
};


export const editProgramAction = async (data) => {
    try {
        let token = localStorage.getItem("blissToken")
        let res = await axios.patch(`${CONFIG.API_URL}/api/program/operation`, data, {
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