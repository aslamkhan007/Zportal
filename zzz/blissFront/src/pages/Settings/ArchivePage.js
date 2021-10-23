import React, { Component, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Dropdown, Modal, ButtonGroup } from 'react-bootstrap';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import Sidebar from "../../components/Common/Sidebar";
import Topbar from "../../components/Common/Topbar";
import './Settings.scss';
import { recycleBinActions, getArchivedItems, searchRecycleBinItems, searchArchiveItems } from '../../redux/Action/setting.action';
import { ConfirmDeleteModal, ConfirmPasswordDeleteModal } from '../../components/Project/ConfirmDeleteModal';
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import { listProjectAction, editProjectAction, createProgramAction, listProgramAction } from "../../redux/Action";

function ArchivePage() {
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false)
  const [showPasswordConfirmPopup, setShowPasswordConfirmPopup] = useState(false)
  const [selection, setSelection] = useState([])
  const [items, setItems] = useState([])
  const [operationType, setOperationType] = useState("restoreArchive")
  const [popupMessage, setPopupMessage] = useState("Are you sure")
  const [searchTerm, setSearchTerm] = useState('')
  const workspaceState = useSelector((state) => state.workspace);
  const programsState = useSelector((state) => state.programs);
  const dispatch = useDispatch();

  const sidebar = {
    userBoard: true,
    sidebarSubTitle: [
      {
        "name": "General Settings",
        "link": "settings",

      },
      {
        "name": "My Account",
        "link": "account",
      },
      {
        "name": "Users",
        "link": "user",
      },
      {
        "name": "Security and Permissions",
        "link": "security",
      },
      {
        "name": "Recycle Bin",
        "link": "recycle",
      },
      {
        "name": "Archive",
        "link": "archive-page",
      },
      {
        "name": "Import",
        "link": "import",
      },
      {
        "name": "Workspace",
        "link": "Workspace",
      },
    ]
  }

  const listPrograms = () => {
    const workspaceId = workspaceState && workspaceState.selectedWorkspace && workspaceState.selectedWorkspace._id ? workspaceState.selectedWorkspace._id : ''
    dispatch(listProgramAction(workspaceId))
  }

  useEffect(() => {
    listItems();
  }, []);

  const listItems = async () => {
    const data = await getArchivedItems();
    if (data.status === 200) {
      setItems(data.results)
    }
  }

  //handlers
  const handleSuccess = async (response) => {
    if (response.status === 200) {
      listItems();
      createNotification("success", response.message);
      setShowConfirmPopup(false)
      setShowPasswordConfirmPopup(false)
    }
  }
  const popupConfirmHandler = async ({ ot, password }) => {
    if (ot === 'restoreArchive') {
      //call delete here 
      const response = await recycleBinActions({ actionType: ot, ids: selection })
      if (response.status === 200) {
        listItems();
        createNotification("success", response.message);
        listPrograms()
      }
      console.log("response::", response)
    }
    if (ot === 'delete') {
      //call delete here 
      const response = await recycleBinActions({ actionType: ot, ids: selection })
      if (response.status === 200) {
        listItems();
        createNotification("success", response.message);
      }
      console.log("response::", response)
    }
    if (ot === 'deleteAll') {
      //call delete here 
      const response = await recycleBinActions({ actionType: ot, ids: selection, password })
      if (response.status === 200) {
        listItems();
        createNotification("success", response.message);
      }
      if (response.status === 401) {
        listItems();
        createNotification("info", response.message);
      }
      console.log("response::", response)
    }

    setShowConfirmPopup(false)
    setShowPasswordConfirmPopup(false)
  }
  const popupCancelHandler = async () => {
    setShowConfirmPopup(false)
    setShowPasswordConfirmPopup(false)
  }
  const restoreHander = async () => {
    if (selection && selection.length) {
      setShowConfirmPopup(true)
      setOperationType("restoreArchive")
      setPopupMessage([<p>You are about to restore selected items from the Archives.</p>, <p> Please confirm this is the action you wish to take</p>])
    }


  }
  const deleteHander = async () => {
    if (selection && selection.length) {
      setShowConfirmPopup(true)
      setOperationType("delete")
      setPopupMessage([<p>You are about to permenantly delete selected items from the recycle bin.</p>, <p> Please confirm this is the action you wish to take</p>])
    }
  }
  const deleteAllHander = async () => {
    setShowPasswordConfirmPopup(true)
    setOperationType("deleteAll")
    setPopupMessage([<p>You are about to permenantly delete ALL items from the recycle bin.</p>, <p> Please confirm this is the action you wish to take</p>])
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm === '') listItems()
      if (searchTerm !== '') {
        const response = await searchArchiveItems(searchTerm);
        if (response.status === 200) {
          setItems(response.results)
        }
      }
      // Send Axios request here
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'archivedOn', headerName: 'Archived On', width: 200 },
    { field: '_archivedBy', headerName: 'Archived By', width: 200 },
    { field: 'restore', headerName: 'Restrore', width: 200 },
    { field: 'permanantlyDelete', headerName: 'Permanantly Delete', width: 200 },
  ];

  return (
    <React.Fragment>
      <div className="main-sec main_setting Users_mein recycle bgwhite">
        {/* <Sidebar sidebarTitle={"Settings"} sidebar={sidebar} /> */}
        <div className="right-sec">
          <div className="top-bar bg-white border-0">
            <Topbar topBarTitle={"Archive"} />
            <div className="d-flex justify-content-between mt-3">
              <h6 className="d-none d-md-inline-block"></h6>
            </div>
          </div>
          <div className="right-content-wrap account-form-sec bg-white recycle_bin">

            <ConfirmDeleteModal showModalPopup={showConfirmPopup} popupMessage={popupMessage} operationType={operationType} onConfirm={popupConfirmHandler} onPopupClose={popupCancelHandler} />
            <ConfirmPasswordDeleteModal showPasswordConfirmPopup={showPasswordConfirmPopup} handleSuccess={handleSuccess} popupMessage={popupMessage} operationType={operationType} onConfirm={popupConfirmHandler} onPopupClose={popupCancelHandler} />
            <div className="change-pass-box mt-4">
              <Row className="mb-8">
                <Col xl={"3"} md={"3"} className="mb-4 h-100 mr-30">
                  <Form.Group className="topbar-search-user mb-0 d-lg-inline-block" controlId="formBasicPassword">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 20L11.25 11.25" stroke="#0C1826" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="10" cy="10" r="6.07107" transform="rotate(-45 10 10)" fill="white" stroke="#0C1826" stroke-width="2" />
                    </svg>

                    <Form.Control type='text' autoComplete='off' onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" />
                  </Form.Group>
                </Col>
                <Col xl={"4"} md={"4"} className="mb-4 h-100">

                  <Button variant="light" type="button" onClick={restoreHander} className="btn-sm">
                    Restore
                  </Button>
                  <Button variant="light" type="button" onClick={deleteHander} className="btn-sm">
                    Delete
                  </Button>
                  <Button variant="light" type="button" onClick={deleteAllHander} className="btn-sm">
                    Delete All
                  </Button>

                </Col>
              </Row>
            </div>

            {/* Code for data grid table */}
            <div style={{ height: 300, width: '100%' }}>
              <DataGrid rows={items}
                columns={columns}
                onSelectionModelChange={(newSelection) => {
                  setSelection(newSelection);
                }}
                checkboxSelection />
            </div>

          </div>
        </div>

      </div>

    </React.Fragment>
  )
}
export default ArchivePage;