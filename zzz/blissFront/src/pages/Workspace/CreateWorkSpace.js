import React, { useState, useEffect ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "./../../components/Account/Header";
import Workspacecolorpicker from "./selectworkspacecolor";
import "../../assets/scss/Account.scss";
import { addWorkspaceAction ,
         getWorkspaceDispatchAction,
         selectWorkspaceDispatchAction} from "../../redux/Action";
import workspaceprofileimg from "../../assets/images/workspace.png";
const Workspace = (props) => {
  const [workspace, setWorkspace] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [color , setColor] = useState('#FF6E5A')
  const [workspacePic, setWorkspacePic] = useState('')
  const [workSpaceImg , setWorkSpaceImg] = useState(workspaceprofileimg)
  const fileInput = useRef(null)

  
  const isValid = (e) => {
    let error = {};
    let formIsValid = true;

    if (workspace === "" || workspace.trim().length === 0) {
      formIsValid = false;
      error["workspace"] = "Please enter workspace";
    }

    setErrors(error);
    return formIsValid;
  };

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref;
  };

  const workspaceState = useSelector((state) => state.workspace);
  const preWorkspaceState = usePrevious(
    useSelector((state) => state.workspace)
  );
  console.log("workspaceState select", workspaceState);
  console.log("preWorkspaceState select", preWorkspaceState);

  const workspaceFun = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isValid(e)) {
      let data = {
        workspace: workspace,
        color:color,
      };
      
      const formData = new FormData()
      
      formData.append('workspace', workspace)
      formData.append('workspacePic', workspacePic)
      formData.append('color', color)
      
      if(workspacePic && workspacePic !='')
      {
        data = formData
      }

      addWorkspaceAction(data)
        .then((result) => {
          if (result.data.status === 200) {
            console.log("result", result.data.message, "success");
            createNotification("success", result.data.message);
            
            dispatch(getWorkspaceDispatchAction());
          } else {
             createNotification("error", result.data.message);
             dispatch(getWorkspaceDispatchAction());
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("valid");
    } else {
      setLoading(false);
      console.log("errors", errors);
    }
  };

  const handleColorChange = (e) =>{
      setColor(e.target.value)
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      const imageFile = event.target.files[0]
     //console.log("imageFile",imageFile.size)
     const fileSize = imageFile.size / 1048576
     console.log(fileSize,"fileSize")
      if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
        createNotification('error', 'Please select valid image in formats jpg|jpeg|png')
        return false
      }
      if(fileSize > 4)
      {
        createNotification('error', 'Please select file size upto 4 mb')
        return false
      }

      reader.onload = (e) => {
        setWorkSpaceImg(e.target.result)
      }
      setWorkspacePic(event.target.files[0])
      reader.readAsDataURL(event.target.files[0])
    }
  }
  const open_file =()=>{
    fileInput.current.click()
  }

  useEffect(() => {
    setLoading(true);

    if (workspaceState.workspace) {
      const { workspace } = workspaceState;
      let workSpaceArray = [];
      if (
        workspace &&
        workspace.workSpace &&
        workspace.workSpace._id &&
        workspace.workSpace.workspace
      ) {
        let obj = {
          _id: workspace.workSpace._id,
          workspace: workspace.workSpace.workspace,
          workspacePic: workspace.workSpace.workspacePic
            ? workspace.workSpace.workspacePic
            : "",
          color: workspace.workSpace.color ? workspace.workSpace.color : "",
        };
        workSpaceArray.push(obj);
      }
      if (workspace.acceptedInvites && workspace.acceptedInvites.length > 0) {
        workspace.acceptedInvites.map((obj) => workSpaceArray.push(obj));
      }
      console.log("workSpaceArray", workSpaceArray);
      if (workSpaceArray.length > 0) {
        if (workSpaceArray.length > 1) {
          setTimeout(() => {
              props.history.push("/selectWorkspace");
            }, 3000);
        } else {
          
          localStorage.setItem("userWorkspace", workSpaceArray[0].workspace);
          localStorage.setItem("userWorkspaceId", workSpaceArray[0]._id);
          let workspaceSelected = {
            workspace: workSpaceArray[0].workspace,
            _id: workSpaceArray[0]._id,
            workspacePic: workspace.workSpace.workspacePic
              ? workspace.workSpace.workspacePic
              : "",
            color: workspace.workSpace.color ? workspace.workSpace.color : "",
          };
          localStorage.setItem(
            "userWorkspaceObj",
            JSON.stringify(workspaceSelected)
          );

          if (preWorkspaceState.current !== workspaceState || workspaceState.selectedWorkspace === "") {
            console.log("workspaceSelected ",workspaceSelected)
            dispatch(selectWorkspaceDispatchAction(workspaceSelected));
          }

          setTimeout(() => {
            props.history.push("/inviteUser");
          }, 100);
        }
      }
    }
    setLoading(false);
  }, [workspaceState]);

  return (
    <React.Fragment>
      <Header />
      <div className="auth-sec">
      <div className="login-box selectworkspace">
          <h2 className="text-center mb-53 sofia-semibold">Create Workspace</h2>
           <div className="work-space-form">
          <Form onSubmit={(e) => workspaceFun(e)}>
            <Form.Group className="mb-60" controlId="formBasicEmail">
              <Form.Label className="sofia-semibold">Workspace Name</Form.Label>
              <Form.Control
                type="workspace"
                placeholder=""
                value={workspace}
                maxLength={30}
                onChange={(e) => setWorkspace(e.target.value)}
              />
              <p className="error_mesage"> {errors.workspace} </p>
         
            <div className="workspace-avatar">
            <Form.Label className="sofia-semibold">Workspace Avatar</Form.Label>
            <div className="workspace-name-box">
              <div className="workspace-pic">
                      <img className="profile-pic" src={workSpaceImg} />
                      <input
                      id="file"
                      ref={fileInput}
                      className="file-upload hide"
                      type="file"
                      name="workspaceImage"
                      accept="image/*"
                      onChange={(e)=>onImageChange(e)}
                     />
              </div>
              <div className="workspace-img-color">
                <div className="workspace-import-img">
                  <span>Import an Image:</span><Button variant="primary" className="w-100 mt-4 import-btn" onClick={open_file}>import</Button>
                </div>
                <div className="workspace-color">
                    <span>Pick a Colour:</span>
                    <div className="workspace-circlecolor">
                   <Workspacecolorpicker 
                    color={color}
                    handleColorChange={handleColorChange}

                   />
                    </div>
                </div>
              </div>
            </div>
            </div>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Create Workspace
            </Button>
          </Form>
          </div>
        </div>
        
      </div>
      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};

export default Workspace;
