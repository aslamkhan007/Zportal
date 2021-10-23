import { userConstansts } from "../ActionType"
import axios from '../../Helper/config'
import * as CONFIG from '../../../src/config.json'

export const getUserById = async (id) => {
  try {
    let res = await axios.get(`/api/get/user/id/${id}`)
    return res
  }
  catch (error) {
    console.log("error", error)
    return error;
  }

}


export const updateUserAction = async (id, data) => {
  console.log(id, data);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  try {
    let res = axios.patch(`/api/update/user/${id}`, data, config)
    return res
  }
  catch (error) {
    console.log("error", error)
    return error;
  }
}

export const changePasswordAction1 = async (id, data) => {
  console.log(id);
  try {
    let res = axios.patch(`/api/update/password/${id}`, { ...data })
    return res
  }
  catch (error) {
    console.log("error", error)
    return error;
  }
}