import { userConstansts } from "../ActionType";

const initstate = {
    userByid:[],




}

const userReducer = (state = initstate, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case userConstansts.GET_USER_BY_SECCESS:
            state = {
                ...state,
                userByid: action.payload,
            }
         
          
    }
    return state;
}




export default userReducer