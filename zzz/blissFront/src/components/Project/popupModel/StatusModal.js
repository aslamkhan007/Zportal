import React, { Component, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createStageAction, editStageAction } from "../../../redux/Action";
import { createStatusAction, editStatusAction } from "../../../redux/Action";
import { NotificationContainer } from "react-notifications";
import { createNotification } from "../../../Helper/helper";
import { Loader } from "../../Loader/loader";

const StatusModal = (props) => {

  const [status, setStatus] = useState("")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    props.isShowPopup(false);
  };

  const isValid = (e) => {
    let error = {};
    let formIsValid = true;

    if (status === "" || status.trim().length === 0) {
      formIsValid = false;
      error["status"] = "Please enter status name";
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
      if (props.type && props.type === 'edit') {
        const data = {
          status,
          statusId: props.id && props.id ? props.id : '',
          operationType: 'edit'
        };
        editStatusAction(data)
          .then((result) => {
            if (result.status === 200) {
              createNotification("success", result.message);

              props.isShowPopup(false);
              props.refreshProject()
              // props.isStageChangeOrAdd(true)
            } else {
              createNotification("error", result.message);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("valid");
      } else {
        const data = {
          status,
          projectId: props.project && props.project._id ? props.project._id : ''
        };
        createStatusAction(data)
          .then((result) => {
            if (result.status === 200) {
              createNotification("success", result.message);

              props.isShowPopup(false);
              props.refreshProject()
              // props.isStageChangeOrAdd(true)
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

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])


  return (
    <>
      <Modal
        className="basic-Modals createProject_modal"
        show={props.showStatusPopup}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>{props.title && props.title}</h4>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="createProject-form">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field-group">
                <label>Status Name</label>
                <input type="text"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <p className="error_mesage"> {errors.status} </p>
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

export default StatusModal;
