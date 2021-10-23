import React, { Component, Fragment, useEffect, useState } from "react";
import { Form, Table, Dropdown, Button } from "react-bootstrap";
import ShortIcon from "./../../assets/images/ShortIcon.svg";
import ModalPopup from "./modal_popup";
import DataTable from "react-data-table-component";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { editTicketAction } from "../../redux/Action";
import { createNotification } from "../../Helper/helper";
// const products = [
//   {
//     id: "",
//     Assigne: "Product1",
//     Priority: 120,
//     StartDate: "01/10/20",
//     DueDate: "01/11/20",
//     Countdown: "10",
//     Status: "",
//     Estimate: "13 Days",
//     RiskStatus: "AMBER",
//   },
//   {
//     id: "",
//     Assigne: "Product2",
//     Priority: 122,
//     StartDate: "01/09/20",
//     DueDate: "01/08/20",
//     Countdown: "15",
//     Status: "",
//     Estimate: "15 Days",
//     RiskStatus: "AMBER",
//   },
// ];
function statusFormatter(cell, row) {
  return '<span class="badge rounded-0 bg-primary">IN PROGRESS</span>' + cell;
}

function AssigneeFormatter(cell, row) {
  return (
    <div>
      {" "}
      <span className="name-badge sm bg-pink d-inline-flex align-items-center justify-content-center">
        HT
      </span>
    </div>
  );
}
function PriorityFormatter(cell, row) {
  return (
    <div>
      <svg
        width="11"
        height="17"
        viewBox="0 0 11 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="2.5" y1="-2.18557e-08" x2="2.5" y2="17" stroke="#FA6164" />
        <path d="M11 5.5L2.75 10.2631L2.75 0.73686L11 5.5Z" fill="#FA6164" />
      </svg>
    </div>
  );
}

function riskformatter() {
  return (
    <div>
      <span className="badge rounded-0 bg-yellow">AMBER</span>
    </div>
  );
}

