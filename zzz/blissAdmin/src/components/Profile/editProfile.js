import React, { useState, useEffect,useContext } from "react";
import * as collaboratorApi from "../../api/collaboratorApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import {
  userContext,
} from "../../context/userContext";

const Login = (props) => {
  var  context = useContext(userContext);

  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});
  const [licence, setLicence] = useState({});


  const isFormValid = () => {
    const domain_regx = /^[A-Za-z0-9-]+$/;
    
    var regex_email = /^(([^!<>#$%^&*()[\]\\.,;:\s@\"]+(\.[^#$%^&*!<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.first_name) {
      setError({ first_name: "First name is required!"});
        return false;
    }
    else if (!data.last_name) {
      setError({ last_name: "Last name is required!"});
        return false;
    }
    else if (!data.phone) {
      setError({ phone: "Phone no. is required!"});
        return false;
    }
    else {
      setError({});
        return true;
    }

}
  const handleSubmit = async() =>
  {
    console.log(data,'data')
    const isValid = await isFormValid();
    console.log(props.history,'121212')
    if(isValid)
    {
      let id = '';
      const Response = await collaboratorApi.UpdateCollaboratorAPI(data,id);
      if(Response.data.status == 200 )
      {
        CreateNotification("success",Response.data.message)
        let userData = JSON.parse(localStorage.getItem('userData'));
        if(userData)
        {
          userData.first_name = data.first_name;
          userData.last_name = data.last_name;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
      context.UpdateUserContext({...context.user,first_name:data.first_name,last_name:data.last_name});

      }
      else if(Response.data.status == 401)
      {
       CreateNotification("danger","Session has been expired!")
        localStorage.clear();
        props.history.push('/login')
      }
      else
      {
      CreateNotification("danger",Response.data.message)
      }
    }
    
  }

const getSingleCLient = async() =>
{
  let id = '';
    const Response = await collaboratorApi.getSingleCollaboratorAPI(id);
  
    if(Response.data.status == 200)
    {
      setData(Response.data.data);
    }
    else if(Response.data.status == 401)
    {
    CreateNotification("danger","Session has been expired!")
      localStorage.clear();
      props.history.push('/login')
    }
    else
    {
    CreateNotification("danger","Something went wrong, please try again later!")
    }
   
}

  const onchange = async(event) =>
  {
    setError({});
   
    const { name, value } = event.target;
    setData(prevState => ({ ...prevState, [name]: value }));
   
  }

  const onImageChange = async(event) =>
  {
    setError({});
    const Response = await collaboratorApi.uploadImages(event.target.files);
    console.log(Response.data.data[0],'Response.data.data');
    if(Response.data.status == 200)
    {
    const profile_img  = 'profile_img';
    context.UpdateUserContext({...context.user,profile_img:Response.data.data[0].filename});
    setData(prevState => ({ ...prevState, [profile_img]: Response.data.data[0].filename }));
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(userData)
    {
      userData.profile_img = Response.data.data[0].filename;
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    }
    else if(Response.data.status == 401)
    {
    CreateNotification("danger","Session has been expired!")
      localStorage.clear();
      props.history.push('/login')
    }
    else
    {
    CreateNotification("danger","Something went wrong, please try again later!")
    }
   
  }

  useEffect(async()=>{
    getSingleCLient();
  },[]);

    return (
      <div className="container-fluid p-0">
      <h1 className="h3 mb-3">Profile</h1>
      <div className="row">
       
        <div className="col-md-12 col-xl-12">
          <div className="tab-content">
            <div className="tab-pane fade show active" id="account" role="tabpanel">
              <div className="card">
                <div className="card-header">
                  <div className="card-actions float-end">
                    <div className="dropdown show">
                      <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                        <i className="align-middle" data-feather="more-horizontal" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title mb-0">Private info</h5>
                </div>
                <div className="card-body">
                
                    <div className="row">
                      <div className="col-md-8">
                        <div className="mb-3">
                          <label htmlFor="inputUsername" className="form-label">First Name</label>
                          <input type="text" className="form-control" value={data.first_name} id="inputUsername" placeholder="First Name" name="first_name" onChange={(e) => {onchange(e)}}/>
                          <span class="form-error">{error.first_name}</span>

                        </div>
                        <div className="mb-3">
                          <label htmlFor="inputUsername" className="form-label">Last Name</label>
                          <input type="text" className="form-control" id="inputUsername" placeholder="Last Name" name="last_name" value={data.last_name} onChange={(e) => {onchange(e)}}/>
                          <span class="form-error">{error.last_name}</span>

                        </div>
                        <div className="mb-3">
                          <label htmlFor="inputUsername" className="form-label">Email</label>
                          <input type="text" className="form-control" id="inputUsername" placeholder="Email" value={data.email}readOnly/>

                        </div>
                        <div className="mb-3">
                          <label htmlFor="inputUsername" className="form-label">Phone No.</label>
                          <input type="text" className="form-control" id="inputUsername" placeholder="Phone number" name="phone" value={data.phone}/>
                          <span class="form-error">{error.phone}</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center">
                          <img alt="Chris Wood" src={`${CONFIG.API_URL}/uploads/${context.user.profile_img}`} className="rounded-circle img-responsive mt-2" width={128} height={128} />
                          <div className="mt-2">

                            <label className="btn btn-primary" for="upload-photo"><i className="fa fa-upload" /> Upload</label>
                            <input accept="image/png, image/jpeg, image/jpg" type="file" name="photo" id="upload-photo" style={{display: 'none'}} onChange={(e) => {onImageChange(e)}}/>

                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                    <button type="submit" className="btn btn-primary" onClick={() => {handleSubmit()}}>Save changes</button>
                
                </div>
              </div>
              
            </div>
        
          </div>
        </div>
      </div>
    </div>
    );
};

export default Login;