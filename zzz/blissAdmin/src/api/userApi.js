import axios from "axios";
import * as CONFIG from "../config.json";

export const getAddLicenceAPI = async() => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/client-add-data`,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}
export const getSingleClientAPI = async(id) => {
  
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/single-client`,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const getSingleUserAPI = async(id) => {
  
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/single-client/${id}`,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}




export const getTeamAPI = async(data) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/get-team`,
        data,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}




export const uploadImages = async(data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      const formData = new FormData();
      for(let file of data)
      {
      formData.append("image", file);
      }
      const response = await axios.post(
        `${CONFIG.API_URL}/admin/upload-images/${userData.id}`,
        formData,
        {headers:{"Content-Type":"application/json"}}
      );
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const UpdateTeamAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/admin/update-team/${id}`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const UpdateClientAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/admin/update-client`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}




export const CreateTeamAPI = async(data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {

  try{
    axios.defaults.headers.common['Authorization'] = userData.jwt;

    const response = await axios.post(
      `${CONFIG.API_URL}/admin/add-team`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    // console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}
}

export const ForgotAPI  = async(data) => {
  console.log("LoginAPI", data);
  try{
    const response = await axios.post(
      `${CONFIG.API_URL}/admin/forgot`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}


export const ResetAPI  = async(data) => {
  console.log("LoginAPI", data);
  try{
    const response = await axios.post(
      `${CONFIG.API_URL}/admin/reset`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}

export const LoginAPI = async(data) => {
  console.log("LoginAPI", data);
  try{
    const response = await axios.post(
      `${CONFIG.API_URL}/admin/login`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}

export const changePwAPI = async(data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/admin/change-password`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}