function countdownFormatter(cell, row) {
  return `<b> ${cell}</b>`;
}
const ProjectListView = (props) => {
  const [showModalPopup, setShowModalPopup] = useState(false);
  const [products, setProducts] = useState([])
  const [showConfirmPopup, setShowConfirmPopup] = useState(false)
  const [operationType, setOperationType] = useState("delete")
  const [popupMessage, setPopupMessage] = useState("Are you sure")
  const [selectedTicketId, setSelectedTicketId] = useState("Are you sure")

  const isShowPopup = (status) => {
    setShowModalPopup(status);
  };

  // ticket operatons 
  const handleDeleteTicket = (id) => {
    setSelectedTicketId(id)
    setShowConfirmPopup(true)
    setOperationType("delete")
    setPopupMessage([<p>You are about to permenantly delete selected items from the recycle bin.</p>, <p> Please confirm this is the action you wish to take</p>])

  }
  // ticket operatons 
  const handleArchiveTicket = (id) => {
    setSelectedTicketId(id)
    setShowConfirmPopup(true)
    setOperationType("archive")
    setPopupMessage([<p>You are about to archive selected items from the recycle bin.</p>, <p> Please confirm this is the action you wish to take</p>])

  }

  const popupConfirmHandler = async ({ ot }) => {

    if (ot === 'delete') {
      const response = await editTicketAction({ operationType: ot, ticketId: selectedTicketId })
      if (response.status === 200) {
        props.setOp(true)
        createNotification("success", response.message);
      }
    }
    if (ot === 'archive') {
      const response = await editTicketAction({ operationType: ot, ticketId: selectedTicketId })
      if (response.status === 200) {
        props.setOp(true)
        createNotification("success", response.message);
      }
    }


    setShowConfirmPopup(false)
  }

  const popupCancelHandler = async () => {
    setShowConfirmPopup(false)
  }

  const closeIcon = (cell, row) => {

    return (
      <>
        <span onClick={() => props.isShowEditTicketPopup(true, row.ticket)}> Edit</span>
        <svg
          className="me-2"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleDeleteTicket(row.ticket._id)}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10ZM14.8175 6.0675C14.9349 5.95014 15.0008 5.79097 15.0008 5.625C15.0008 5.45903 14.9349 5.29986 14.8175 5.1825C14.7001 5.06514 14.541 4.99921 14.375 4.99921C14.209 4.99921 14.0499 5.06514 13.9325 5.1825L10 9.11625L6.0675 5.1825C6.00939 5.12439 5.9404 5.07829 5.86448 5.04685C5.78856 5.0154 5.70718 4.99921 5.625 4.99921C5.54282 4.99921 5.46144 5.0154 5.38552 5.04685C5.3096 5.07829 5.24061 5.12439 5.1825 5.1825C5.12439 5.24061 5.07829 5.3096 5.04685 5.38552C5.0154 5.46144 4.99921 5.54282 4.99921 5.625C4.99921 5.70718 5.0154 5.78856 5.04685 5.86448C5.07829 5.9404 5.12439 6.00939 5.1825 6.0675L9.11625 10L5.1825 13.9325C5.06514 14.0499 4.99921 14.209 4.99921 14.375C4.99921 14.541 5.06514 14.7001 5.1825 14.8175C5.29986 14.9349 5.45903 15.0008 5.625 15.0008C5.79097 15.0008 5.95014 14.9349 6.0675 14.8175L10 10.8837L13.9325 14.8175C13.9906 14.8756 14.0596 14.9217 14.1355 14.9532C14.2114 14.9846 14.2928 15.0008 14.375 15.0008C14.4572 15.0008 14.5386 14.9846 14.6145 14.9532C14.6904 14.9217 14.7594 14.8756 14.8175 14.8175C14.8756 14.7594 14.9217 14.6904 14.9532 14.6145C14.9846 14.5386 15.0008 14.4572 15.0008 14.375C15.0008 14.2928 14.9846 14.2114 14.9532 14.1355C14.9217 14.0596 14.8756 13.9906 14.8175 13.9325L10.8837 10L14.8175 6.0675Z"
            fill="#FF0000"
          />
        </svg>
        <svg
          width="18"
          height="9"
          viewBox="0 0 18 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleArchiveTicket(row.ticket._id)}
        >
          <path
            d="M6.9425 0.875H4C3.00544 0.875 2.05161 1.27009 1.34835 1.97335C0.645088 2.67661 0.25 3.63044 0.25 4.625C0.25 5.61956 0.645088 6.57339 1.34835 7.27665C2.05161 7.97991 3.00544 8.375 4 8.375H7.75C8.35009 8.37531 8.9415 8.23161 9.47453 7.95596C10.0076 7.6803 10.4667 7.28075 10.8133 6.79087C11.1599 6.30098 11.3838 5.73507 11.4663 5.14068C11.5489 4.54629 11.4875 3.94077 11.2875 3.375H10.25C10.1425 3.375 10.0375 3.3875 9.9375 3.41375C10.1483 3.79438 10.2561 4.22344 10.2503 4.65852C10.2445 5.09359 10.1252 5.51961 9.90424 5.89445C9.6833 6.26929 9.36835 6.57998 8.99053 6.7958C8.61271 7.01162 8.18511 7.12509 7.75 7.125H4C3.33696 7.125 2.70107 6.86161 2.23223 6.39277C1.76339 5.92392 1.5 5.28804 1.5 4.625C1.5 3.96196 1.76339 3.32607 2.23223 2.85723C2.70107 2.38839 3.33696 2.125 4 2.125H5.91875C6.19125 1.655 6.5375 1.2325 6.94375 0.875H6.9425Z"
            fill="#2290FF"
          />
          <path
            d="M10.2498 0.875001C9.64968 0.874686 9.05827 1.01839 8.52523 1.29405C7.9922 1.5697 7.5331 1.96925 7.18651 2.45913C6.83992 2.94902 6.61595 3.51493 6.53343 4.10932C6.45091 4.70371 6.51224 5.30923 6.71227 5.875H8.08477C7.86535 5.49496 7.74984 5.06385 7.74983 4.62502C7.74983 4.18618 7.86534 3.75507 8.08475 3.37503C8.30417 2.99498 8.61975 2.67939 8.99979 2.45996C9.37983 2.24054 9.81093 2.12501 10.2498 2.125H13.9998C14.6628 2.125 15.2987 2.38839 15.7675 2.85723C16.2364 3.32607 16.4998 3.96196 16.4998 4.625C16.4998 5.28804 16.2364 5.92393 15.7675 6.39277C15.2987 6.86161 14.6628 7.125 13.9998 7.125H12.081C11.8091 7.59425 11.4629 8.01638 11.056 8.375H13.9998C14.4922 8.375 14.9799 8.278 15.4348 8.08955C15.8898 7.90109 16.3032 7.62487 16.6514 7.27665C16.9996 6.92843 17.2759 6.51503 17.4643 6.06006C17.6528 5.60509 17.7498 5.11746 17.7498 4.625C17.7498 4.13254 17.6528 3.64491 17.4643 3.18994C17.2759 2.73497 16.9996 2.32157 16.6514 1.97335C16.3032 1.62513 15.8898 1.34891 15.4348 1.16045C14.9799 0.971997 14.4922 0.875001 13.9998 0.875001H10.2498Z"
            fill="#2290FF"
          />
        </svg>
      </>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-end align-items-center mb-3 tab-filters">
        <button className="bg-transparent border-0">
          Group
          <img className="ms-1" src={ShortIcon} alt="" />
        </button>
        <button className="bg-transparent border-0">
          Sort
          <img className="ms-1" src={ShortIcon} alt="" />
        </button>
        <button className="bg-transparent border-0">
          Subtask
          <img className="ms-1" src={ShortIcon} alt="" />
        </button>
        <button className="bg-transparent border-0">
          Filter
          <img className="ms-1" src={ShortIcon} alt="" />
        </button>

        <Dropdown>
          <Dropdown.Toggle
            className="bg-transparent border-0"
            id="dropdown-basic"
          >
            More +
          </Dropdown.Toggle>

          <Dropdown.Menu align="right">
            <Dropdown.Item href="#/action-1">Comments</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Created by</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Date created</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Date updated</Dropdown.Item>
            <Dropdown.Item href="#/action-5">Date closed</Dropdown.Item>

            <Dropdown.Item href="#/action-6">Pull Requests</Dropdown.Item>
            <Dropdown.Item href="#/action-7">ID Number</Dropdown.Item>
            <Dropdown.Item href="#/action-8">Budget</Dropdown.Item>
            <Dropdown.Item href="#/action-9">Spend to date</Dropdown.Item>
            <Dropdown.Item href="#/action-10">Budget Varience</Dropdown.Item>
            <Dropdown.Item href="#/action-11">Linked RAID</Dropdown.Item>
            <Dropdown.Item href="#/action-12">
              Change Ticket details
            </Dropdown.Item>
            <Dropdown.Item href="#/action-13">Watchers</Dropdown.Item>
            <h5 className="px-3 mt-3">
              Metrics
              <hr className="m-0" />
            </h5>

            <Dropdown.Item href="#/action-15">Burn Rate</Dropdown.Item>
            <Dropdown.Item href="#/action-16">
              Cost Performance Index
            </Dropdown.Item>
            <Dropdown.Item href="#/action-17">Cost Variance</Dropdown.Item>
            <Dropdown.Item href="#/action-18">Earned Value</Dropdown.Item>
            <Dropdown.Item href="#/action-19">Estimate vs Actual</Dropdown.Item>
            <Dropdown.Item href="#/action-20">Missed Milestones</Dropdown.Item>
            <Dropdown.Item href="#/action-21">Planned Value</Dropdown.Item>
            <Dropdown.Item href="#/action-22">Progress (%)</Dropdown.Item>
            <Dropdown.Item href="#/action-23">Productivity </Dropdown.Item>
            <Dropdown.Item href="#/action-24">
              Project Gross Profit Margin
            </Dropdown.Item>
            <Dropdown.Item href="#/action-25">Project Velocity </Dropdown.Item>
            <Dropdown.Item href="#/action-26">
              Return On Investment
            </Dropdown.Item>
            <Dropdown.Item href="#/action-27">
              Retail Price Index
            </Dropdown.Item>
            <Dropdown.Item href="#/action-28">Schedule Variance</Dropdown.Item>
            <Dropdown.Item href="#/action-29">
              Scheduled Performance Index
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {props &&
        props.stages &&
        props.stages.map((data) => {
          let tickets = data &&
            data.tickets &&
            data.tickets.length > 0 &&
            data.tickets.map((ticket, index) => {
              return {
                id: ticket._id,
                name: ticket.ticketCode && ticket.title
                  ? ticket.ticketCode + " - " + ticket.title
                  : null,
                Assigne: "Product2",
                Priority: 122,
                StartDate: "01/09/20",
                DueDate: "01/08/20",
                Countdown: "15",
                Status: "",
                Estimate: "15 Days",
                RiskStatus: "AMBER",
                ticket: ticket
              }
            });
          return <>
            <div className="listview_table">
              <BootstrapTable
                data={tickets}
                bodyStyle={{ background: "#ffffff" }}
              >
                <TableHeaderColumn
                  width="155px"
                  isKey
                  dataField="name"
                  dataSort={true}
                  formatExtraData={closeIcon}
                >
                  <span className="dataname">{data.name}</span>

                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="id"
                  dataSort={true}
                  dataAlign="left"
                  dataFormat={closeIcon}
                >
                  <button
                    className="Editicon"
                    onClick={() =>
                      props.isShowEditStagePopup(true, data._id, data.name, data.description, data)
                    }
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="removeicon"
                    onClick={() => props.isShowDeleteStagePopup(true, data._id)}
                  >

                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="Assigne"
                  dataSort={true}
                  dataAlign="center"
                  dataFormat={AssigneeFormatter}
                >
                  Assigne <img className="ms-1" src={ShortIcon} alt="" />
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="Priority"
                  dataSort={true}
                  dataAlign="center"
                  dataFormat={PriorityFormatter}
                >
                  Priority <img className="ms-1" src={ShortIcon} alt="" />
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="StartDate"
                  dataSort={true}
                  dataAlign="center"
                >

                  Start Date <img className="ms-1" src={ShortIcon} alt="" />
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="DueDate"
                  dataSort={true}
                  dataAlign="center"
                >
                  Due Date <img className="ms-1" src={ShortIcon} alt="" />
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="Countdown"
                  dataSort={true}
                  dataAlign="center"
                  dataFormat={countdownFormatter}
                  width="150px"
                >
                  Countdown (days){" "}
                  <img className="ms-1" src={ShortIcon} alt="" />
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="Status"
                  dataFormat={statusFormatter}
                  dataSort={true}
                  dataAlign="center"
                >
                  Status <img className="ms-1" src={ShortIcon} alt="" />
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="Estimate"
                  dataSort={true}
                  dataAlign="center"
                >
                  Estimate <img className="ms-1" src={ShortIcon} alt="" />
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="RiskStatus"
                  dataSort={true}
                  dataAlign="center"
                  dataFormat={riskformatter}
                >
                  Risk Status <img className="ms-1" src={ShortIcon} alt="" />
                </TableHeaderColumn>
              </BootstrapTable>
              <div className="addtask_btn"><button
                className="bg-transparent border-0 px-3 py-2"
                onClick={() => props.isShowPopup(true)}
              >
                Add Task
              </button>
              </div>
            </div>


          </>
        }
        )}
      <button
        className="bg-transparent border-0 px-3 py-2"
        onClick={() => props.isShowCreateStagePopup(true)}
      >
        Add Stage
      </button>
      <ConfirmDeleteModal
        showModalPopup={showConfirmPopup}
        popupMessage={popupMessage}
        operationType={operationType}
        onConfirm={popupConfirmHandler}
        onPopupClose={popupCancelHandler}
      />
    </>
  );
};
export default ProjectListView;
