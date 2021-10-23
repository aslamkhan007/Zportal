import React, { Component,useEffect,useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmBox = (props) => {

//  console.log("props.showConfirmPopup",props.showConfirmPopup)
  return (
    <>
      <Modal
        className="basic-Modals createProject_modal warningModal"
        show={props.showConfirmPopup}
        onHide={()=>props.onPopupClose(false)}
      >
        <Modal.Body>
 
          <div className="warning-body">
                        <h2>Warning!</h2>
                        <div className="warning-data">
                        {props.warningText && props.warningText}
                        </div>
                        <div className="field-group-action">
                            <button type="button" className="outlineButton big"  onClick={props.onConfirm}>
                                Confirm
                            </button>
                            <button
                                type="button"
                                className="outlineButton big"
                                onClick={()=>props.onPopupClose(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmBox;
