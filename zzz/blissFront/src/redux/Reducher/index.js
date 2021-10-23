import {combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import workspaceReducer from "./workspace.reducer";
import programsReducer from "./programs.reducer"

const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    workspace:workspaceReducer,
    programs:programsReducer

})


export default rootReducer;