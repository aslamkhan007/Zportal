
import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { recycleBinActions } from './../../redux/Action/setting.action';

export const ConfirmDeleteModal = (props) => {
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
                        <h2>Warning!</h2>
                        <div className="warning-data">
                            {props.popupMessage}
                        </div>
                        <div className="field-group-action">
                            <button type="button" className="outlineButton big" onClick={() => props.onConfirm({ ot: props.operationType })}>
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

export const ConfirmPasswordDeleteModal = (props) => {
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const handleClose = () => {
        props.onPopupClose(false);
    };

    const handleConfirm = async (e) => {
        e.preventDefault()
        if (isValid(e)) {
            if (props.operationType === 'deleteAll') {
                const response = await recycleBinActions({ actionType: props.operationType, password })
                if (response.status === 200) {
                    props.handleSuccess(response)
                }
                if (response.status === 401) {
                    setErrors({ password: response.message })
                }
            }
        }
    }

    const isValid = (e) => {
        let error = {};
        let formIsValid = true;
        if (password === "" || password.trim().length === 0) {
            formIsValid = false;
            error["password"] = "Please enter current Password";
        }
        console.log("errors::", error);
        setErrors(error);
        return formIsValid;
    };


    return (
        <>
            <Modal
                className="basic-Modals warningModal"
                show={props.showPasswordConfirmPopup}
                onHide={handleClose}
            >
                <Modal.Body>
                    <div className="warning-body">
                        <h2>Warning!</h2>
                        <div className="warning-data warning_pd">
                            <p>You are about to permenantly delete ALL items from the recycle bin.</p>
                            <p> Please enter your password to confirm this action</p>
                        </div>
                        <div className="warning_password">
                            <Form>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label className="sofia-semibold">
                                        password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <p className="error_mesage"> {errors.password} </p>
                                </Form.Group>

                            </Form>
                            <div className="field-group-action">
                                <button type="button" className="outlineButton big" onClick={handleConfirm}>
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
                        <div>

                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

