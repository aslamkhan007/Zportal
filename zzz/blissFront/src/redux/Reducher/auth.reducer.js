import { authConstants } from "../ActionType";

const initstate = {
    user:[],
    token: null,
    authenticate: false,
    authenticating: false,
    loding: false,
    error: null,
    loginError: ''



}

const authReducer = (state = initstate, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case authConstants.LOGIN_SECCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                error: null,
                loginError: '',
                workspaceExist: action.payload.workSpaceObj.workSpaceExist,
                workspace:action.payload.workSpaceObj
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loginError: action.payload.loginError
            }
            break;
            case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loding:false
            }
            break
          
    }
    return state;
}




export default authReducer