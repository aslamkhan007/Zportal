import { workspaceConstants } from "../ActionType";
//import axios from "../../Helper/config";
import axios from 'axios'
import * as CONFIG from '../../../src/config.json'

export const addWorkspaceAction = async (data) => {

  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.post(`${CONFIG.API_URL}/api/workspace/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const inviteUserAction = async (data) => {
  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.post(`${CONFIG.API_URL}/api/workspace/invite`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const acceptUserAction = async (data) => {
  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.post(`${CONFIG.API_URL}/api/workspace/acceptInvite`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getWorkspaceAction = async () => {
  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.get(`${CONFIG.API_URL}/api/workspace/getWorkSpaceObject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }

};

export const getWorkspaceDispatchAction = () => async (dispatch) => {
  try {
    let token = localStorage.getItem("blissToken")
    let result = await axios.get(`${CONFIG.API_URL}/api/workspace/getWorkSpaceObject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.data.status === 200) {
      const { workSpaceObj } = result.data;
      console.log("workSpaceObj", workSpaceObj);
      dispatch({
        type: workspaceConstants.GET_WORKSPACE_SECCESS,
        payload: workSpaceObj,
      });
    } else {
      dispatch({
        type: workspaceConstants.GET_WORKSPACE_FAILURE,
        payload: {
          error: result.data.message,
          workspaceError: true,
        },
      });
    }
  } catch (error) {
    console.log("error", error);
    return error;
  }

};

export const selectWorkspaceDispatchAction = (selectedWorkspace) => async (dispatch) => {
  console.log("selectedWorkspace==", selectedWorkspace)
  try {
    dispatch({
      type: workspaceConstants.SET_WORKSPACE_SECCESS,
      payload: selectedWorkspace,
    });
  } catch (error) {
    console.log("error", error);
    return error;
  }
};



export const getWorkspaceUsersAction = async (workspaceId) => {
  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.get(`${CONFIG.API_URL}/api/workspace/users/${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const searchWorkspaceUsersAction = async (workspaceId, searchText) => {
  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.get(`${CONFIG.API_URL}/api/workspace/search/${workspaceId}/${searchText}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const deleteUsersAction = async (data) => {
  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.post(`${CONFIG.API_URL}/api/workspace/removeuser`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
export const updateUsersAction = async (data, type) => {
  try {
    let token = localStorage.getItem("blissToken");
    let res = await axios.post(
      `${CONFIG.API_URL}/api/workspace/updateuser`,
      data,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { operationType: type },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const rejectUserAction = async (data) => {
  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.post(`${CONFIG.API_URL}/api/workspace/rejectInvite`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};



export const getInvitedWorkspaceUsersAction = async (workspaceId) => {
  try {
    let token = localStorage.getItem("blissToken")
    let res = await axios.get(`${CONFIG.API_URL}/api/workspace/ws-users/${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

