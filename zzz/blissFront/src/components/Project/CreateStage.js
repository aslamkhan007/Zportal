import React, { Component,useEffect,useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createStageAction ,editStageAction } from "../../redux/Action";
import { NotificationContainer } from "react-notifications";
import { createNotification } from "../../Helper/helper";
import { Loader } from "../Loader/loader";

const CreateStage = (props) => {

  const [stageName ,setStageName]= useState()  
  const [errors, setErrors]= useState([])
  const [loading, setLoading]= useState(false)

  const handleClose = () => {
    props.isShowPopup(false);
  };

  const isValid = (e) => {
    let error = {};
    let formIsValid = true;

    if (stageName === "" || stageName.trim().length === 0) {
      formIsValid = false;
      error["stageName"] = "Please enter stage name";
    }
     setErrors(error);
    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("in submit");
    props.isStageChangeOrAdd(true)
    setLoading(true);
    if (isValid(e)) {
      if(props.type && props.type === 'edit')
      {
        const data = {
          name: stageName,
          stageId: props.id && props.id ? props.id:'',
          operationType: 'edit'
        }; 
        editStageAction(data)
          .then((result) => {
            if (result.status === 200) {
              createNotification("success", result.message);
              props.isShowPopup(false);
              props.isStageChangeOrAdd(true)
            } else {
              createNotification("error", result.message);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("valid");
      }else{
        const data = {
          name: stageName,
          projectId: props.project && props.project._id ? props.project._id:''
        }; 
        createStageAction(data)
          .then((result) => {
            if (result.status === 200) {
              createNotification("success", result.message);
              props.isShowPopup(false);
              props.isStageChangeOrAdd(true)
            } else {
              createNotification("error", result.message);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("valid");
      }
      
    } else {
      setLoading(false);
      console.log("errors", errors);
    }
  };

  useEffect(()=>{
    setStageName(props.name)
  },[props.name])

 
  return (
    <>
      <Modal
        className="basic-Modals createProject_modal"
        show={props.showStagePopup}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>{props.title && props.title}</h4>
            {/* <svg
              width="19"
              height="6"
              viewBox="0 0 19 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="2.475"
                cy="2.72402"
                rx="2.475"
                ry="2.475"
                fill="#DBDBDB"
              />
              <ellipse
                cx="9.07559"
                cy="2.72402"
                rx="2.475"
                ry="2.475"
                fill="#DBDBDB"
              />
              <circle cx="15.6752" cy="2.72402" r="2.475" fill="#DBDBDB" />
            </svg> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="createProject-form">
            <form onSubmit={(e)=>onSubmit(e)}>
            <div className="field-group">
                <label>Stage Name</label>
                <input type="text" 
                       className="form-control" 
                       value={stageName}
                       onChange={(e) => setStageName(e.target.value)}
                       />
                <p className="error_mesage"> {errors.stageName} </p>       
              </div>
              <div className="field-group-action">
                <button type="submit" className="fadeButton">
                  {props.btnText && props.btnText}
                </button>
                <button
                  type="button"
                  className="fadeButton"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          {loading ? <Loader /> : null}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateStage;
