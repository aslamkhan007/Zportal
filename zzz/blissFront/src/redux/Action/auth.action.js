import { authConstants ,workspaceConstants} from "../ActionType";
//import axios from "../../Helper/config";
import axios from 'axios'
import * as CONFIG from '../../../src/config.json'

export const loginAction = (data) => {
  return (dispatch) => {
    console.log("axios",axios)
    try {
      axios
        .post(`${CONFIG.API_URL}/api/auth/login`, { ...data })
        .then((res) => {
          // console.log('res', res)
          if (res.data.status === 200) {
            console.log(res.data);
            const { token, user,workSpaceObj } = res.data;
            localStorage.setItem("blissToken", token);
            console.log("local===",localStorage.getItem("blissToken"));
            localStorage.setItem("userId", user._id);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("workspace", JSON.stringify(workSpaceObj));
            console.log("workSpaceObj",workSpaceObj)
            dispatch({
              type: authConstants.LOGIN_SECCESS,
              payload: res.data,
            });
            
          } else {
            dispatch({
              type: authConstants.LOGIN_FAILURE,
              payload: {
                error: res.data.message,
                loginError: true,
              },
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const afterLoginAction = () => {
  return (dispatch) => {
    console.log("axios",axios)
    try {
          const token = localStorage.getItem("blissToken")
          const user = localStorage.getItem("user")
          const workspace = localStorage.getItem("workspace")

          const data ={
             token: token,
             user: JSON.parse(user),
             workSpaceObj: JSON.parse(workspace)
          }

          dispatch({
            type: authConstants.LOGIN_SECCESS,
            payload: data,
          });
       
    } catch (error) {
      console.log(error);
    }
  };
};

export const ImpersinationloginAction = (data) => {
  return (dispatch) => {
    try {
      axios
        .post(`${CONFIG.API_URL}/api/auth/impersonateLogin`, { ...data })
        .then((res) => {
          // console.log('res', res)
          if (res.data.status === 200) {
            console.log(res.data);
            const { token, user,workSpaceObj } = res.data;
            localStorage.setItem("blissToken", token);
            localStorage.setItem("userId", user._id);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("workspace", JSON.stringify(workSpaceObj));
            console.log("workSpaceObj",workSpaceObj)
            dispatch({
              type: authConstants.LOGIN_SECCESS,
              payload: res.data,
            });
          } else {
            dispatch({
              type: authConstants.LOGIN_FAILURE,
              payload: {
                error: res.data.message,
                loginError: true,
              },
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const signupAction = async (data) => {
  console.log(data);
  try {
    let res = await axios.post(`${CONFIG.API_URL}/api/auth/register`, data);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
export const forgotPasswordAction = async (data) => {
  console.log(data);
  try {
    let res = await axios.post(`${CONFIG.API_URL}/api/auth/forgot-password`, data);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const resetPasswordAction = async (data) => {
  console.log(data);
  try {
    let res = await axios.post(`${CONFIG.API_URL}/api/auth/reset-password`, data);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const accountActivationAction = async (token) => {
    
    try {
      let res = await axios.patch(`${CONFIG.API_URL}/api/auth/activate/${token}`);
      return res;
    } catch (error) {
      console.log("error", error);
      return error;
    }
};


