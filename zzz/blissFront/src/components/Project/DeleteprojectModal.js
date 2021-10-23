import React from "react";
import { Modal } from "react-bootstrap";

const DeleteProjectModal = (props) => {
  const handleClose = () => {
    props.onPopupClose(false);
  };

  return (
    <>
      <Modal
        className="basic-Modals warningModal"
        show={props.showModalPopup}
        onHide={handleClose}
      >
        <Modal.Body>
          <div className="warning-body">
            <h2>Warning</h2>
            <p>You are about to permenantly delete ALL items from the recycle bin. Please confirm this is the action you wish to take</p>
            <div className="field-group-action">
              <button type="button" className="outlineButton big">
                Confirm
              </button>
              <button
                type="button"
                className="outlineButton big"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DeleteProjectModal;