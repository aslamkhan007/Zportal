import React, { Component,useEffect,useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CreateProgram = (props) => {

 
 const handleClose = () => {
    props.onPopupClose(false);
  };

  

 const onSubmit =(e)=>{
     e.preventDefault();
     props.onProgramSubmit(e)
 }

 useEffect(()=>{
  if (props.errors) {
    //props.onPopupClose(false);
  }else{
    props.onPopupClose(true);
  }
 },[props])
  return (
    <>
      <Modal
        className="basic-Modals createProject_modal"
        show={props.showModalPopup}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>{props.titleText && props.titleText}</h4>
            <svg
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
            </svg>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="createProject-form">
            <form onSubmit={(e)=>onSubmit(e)}>
              <div className="field-group">
                <label>Name</label>
                <input type="text" 
                       className="form-control" 
                       value={props.programName}
                       onChange={(e) => props.setProgram(e)}
                       />
                <p className="error_mesage"> {props.errors?props.errors.programName:null} </p>       
              </div>
              <div className="field-group">
                <label>Description</label>
                <textarea  
                       className="form-control" 
                       onChange={(e) => props.setDescription(e)}
                       >
                         {props.programDescription}
                     </textarea>    
                <p className="error_mesage"> {props.errors?props.errors.programDescription:null} </p>       
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateProgram;
