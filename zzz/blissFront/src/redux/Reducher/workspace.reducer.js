import { workspaceConstants } from "../ActionType";

const initstate = {
  workspace: {},
  error: null,
  workspaceError: "",
  selectedWorkspace:"",
  workspaceDataStatus: false
};

const workspaceReducer = (state = initstate, action) => {
   console.log("action.payload===",action.payload);
  switch (action.type) {
    case workspaceConstants.GET_WORKSPACE_SECCESS:
      state = {
        ...state,
        workspace: action.payload,
        error: null,
        workspaceError: "",
        workspaceDataStatus: true
      };
      break;
    case workspaceConstants.GET_WORKSPACE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        workspaceError: action.payload.workspaceError,
      };
      break;
    case workspaceConstants.SET_WORKSPACE_SECCESS:
      state = {
        ...state,
        selectedWorkspace: action.payload,
        error: null,
        workspaceError: "",
        workspaceDataStatus: true
      };
      break;
    case workspaceConstants.SET_WORKSPACE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        workspaceError: action.payload.workspaceError,
      };
      break;
  }
  return state;
};

export default workspaceReducer;
