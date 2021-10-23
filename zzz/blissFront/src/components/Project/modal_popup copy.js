import React, { useState, Component, Fragment, useEffect } from "react";
import DatePicker from "react-date-picker";
import { Modal, Form, Button, Dropdown } from "react-bootstrap";
import ShortIconn from "./../../assets/images/iocn_toggle.png";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import { Loader } from "../Loader/loader";
import { createTicketAction ,getInvitedWorkspaceUsersAction} from "../../redux/Action";
import SelectSearch from "react-select-search";
import { default as ReactSelect } from "react-select";
import Collapsible from "react-collapsible";
import { components } from "react-select";
import moment from "moment";
import ImageUploading from 'react-images-uploading';



const initialCollapseState = {
  assignTo: "",
  startDate: moment(new Date()).toDate(),
  dueDate: moment(new Date()).toDate(),
  priority: "",
  watcher: "",
  estimate: "",
  workedOn: moment(new Date()).toDate(),
  progress: "",
  riskStatus: "",
};

const ModalPopup = (props) => {
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            autoFocus={false}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const AssignOptions = [
    { value: "All", label: "All" },
    { value: "Other", label: "Other" },
    { value: "Test", label: "Test" },
  ];
  const progressOptions = [
    { value: "0%", name: "0%" },
    { value: "25%", name: "25%" },
    { value: "50%", name: "50%" },
    { value: "75%", name: "75%" },
    { value: "90%", name: "90%" },
    { value: "100%", name: "100%" },
  ];
  const Priorityoption = [
    { value: "None", name: "None" },
    { value: "Low", name: "Low" },
    { value: "Medium", name: "Medium" },
    { value: "High", name: "High" },
  ];

  const [collapseState, setCollapseState] = useState(initialCollapseState);
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  
  const [ticketName, setTicketName] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [subTaskArr, setSubTaskArr] = useState([
    { title: "", description: "" },
  ]);

  const isValid = (e) => {
    let error = {};
    let formIsValid = true;

    if (ticketName === "" || ticketName.trim().length === 0) {
      formIsValid = false;
      error["ticketName"] = "Please enter ticket name";
    }
    if (description === "" || description.trim().length === 0) {
      formIsValid = false;
      error["description"] = "Please enter description";
    }

    setErrors(error);
    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("in submit");
    setLoading(true);
    if (isValid(e)) {
      const projectId =
        props.project && props.project._id ? props.project._id : "";

      const data = {
        stageId: stage,
        projectId: projectId,
        title: ticketName,
        description: description,
        // ...collapseState,
        // subTasks: [...subTaskArr],
      };  console.log("data submit",data)
      createTicketAction(data)
        .then((result) => {
          console.log("result.data==", result);
          if (result.status === 200) {
            console.log("result", result.message, "success");
            createNotification("success", result.message);
            props.isShowPopup(false);
            props.isTicketChangeOrAdd(true);
            setCollapseState(initialCollapseState);
            setDescription("");
            setStage("");
            setTicketName("");
          } else {
            console.log("in error");
            createNotification("error", result.message);
          }
          setLoading(false);
          //props.onPopupClose(false);
          
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

  const handleClose = () => {
    props.isShowPopup(false);
  };

  // useEffect(()=>{
  //   getInvitedWorkspaceUsersAction('test')
  //       .then((result) => {
  //         console.log("result.data==", result);
  //         if (result.status === 200) {
  //           console.log("result", result);
  //         } else {
  //           console.log("in error");
  //           createNotification("error", result.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // },[])

  return (
    <Fragment>
      <Modal
        show={props.showModalPopup}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="sign-in-title">
            {props.project &&
            props.project.projectName &&
            props.project.projectName &&
            props.project.projectCode
              ? props.project.projectCode + " - " + props.project.projectName
              : null}
          </Modal.Title>
          <tr className="Header_top">
            <img src={ShortIconn} />
            <td className="px-0">
              <span class="badge rounded-0 inprogress">IN PROGRESS</span>
            </td>
            <td className="px-0">
              <span class="badge rounded-0 bg-green">GREEN</span>
            </td>
            <td className="text-center">
              <svg
                className="me-2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10ZM14.8175 6.0675C14.9349 5.95014 15.0008 5.79097 15.0008 5.625C15.0008 5.45903 14.9349 5.29986 14.8175 5.1825C14.7001 5.06514 14.541 4.99921 14.375 4.99921C14.209 4.99921 14.0499 5.06514 13.9325 5.1825L10 9.11625L6.0675 5.1825C6.00939 5.12439 5.9404 5.07829 5.86448 5.04685C5.78856 5.0154 5.70718 4.99921 5.625 4.99921C5.54282 4.99921 5.46144 5.0154 5.38552 5.04685C5.3096 5.07829 5.24061 5.12439 5.1825 5.1825C5.12439 5.24061 5.07829 5.3096 5.04685 5.38552C5.0154 5.46144 4.99921 5.54282 4.99921 5.625C4.99921 5.70718 5.0154 5.78856 5.04685 5.86448C5.07829 5.9404 5.12439 6.00939 5.1825 6.0675L9.11625 10L5.1825 13.9325C5.06514 14.0499 4.99921 14.209 4.99921 14.375C4.99921 14.541 5.06514 14.7001 5.1825 14.8175C5.29986 14.9349 5.45903 15.0008 5.625 15.0008C5.79097 15.0008 5.95014 14.9349 6.0675 14.8175L10 10.8837L13.9325 14.8175C13.9906 14.8756 14.0596 14.9217 14.1355 14.9532C14.2114 14.9846 14.2928 15.0008 14.375 15.0008C14.4572 15.0008 14.5386 14.9846 14.6145 14.9532C14.6904 14.9217 14.7594 14.8756 14.8175 14.8175C14.8756 14.7594 14.9217 14.6904 14.9532 14.6145C14.9846 14.5386 15.0008 14.4572 15.0008 14.375C15.0008 14.2928 14.9846 14.2114 14.9532 14.1355C14.9217 14.0596 14.8756 13.9906 14.8175 13.9325L10.8837 10L14.8175 6.0675Z"
                  fill="#FF0000"
                />
              </svg>

              <svg
                class="me-2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.92408 2.51982C9.8955 2.53696 9.87215 2.5616 9.85658 2.59107L1.28533 17.1748C1.26398 17.2091 1.25245 17.2485 1.25201 17.2888C1.25157 17.3292 1.26223 17.3689 1.28283 17.4036C1.30283 17.4411 1.32908 17.4661 1.35033 17.4786C1.36908 17.4911 1.39283 17.4998 1.43283 17.4998H18.5741C18.6031 17.5009 18.6317 17.4935 18.6566 17.4786C18.6855 17.4598 18.7091 17.434 18.7253 17.4036C18.7457 17.3688 18.7562 17.329 18.7555 17.2887C18.7549 17.2483 18.7431 17.2089 18.7216 17.1748L10.1516 2.59107C10.136 2.5616 10.1127 2.53696 10.0841 2.51982C10.0596 2.50638 10.032 2.49949 10.0041 2.49982C9.97614 2.49949 9.94859 2.50638 9.92408 2.51982ZM11.2291 1.95732C11.1053 1.74177 10.9269 1.56269 10.7118 1.43816C10.4968 1.31362 10.2526 1.24805 10.0041 1.24805C9.75554 1.24805 9.51141 1.31362 9.29632 1.43816C9.08124 1.56269 8.90282 1.74177 8.77908 1.95732L0.20783 16.5411C-0.36342 17.5136 0.32158 18.7498 1.43283 18.7498H18.5741C19.6853 18.7498 20.3716 17.5123 19.7991 16.5411L11.2291 1.95732Z"
                    fill="#FF7C00"
                  ></path>
                  <path
                    d="M8.75269 15.0004C8.75269 14.8362 8.78502 14.6737 8.84784 14.522C8.91065 14.3704 9.00273 14.2326 9.1188 14.1165C9.23488 14.0004 9.37267 13.9084 9.52433 13.8455C9.67599 13.7827 9.83853 13.7504 10.0027 13.7504C10.1668 13.7504 10.3294 13.7827 10.481 13.8455C10.6327 13.9084 10.7705 14.0004 10.8866 14.1165C11.0026 14.2326 11.0947 14.3704 11.1575 14.522C11.2204 14.6737 11.2527 14.8362 11.2527 15.0004C11.2527 15.3319 11.121 15.6499 10.8866 15.8843C10.6521 16.1187 10.3342 16.2504 10.0027 16.2504C9.67116 16.2504 9.35322 16.1187 9.1188 15.8843C8.88438 15.6499 8.75269 15.3319 8.75269 15.0004ZM8.87519 7.49414C8.85854 7.33644 8.87523 7.17701 8.92419 7.02618C8.97314 6.87535 9.05325 6.73649 9.15933 6.61862C9.26542 6.50076 9.39509 6.40651 9.53995 6.34199C9.68481 6.27748 9.84161 6.24414 10.0002 6.24414C10.1588 6.24414 10.3156 6.27748 10.4604 6.34199C10.6053 6.40651 10.735 6.50076 10.841 6.61862C10.9471 6.73649 11.0272 6.87535 11.0762 7.02618C11.1251 7.17701 11.1418 7.33644 11.1252 7.49414L10.6877 11.8779C10.673 12.0501 10.5942 12.2105 10.4669 12.3274C10.3396 12.4443 10.173 12.5092 10.0002 12.5092C9.82735 12.5092 9.6608 12.4443 9.53349 12.3274C9.40618 12.2105 9.32739 12.0501 9.31269 11.8779L8.87519 7.49414Z"
                    fill="#FF7C00"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="20" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>

              <svg
                className="me-2"
                width="18"
                height="9"
                viewBox="0 0 18 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.9425 0.875H4C3.00544 0.875 2.05161 1.27009 1.34835 1.97335C0.645088 2.67661 0.25 3.63044 0.25 4.625C0.25 5.61956 0.645088 6.57339 1.34835 7.27665C2.05161 7.97991 3.00544 8.375 4 8.375H7.75C8.35009 8.37531 8.9415 8.23161 9.47453 7.95596C10.0076 7.6803 10.4667 7.28075 10.8133 6.79087C11.1599 6.30098 11.3838 5.73507 11.4663 5.14068C11.5489 4.54629 11.4875 3.94077 11.2875 3.375H10.25C10.1425 3.375 10.0375 3.3875 9.9375 3.41375C10.1483 3.79438 10.2561 4.22344 10.2503 4.65852C10.2445 5.09359 10.1252 5.51961 9.90424 5.89445C9.6833 6.26929 9.36835 6.57998 8.99053 6.7958C8.61271 7.01162 8.18511 7.12509 7.75 7.125H4C3.33696 7.125 2.70107 6.86161 2.23223 6.39277C1.76339 5.92392 1.5 5.28804 1.5 4.625C1.5 3.96196 1.76339 3.32607 2.23223 2.85723C2.70107 2.38839 3.33696 2.125 4 2.125H5.91875C6.19125 1.655 6.5375 1.2325 6.94375 0.875H6.9425Z"
                  fill="#2290FF"
                ></path>
                <path
                  d="M10.2498 0.875001C9.64968 0.874686 9.05827 1.01839 8.52523 1.29405C7.9922 1.5697 7.5331 1.96925 7.18651 2.45913C6.83992 2.94902 6.61595 3.51493 6.53343 4.10932C6.45091 4.70371 6.51224 5.30923 6.71227 5.875H8.08477C7.86535 5.49496 7.74984 5.06385 7.74983 4.62502C7.74983 4.18618 7.86534 3.75507 8.08475 3.37503C8.30417 2.99498 8.61975 2.67939 8.99979 2.45996C9.37983 2.24054 9.81093 2.12501 10.2498 2.125H13.9998C14.6628 2.125 15.2987 2.38839 15.7675 2.85723C16.2364 3.32607 16.4998 3.96196 16.4998 4.625C16.4998 5.28804 16.2364 5.92393 15.7675 6.39277C15.2987 6.86161 14.6628 7.125 13.9998 7.125H12.081C11.8091 7.59425 11.4629 8.01638 11.056 8.375H13.9998C14.4922 8.375 14.9799 8.278 15.4348 8.08955C15.8898 7.90109 16.3032 7.62487 16.6514 7.27665C16.9996 6.92843 17.2759 6.51503 17.4643 6.06006C17.6528 5.60509 17.7498 5.11746 17.7498 4.625C17.7498 4.13254 17.6528 3.64491 17.4643 3.18994C17.2759 2.73497 16.9996 2.32157 16.6514 1.97335C16.3032 1.62513 15.8898 1.34891 15.4348 1.16045C14.9799 0.971997 14.4922 0.875001 13.9998 0.875001H10.2498Z"
                  fill="#2290FF"
                ></path>
              </svg>

              <svg
                class="me-2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.75 16.25C14.9595 16.25 16.143 15.899 17.157 15.2397C18.1709 14.5804 18.9718 13.641 19.4625 12.5356C19.9532 11.4301 20.1125 10.206 19.9213 9.0117C19.73 7.81743 19.1964 6.70432 18.385 5.80734C17.5737 4.91037 16.5195 4.26808 15.3503 3.95838C14.1812 3.64867 12.9473 3.68485 11.7983 4.06253C10.6493 4.44021 9.63452 5.14316 8.87712 6.08613C8.11972 7.0291 7.6522 8.17158 7.53125 9.375H5C5 8.87772 4.80246 8.40081 4.45083 8.04917C4.09919 7.69754 3.62228 7.5 3.125 7.5H1.875C1.37772 7.5 0.900805 7.69754 0.549175 8.04917C0.197544 8.40081 0 8.87772 0 9.375L0 10.625C0 11.1223 0.197544 11.5992 0.549175 11.9508C0.900805 12.3025 1.37772 12.5 1.875 12.5H3.125C3.62228 12.5 4.09919 12.3025 4.45083 11.9508C4.80246 11.5992 5 11.1223 5 10.625H7.53125C7.68619 12.1666 8.40824 13.5958 9.55732 14.6351C10.7064 15.6745 12.2006 16.25 13.75 16.25ZM14.375 6.875C14.375 6.70924 14.3092 6.55027 14.1919 6.43306C14.0747 6.31585 13.9158 6.25 13.75 6.25C13.5842 6.25 13.4253 6.31585 13.3081 6.43306C13.1908 6.55027 13.125 6.70924 13.125 6.875V9.375H10.625C10.4592 9.375 10.3003 9.44085 10.1831 9.55806C10.0658 9.67527 10 9.83424 10 10C10 10.1658 10.0658 10.3247 10.1831 10.4419C10.3003 10.5592 10.4592 10.625 10.625 10.625H13.125V13.125C13.125 13.2908 13.1908 13.4497 13.3081 13.5669C13.4253 13.6842 13.5842 13.75 13.75 13.75C13.9158 13.75 14.0747 13.6842 14.1919 13.5669C14.3092 13.4497 14.375 13.2908 14.375 13.125V10.625H16.875C17.0408 10.625 17.1997 10.5592 17.3169 10.4419C17.4342 10.3247 17.5 10.1658 17.5 10C17.5 9.83424 17.4342 9.67527 17.3169 9.55806C17.1997 9.44085 17.0408 9.375 16.875 9.375H14.375V6.875Z"
                    fill="#C4C4C4"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="20" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </td>

            <Dropdown className="right_top_toggle">
              <Dropdown.Toggle
                className="p-0 bg-transparent border-0"
                id="dropdown-basic"
              >
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
              </Dropdown.Toggle>

              <Dropdown.Menu align="right">
                <Dropdown.Item href="#/action-1">Metrics</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Burn Rate</Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  Cost Performance Index
                </Dropdown.Item>
                <Dropdown.Item href="#/action-4">Cost Variance</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Earned Value</Dropdown.Item>
                <Dropdown.Item href="#/action-1">
                  Estimate vs Actual
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Progress(%)</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Productivity</Dropdown.Item>
                <Dropdown.Item href="#/action-4">
                  Project Gross Profit Margin
                </Dropdown.Item>
                <Dropdown.Item href="#/action-5">
                  Project Velocity
                </Dropdown.Item>
                <Dropdown.Item href="#/action-1">
                  Return On Investment
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Retail Price Index
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  Schedule Variance
                </Dropdown.Item>
                <Dropdown.Item href="#/action-4">
                  Scheduled Performance Index
                </Dropdown.Item>
                <Dropdown.Item href="#/action-5">Add a nes</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </tr>
        </Modal.Header>
        <Modal.Body className="body_form row">
          <Form onSubmit={(e) => onSubmit(e)}>
            <span className="row">
              <span className="col-xl-9">
                <Form.Group className="mb-2 col-xl-12 " controlId="formUser">
                  <Form.Label className="ticket-light">STAGE</Form.Label>
                  <Form.Control
                    aria-label="Default select example"
                    as="select"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                  >
                    <option value="">Select stage</option>
                    {props.stages &&
                      props.stages.map((data) => (
                        <option value={data._id}>
                          {data.stageName ? data.stageName : data.name}
                        </option>
                      ))}
                  </Form.Control>
                  <p className="error_mesage"> {errors.stage} </p>
                </Form.Group>
                <Form.Group className="mb-2 col-xl-12 " controlId="formUser">
                  <Form.Label className="ticket-light">TICKET NAME</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                  />
                  <p className="error_mesage"> {errors.ticketName} </p>
                </Form.Group>
                <Form.Group className="mb-2 col-xl-12 " controlId="formUser">
                  <Form.Label className="ticket-light">DESCRIPTION</Form.Label>

                  <Form.Control
                    className="description"
                    as="textarea" rows={2}
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="error_mesage"> {errors.description} </p>
                </Form.Group>

                <span className="dependenics col-xl-12">
                  <label className="first_group row">
                    <Form.Label className="depen">DEPENDENCIES</Form.Label>
                    <Form.Group className="mb-2 col-xl-5 " controlId="formUser">
                      <Form.Label className="depen_list">
                        <svg
                          className="me-2"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10ZM14.8175 6.0675C14.9349 5.95014 15.0008 5.79097 15.0008 5.625C15.0008 5.45903 14.9349 5.29986 14.8175 5.1825C14.7001 5.06514 14.541 4.99921 14.375 4.99921C14.209 4.99921 14.0499 5.06514 13.9325 5.1825L10 9.11625L6.0675 5.1825C6.00939 5.12439 5.9404 5.07829 5.86448 5.04685C5.78856 5.0154 5.70718 4.99921 5.625 4.99921C5.54282 4.99921 5.46144 5.0154 5.38552 5.04685C5.3096 5.07829 5.24061 5.12439 5.1825 5.1825C5.12439 5.24061 5.07829 5.3096 5.04685 5.38552C5.0154 5.46144 4.99921 5.54282 4.99921 5.625C4.99921 5.70718 5.0154 5.78856 5.04685 5.86448C5.07829 5.9404 5.12439 6.00939 5.1825 6.0675L9.11625 10L5.1825 13.9325C5.06514 14.0499 4.99921 14.209 4.99921 14.375C4.99921 14.541 5.06514 14.7001 5.1825 14.8175C5.29986 14.9349 5.45903 15.0008 5.625 15.0008C5.79097 15.0008 5.95014 14.9349 6.0675 14.8175L10 10.8837L13.9325 14.8175C13.9906 14.8756 14.0596 14.9217 14.1355 14.9532C14.2114 14.9846 14.2928 15.0008 14.375 15.0008C14.4572 15.0008 14.5386 14.9846 14.6145 14.9532C14.6904 14.9217 14.7594 14.8756 14.8175 14.8175C14.8756 14.7594 14.9217 14.6904 14.9532 14.6145C14.9846 14.5386 15.0008 14.4572 15.0008 14.375C15.0008 14.2928 14.9846 14.2114 14.9532 14.1355C14.9217 14.0596 14.8756 13.9906 14.8175 13.9325L10.8837 10L14.8175 6.0675Z"
                            fill="#FF0000"
                          />
                        </svg>{" "}
                        TICKET NAME
                      </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-2 col-xl-5" controlId="formUser">
                      <Form.Label className="depen_list">
                        <svg
                          className="me-2"
                          width="18"
                          height="9"
                          viewBox="0 0 18 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.9425 0.875H4C3.00544 0.875 2.05161 1.27009 1.34835 1.97335C0.645088 2.67661 0.25 3.63044 0.25 4.625C0.25 5.61956 0.645088 6.57339 1.34835 7.27665C2.05161 7.97991 3.00544 8.375 4 8.375H7.75C8.35009 8.37531 8.9415 8.23161 9.47453 7.95596C10.0076 7.6803 10.4667 7.28075 10.8133 6.79087C11.1599 6.30098 11.3838 5.73507 11.4663 5.14068C11.5489 4.54629 11.4875 3.94077 11.2875 3.375H10.25C10.1425 3.375 10.0375 3.3875 9.9375 3.41375C10.1483 3.79438 10.2561 4.22344 10.2503 4.65852C10.2445 5.09359 10.1252 5.51961 9.90424 5.89445C9.6833 6.26929 9.36835 6.57998 8.99053 6.7958C8.61271 7.01162 8.18511 7.12509 7.75 7.125H4C3.33696 7.125 2.70107 6.86161 2.23223 6.39277C1.76339 5.92392 1.5 5.28804 1.5 4.625C1.5 3.96196 1.76339 3.32607 2.23223 2.85723C2.70107 2.38839 3.33696 2.125 4 2.125H5.91875C6.19125 1.655 6.5375 1.2325 6.94375 0.875H6.9425Z"
                            fill="#2290FF"
                          ></path>
                          <path
                            d="M10.2498 0.875001C9.64968 0.874686 9.05827 1.01839 8.52523 1.29405C7.9922 1.5697 7.5331 1.96925 7.18651 2.45913C6.83992 2.94902 6.61595 3.51493 6.53343 4.10932C6.45091 4.70371 6.51224 5.30923 6.71227 5.875H8.08477C7.86535 5.49496 7.74984 5.06385 7.74983 4.62502C7.74983 4.18618 7.86534 3.75507 8.08475 3.37503C8.30417 2.99498 8.61975 2.67939 8.99979 2.45996C9.37983 2.24054 9.81093 2.12501 10.2498 2.125H13.9998C14.6628 2.125 15.2987 2.38839 15.7675 2.85723C16.2364 3.32607 16.4998 3.96196 16.4998 4.625C16.4998 5.28804 16.2364 5.92393 15.7675 6.39277C15.2987 6.86161 14.6628 7.125 13.9998 7.125H12.081C11.8091 7.59425 11.4629 8.01638 11.056 8.375H13.9998C14.4922 8.375 14.9799 8.278 15.4348 8.08955C15.8898 7.90109 16.3032 7.62487 16.6514 7.27665C16.9996 6.92843 17.2759 6.51503 17.4643 6.06006C17.6528 5.60509 17.7498 5.11746 17.7498 4.625C17.7498 4.13254 17.6528 3.64491 17.4643 3.18994C17.2759 2.73497 16.9996 2.32157 16.6514 1.97335C16.3032 1.62513 15.8898 1.34891 15.4348 1.16045C14.9799 0.971997 14.4922 0.875001 13.9998 0.875001H10.2498Z"
                            fill="#2290FF"
                          ></path>
                        </svg>
                        DESCRIPTION
                      </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-2 col-xl-2 " controlId="formUser">
                      <label className="plus">+</label>
                    </Form.Group>
                  </label>

                  <label className="first_group row">
                    <Form.Group className="mb-2 col-xl-5 " controlId="formUser">
                      <Form.Label className="depen_list">
                        <svg
                          className="me-2"
                          width="18"
                          height="9"
                          viewBox="0 0 18 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.9425 0.875H4C3.00544 0.875 2.05161 1.27009 1.34835 1.97335C0.645088 2.67661 0.25 3.63044 0.25 4.625C0.25 5.61956 0.645088 6.57339 1.34835 7.27665C2.05161 7.97991 3.00544 8.375 4 8.375H7.75C8.35009 8.37531 8.9415 8.23161 9.47453 7.95596C10.0076 7.6803 10.4667 7.28075 10.8133 6.79087C11.1599 6.30098 11.3838 5.73507 11.4663 5.14068C11.5489 4.54629 11.4875 3.94077 11.2875 3.375H10.25C10.1425 3.375 10.0375 3.3875 9.9375 3.41375C10.1483 3.79438 10.2561 4.22344 10.2503 4.65852C10.2445 5.09359 10.1252 5.51961 9.90424 5.89445C9.6833 6.26929 9.36835 6.57998 8.99053 6.7958C8.61271 7.01162 8.18511 7.12509 7.75 7.125H4C3.33696 7.125 2.70107 6.86161 2.23223 6.39277C1.76339 5.92392 1.5 5.28804 1.5 4.625C1.5 3.96196 1.76339 3.32607 2.23223 2.85723C2.70107 2.38839 3.33696 2.125 4 2.125H5.91875C6.19125 1.655 6.5375 1.2325 6.94375 0.875H6.9425Z"
                            fill="#2290FF"
                          ></path>
                          <path
                            d="M10.2498 0.875001C9.64968 0.874686 9.05827 1.01839 8.52523 1.29405C7.9922 1.5697 7.5331 1.96925 7.18651 2.45913C6.83992 2.94902 6.61595 3.51493 6.53343 4.10932C6.45091 4.70371 6.51224 5.30923 6.71227 5.875H8.08477C7.86535 5.49496 7.74984 5.06385 7.74983 4.62502C7.74983 4.18618 7.86534 3.75507 8.08475 3.37503C8.30417 2.99498 8.61975 2.67939 8.99979 2.45996C9.37983 2.24054 9.81093 2.12501 10.2498 2.125H13.9998C14.6628 2.125 15.2987 2.38839 15.7675 2.85723C16.2364 3.32607 16.4998 3.96196 16.4998 4.625C16.4998 5.28804 16.2364 5.92393 15.7675 6.39277C15.2987 6.86161 14.6628 7.125 13.9998 7.125H12.081C11.8091 7.59425 11.4629 8.01638 11.056 8.375H13.9998C14.4922 8.375 14.9799 8.278 15.4348 8.08955C15.8898 7.90109 16.3032 7.62487 16.6514 7.27665C16.9996 6.92843 17.2759 6.51503 17.4643 6.06006C17.6528 5.60509 17.7498 5.11746 17.7498 4.625C17.7498 4.13254 17.6528 3.64491 17.4643 3.18994C17.2759 2.73497 16.9996 2.32157 16.6514 1.97335C16.3032 1.62513 15.8898 1.34891 15.4348 1.16045C14.9799 0.971997 14.4922 0.875001 13.9998 0.875001H10.2498Z"
                            fill="#2290FF"
                          ></path>
                        </svg>{" "}
                        BLOCKED BY
                      </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-2 col-xl-5" controlId="formUser">
                      <Form.Label className="depen_list">
                        <svg
                          class="me-2"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.75 16.25C14.9595 16.25 16.143 15.899 17.157 15.2397C18.1709 14.5804 18.9718 13.641 19.4625 12.5356C19.9532 11.4301 20.1125 10.206 19.9213 9.0117C19.73 7.81743 19.1964 6.70432 18.385 5.80734C17.5737 4.91037 16.5195 4.26808 15.3503 3.95838C14.1812 3.64867 12.9473 3.68485 11.7983 4.06253C10.6493 4.44021 9.63452 5.14316 8.87712 6.08613C8.11972 7.0291 7.6522 8.17158 7.53125 9.375H5C5 8.87772 4.80246 8.40081 4.45083 8.04917C4.09919 7.69754 3.62228 7.5 3.125 7.5H1.875C1.37772 7.5 0.900805 7.69754 0.549175 8.04917C0.197544 8.40081 0 8.87772 0 9.375L0 10.625C0 11.1223 0.197544 11.5992 0.549175 11.9508C0.900805 12.3025 1.37772 12.5 1.875 12.5H3.125C3.62228 12.5 4.09919 12.3025 4.45083 11.9508C4.80246 11.5992 5 11.1223 5 10.625H7.53125C7.68619 12.1666 8.40824 13.5958 9.55732 14.6351C10.7064 15.6745 12.2006 16.25 13.75 16.25ZM14.375 6.875C14.375 6.70924 14.3092 6.55027 14.1919 6.43306C14.0747 6.31585 13.9158 6.25 13.75 6.25C13.5842 6.25 13.4253 6.31585 13.3081 6.43306C13.1908 6.55027 13.125 6.70924 13.125 6.875V9.375H10.625C10.4592 9.375 10.3003 9.44085 10.1831 9.55806C10.0658 9.67527 10 9.83424 10 10C10 10.1658 10.0658 10.3247 10.1831 10.4419C10.3003 10.5592 10.4592 10.625 10.625 10.625H13.125V13.125C13.125 13.2908 13.1908 13.4497 13.3081 13.5669C13.4253 13.6842 13.5842 13.75 13.75 13.75C13.9158 13.75 14.0747 13.6842 14.1919 13.5669C14.3092 13.4497 14.375 13.2908 14.375 13.125V10.625H16.875C17.0408 10.625 17.1997 10.5592 17.3169 10.4419C17.4342 10.3247 17.5 10.1658 17.5 10C17.5 9.83424 17.4342 9.67527 17.3169 9.55806C17.1997 9.44085 17.0408 9.375 16.875 9.375H14.375V6.875Z"
                              fill="#C4C4C4"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        DEPENDENT ON
                      </Form.Label>
                    </Form.Group>
                  </label>
                </span>

                <Form.Group
                  className="mb-2 col-xl-12 mt-3 subtasks"
                  controlId="formUser"
                >
                  <Form.Label className="ticket-light">SUBTASKS</Form.Label>

                  <Form.Label
                     className="subtask_plus"
                    onClick={(e) => {
                      e.preventDefault();
                      let sub = [...subTaskArr];
                      console.log("clicking");
                      sub.push("");
                      setSubTaskArr(sub);
                    }}
                  >
                    +
                  </Form.Label>
                  <div className="add-subtask-des">
                  {subTaskArr && subTaskArr.length
                    ? subTaskArr.map((val, index) => {
                        return (
                          <React.Fragment key={index}>
                          <div className="subtitle-desc">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              className="text"
                              type="text"
                              placeholder="Enter Title"
                              value={val.title}
                              onChange={(e) => {
                                let sub = [...subTaskArr];
                                sub[index] = {
                                  ...sub[index],
                                  title: e.target.value,
                                };

                                setSubTaskArr(sub);
                              }}
                            />
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              className="description"
                              as="textarea" rows={2}
                              placeholder="Enter Description"
                              value={val.description}
                              onChange={(e) => {
                                let sub = [...subTaskArr];
                                sub[index] = {
                                  ...sub[index],
                                  description: e.target.value,
                                };
                                setSubTaskArr(sub);
                              }}
                            />
                            {index === 0 ? null :  
                            <Form.Label className="subtaskclose"
                              onClick={(e) => {
                                let sub = [...subTaskArr];
                                sub.splice(index, 1);
                                setSubTaskArr(sub);
                              }}
                            >
                              <svg
                              className="me-2"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10ZM14.8175 6.0675C14.9349 5.95014 15.0008 5.79097 15.0008 5.625C15.0008 5.45903 14.9349 5.29986 14.8175 5.1825C14.7001 5.06514 14.541 4.99921 14.375 4.99921C14.209 4.99921 14.0499 5.06514 13.9325 5.1825L10 9.11625L6.0675 5.1825C6.00939 5.12439 5.9404 5.07829 5.86448 5.04685C5.78856 5.0154 5.70718 4.99921 5.625 4.99921C5.54282 4.99921 5.46144 5.0154 5.38552 5.04685C5.3096 5.07829 5.24061 5.12439 5.1825 5.1825C5.12439 5.24061 5.07829 5.3096 5.04685 5.38552C5.0154 5.46144 4.99921 5.54282 4.99921 5.625C4.99921 5.70718 5.0154 5.78856 5.04685 5.86448C5.07829 5.9404 5.12439 6.00939 5.1825 6.0675L9.11625 10L5.1825 13.9325C5.06514 14.0499 4.99921 14.209 4.99921 14.375C4.99921 14.541 5.06514 14.7001 5.1825 14.8175C5.29986 14.9349 5.45903 15.0008 5.625 15.0008C5.79097 15.0008 5.95014 14.9349 6.0675 14.8175L10 10.8837L13.9325 14.8175C13.9906 14.8756 14.0596 14.9217 14.1355 14.9532C14.2114 14.9846 14.2928 15.0008 14.375 15.0008C14.4572 15.0008 14.5386 14.9846 14.6145 14.9532C14.6904 14.9217 14.7594 14.8756 14.8175 14.8175C14.8756 14.7594 14.9217 14.6904 14.9532 14.6145C14.9846 14.5386 15.0008 14.4572 15.0008 14.375C15.0008 14.2928 14.9846 14.2114 14.9532 14.1355C14.9217 14.0596 14.8756 13.9906 14.8175 13.9325L10.8837 10L14.8175 6.0675Z"
                                fill="#FF0000"
                              />
                            </svg>
                            </Form.Label>
                            }
                            <p className="error_mesage">
                              {" "}
                              {errors.description}{" "}
                            </p>
                            </div>
                          </React.Fragment>
                        );
                      })
                    : null}
                    </div>
                </Form.Group>
                <Form.Group className="mb-2 col-xl-12 " controlId="formUser">
                  <Form.Label className="ticket-light">
                    COMMENTS, HISTORY, ATTACHMENTS
                  </Form.Label>
                  <Form.Control className="description" as="textarea" rows={2} />
                 
                </Form.Group>




                <div className="project-img-upload">
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageRemove,
                      isDragging,
                      dragProps
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <span className="uploadbtn imgdrop_here"
                          style={isDragging ? { color: "red" } : null}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Click or image Drop here
                        </span>
                        &nbsp;
                        <span className="uploadbtn" onClick={onImageRemoveAll}>Remove all images</span>
                        <div className="projectshowimg">
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image.data_url} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                             
                              <span onClick={() => onImageRemove(index)}>
                               <svg
                              className="me-2"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10ZM14.8175 6.0675C14.9349 5.95014 15.0008 5.79097 15.0008 5.625C15.0008 5.45903 14.9349 5.29986 14.8175 5.1825C14.7001 5.06514 14.541 4.99921 14.375 4.99921C14.209 4.99921 14.0499 5.06514 13.9325 5.1825L10 9.11625L6.0675 5.1825C6.00939 5.12439 5.9404 5.07829 5.86448 5.04685C5.78856 5.0154 5.70718 4.99921 5.625 4.99921C5.54282 4.99921 5.46144 5.0154 5.38552 5.04685C5.3096 5.07829 5.24061 5.12439 5.1825 5.1825C5.12439 5.24061 5.07829 5.3096 5.04685 5.38552C5.0154 5.46144 4.99921 5.54282 4.99921 5.625C4.99921 5.70718 5.0154 5.78856 5.04685 5.86448C5.07829 5.9404 5.12439 6.00939 5.1825 6.0675L9.11625 10L5.1825 13.9325C5.06514 14.0499 4.99921 14.209 4.99921 14.375C4.99921 14.541 5.06514 14.7001 5.1825 14.8175C5.29986 14.9349 5.45903 15.0008 5.625 15.0008C5.79097 15.0008 5.95014 14.9349 6.0675 14.8175L10 10.8837L13.9325 14.8175C13.9906 14.8756 14.0596 14.9217 14.1355 14.9532C14.2114 14.9846 14.2928 15.0008 14.375 15.0008C14.4572 15.0008 14.5386 14.9846 14.6145 14.9532C14.6904 14.9217 14.7594 14.8756 14.8175 14.8175C14.8756 14.7594 14.9217 14.6904 14.9532 14.6145C14.9846 14.5386 15.0008 14.4572 15.0008 14.375C15.0008 14.2928 14.9846 14.2114 14.9532 14.1355C14.9217 14.0596 14.8756 13.9906 14.8175 13.9325L10.8837 10L14.8175 6.0675Z"
                                fill="#FF0000"
                              />
                            </svg>
                            </span>
                            </div>
                          </div>
                        ))}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>




              </span>

              <span className="mb-2 col-xl-3">
                {/* <label className="list-right projectpopupsidebar"> */}
                {
                  <>
                  <div className="list-right projectpopupsidebar">
                    <Collapsible
                      trigger="Assigned to"
                      overflowWhenOpen={"visible"}
                    >
                      <div className="projectsinbox">
                        <ReactSelect
                          options={AssignOptions}
                          isMulti
                          value={collapseState.assignTo}
                          onChange={(val) =>
                            setCollapseState({
                              ...collapseState,
                              assignTo: val,
                            })
                          }
                          components={{ Option }}
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          allowSelectAll={true}
                        />
                      </div>
                    </Collapsible>

                    <Collapsible
                      trigger="Start Date"
                      overflowWhenOpen={"visible"}
                    >
                      <div className="projectsinbox">
                        <DatePicker
                          // dateFormat="MM/dd/yyyy"
                          // ClassName="react-date-picker"
                          onChange={(date) => {
                            setCollapseState({
                              ...collapseState,
                              startDate: date,
                            });
                          }}
                          selectsStart
                          value={collapseState.startDate}
                          // startDate={collapseState.startDate}
                          // endDate={collapseState.dueDate}
                        />
                      </div>
                    </Collapsible>
                    <Collapsible
                      trigger="Due Date"
                      overflowWhenOpen={"visible"}
                    >
                      <div className="projectsinbox">
                        <DatePicker
                          dateFormat="MM/dd/yyyy"
                          // ClassName="react-date-picker"
                          onChange={(date) => {
                            setCollapseState({
                              ...collapseState,
                              dueDate: date,
                            });
                          }}
                          selectsEnd
                          value={collapseState.dueDate}
                          minDate={collapseState.startDate}
                          // startDate={collapseState.startDate}
                          // endDate={collapseState.dueDate}
                        />
                      </div>
                    </Collapsible>
                    <Collapsible
                      trigger="Priority"
                      overflowWhenOpen={"visible"}
                    >
                      <div className="projectsinbox ">
                        <SelectSearch
                          options={Priorityoption}
                          value={collapseState.priority}
                          onChange={(val) =>
                            setCollapseState({
                              ...collapseState,
                              priority: val,
                            })
                          }
                          placeholder="Select Priority"
                        />
                      </div>
                    </Collapsible>
                    <Collapsible trigger="Watchers">
                      <div className="projectsinbox">
                        <Form.Control
                          className="text"
                          type="text"
                          value={collapseState.watcher}
                          onChange={(e) =>
                            setCollapseState({
                              ...collapseState,
                              watcher: e.target.value,
                            })
                          }
                          placeholder="Watcher"
                        />
                      </div>
                    </Collapsible>
                    <Collapsible trigger="Estimate">
                      <div className="projectsinbox">
                        <Form.Control
                          className="text"
                          type="text"
                          onChange={(e) =>
                            setCollapseState({
                              ...collapseState,
                              estimate: e.target.value,
                            })
                          }
                          value={collapseState.estimate}
                          placeholder="Estimate"
                        />
                      </div>
                    </Collapsible>
                    <Collapsible
                      trigger="Time Worked on to Date"
                      overflowWhenOpen={"visible"}
                    >
                      <div className="projectsinbox">
                        <DatePicker
                          dateFormat="MM/dd/yyyy"
                          ClassName="react-date-picker"
                          onChange={(date) =>
                            setCollapseState({
                              ...collapseState,
                              workedOn: date,
                            })
                          }
                          value={collapseState.workedOn}
                        />
                      </div>
                    </Collapsible>
                    <Collapsible
                      trigger="Progress"
                      overflowWhenOpen={"visible"}
                    >
                      <div className="projectsinbox">
                        <SelectSearch
                          options={progressOptions}
                          search
                          placeholder="Choose Progress"
                          value={collapseState.progress}
                          onChange={(val) =>
                            setCollapseState({
                              ...collapseState,
                              progress: val,
                            })
                          }
                        />
                      </div>
                    </Collapsible>
                    <Collapsible trigger="Risk Status">
                      <div className="projectsinbox">
                        <Form.Control
                          className="text"
                          type="text"
                          placeholder="Risk Status"
                          value={collapseState.riskStatus}
                          onChange={(e) =>
                            setCollapseState({
                              ...collapseState,
                              riskStatus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </Collapsible>
                    </div>
                  </>
                }

                
              </span>
            </span>
            <span className="row">
              <span className="mb-2 col-xl-9"></span>
              <span className="mb-2 col-xl-3">
                <Form.Group
                  className="mb-2 col-xl-12 saveopen"
                  controlId="formUser"
                >
                  <Button
                    variant="primary"
                    type="submit"
                    className=" send_invite_user"
                  >
                    SAVE AND OPEN ANOTHER
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className=" send_invite_user"
                  >
                    SAVE
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    className=" send_invite_user"
                    onClick={handleClose}
                  >
                    CANCEL
                  </Button>
                </Form.Group>
              </span>
            </span>
          </Form>
          <NotificationContainer />
          {loading ? <Loader /> : null}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default ModalPopup;
