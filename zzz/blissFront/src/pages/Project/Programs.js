import React, { Component, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Tab, Nav, Button } from "react-bootstrap";
import Sidebar from "../../components/Common/Sidebar";
import Topbar from "../../components/Common/Topbar";
import ProjectListView from "../../components/Project/ProjectListView";
import ProjectGranttView from "../../components/Project/ProjectGranttView";
import ProjectBoardView from "../../components/Project/ProjectBoardView";
import ProjectProfile from "../../components/Project/ProjectProfile";
import ProjectRaid from "../../components/Project/ProjectRaid";
import "./Project.scss";
import activepinicon from "../../assets/images/fillpinicon.png";
import ModalPopup from "../../components/Project/modal_popup";
import ImportProjectModal from "../../components/Project/ImportProjectModal";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import { Link, useParams } from "react-router-dom";
import { find } from "lodash";
import { WorkLayout } from "../../components/Common/WorkLayout";
import CreateStage from "../../components/Project/CreateStage";
import StagePopupModal from "../../components/Project/popupModel/StagePopupModal";
import ConfirmBox from "../../components/Common/ConfirmBox";

import {
  ProjectAction,
  listStageAction,
  getProjectAction,
  editStageAction,
} from "../../redux/Action";
import GantView from "./GantView";
import BoardView from "./BoardView";
import StatusModal from "../../components/Project/popupModel/StatusModal";

const Programs = (props) => {
  // for popup
  const [errors, setErrors] = useState([]);
  const [project, setProject] = useState({});
  const [projects, setProjects] = useState([]);
  const [stages, setStages] = useState([]);
  const [openProject, setOpenProject] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalPopup, setShowModalPopup] = useState(false);
  const [showImportModalPopup, setImportShowModalPopup] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showStagePopup, setShowStagePopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [statusId, setStatusId] = useState("");
  const [statusName, setStatusName] = useState("");
  const [showEditStatusPopup, setShowEditStatusPopup] = useState(false);

  const [showStageEditPopup, setShowStageEditPopup] = useState(false);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
  const [showArchiveConfirmPopup, setShowArchiveConfirmPopup] = useState(false);
  const [stageId, setStageId] = useState("");
  const [stageName, setStageName] = useState("");
  const [stageDescription, setStageDescription] = useState("");
  const [stageChangeOrAdd, setStageChangeOrAdd] = useState(false);
  const [ticketChangeOrAdd, setTicketChangeOrAdd] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const [projectIdd, setProjectIdd] = useState("");
  const [op, setOp] = useState(false);
  const [dbView, setdbView] = useState(true);
  const [showAddStage, setShowAddStage] = useState(false);
  const [showEditTicketPopup, setShowEditTicketPopup] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({})
  const [stageObj, setStageObj] = useState('')

  const { projectId } = useParams();
  const programsState = useSelector((state) => state.programs);
  console.log("program::: ", programsState);

  const isShowPopup = (status) => {
    setShowModalPopup(status);
  };

  const isShowEditTicketPopup = (status, ticket) => {
    setShowEditTicketPopup(status);
    setCurrentTicket(ticket);
  };

  const isStageChangeOrAdd = (status) => {
    setStageChangeOrAdd(status);
  };

  const isTicketChangeOrAdd = (status) => {
    setTicketChangeOrAdd(status);
  };

  const isShowImportPopup = (status) => {
    setImportShowModalPopup(status);
  };

  const openProjectFn = () => {
    setOpenProject(true);
    setOpenImport(false);
  };
  const openImportFn = () => {
    setOpenProject(false);
    setOpenImport(true);
  };

  useEffect(async () => {
    if (
      programsState &&
      programsState.programs &&
      programsState.programsDataStatus
    ) {
      let arrayData = [];
      await programsState.programs.map((data) => {
        data.projects &&
          data.projects.length > 0 &&
          data.projects.map((project) => {
            arrayData.push(project);
          });
      });
      setProjects(arrayData);
      console.log("arrayData==", arrayData);
    }
  }, [programsState]);

  // end popup

  useEffect(() => {
    if (projects.length <= 0) {
      setShowCreateProject(true);
      setProject({ projectName: "Project Name" });
    } else {
      setShowCreateProject(false);
      if (projectId) {
        setProjectIdd(projectId);
        getProject(projectId);
      } else {
        setProjectIdd(projects[0]._id);
        getProject(projects[0]._id);
      }
    }
  }, [projectId, projects]);

  useEffect(() => {
    console.log("props===", stageChangeOrAdd);
    if (stageChangeOrAdd || ticketChangeOrAdd) {
      setStageChangeOrAdd(false);
      setTicketChangeOrAdd(false);
      setCurrentTicket({})
      const projectId = project && project._id ? project._id : "";
      if (projectId) {
        getProject(projectId);
        setOp(true);
      }
    }
  }, [stageChangeOrAdd, ticketChangeOrAdd]);

  const getProject = (projectId) => {
    setLoading(false);
    getProjectAction(projectId)
      .then((result) => {
        console.log("project result 23= ", result);
        if (result.status === 200) {
          if (projectId && result.results === null) {
            props.history.push('/programs')
          }
          setProject(result.results);
          setStages(result.results.stages);
          setShowAddStage(true)
          setShowCreateProject(false);
          if (dbView) {
            const view =
              result && result.results && result.results.view
                ? result.results.view
                : "gantt";
            setSelectedNavItem(view);
            menusetValue(view)
            setdbView(false);
          }

        } else {
          createNotification("error", result.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isShowCreateStagePopup = (status) => {
    setShowStagePopup(status);
  };
  const addStatusPopupHandler = (toggle) => {
    setShowStatusPopup(toggle);
  };
  const isShowEditStagePopup = (status, id, stageName, description, stage = '') => {
    setShowStageEditPopup(status);
    setStageId(id);
    setStageName(stageName);
    setStageDescription(description)
    setStageObj(stage)
  };
  const editStatusPopupHandler = (toggle, id, status) => {
    setShowEditStatusPopup(toggle);
    setStatusId(id);
    setStatusName(status);
  };
  const isShowDeleteConfirmPopup = (status, id) => {
    setShowDeleteConfirmPopup(status);
    setStageId(id);
  };

  const isShowArchiveConfirmPopup = (status, id) => {
    setShowArchiveConfirmPopup(status);
    setStageId(id);
  };

  const changeDefaultViewhandler = async (value) => {
    const response = await ProjectAction({
      projectId: projectIdd,
      operationType: "edit",
      view: value,
    });
    setSelectedNavItem(value);
    menusetValue(value)
    getProject(projectIdd);
    console.log("response::", response);
    createNotification("success", "Pin successfully");
  };

  const onDeleteConfirm = () => {
    isShowDeleteConfirmPopup(false);
    const data = {
      stageId: stageId,
      operationType: "delete",
    };
    editStageAction(data)
      .then((result) => {
        if (result.status === 200) {
          setOp(true);
          createNotification("success", result.message);
          getProject(projectIdd);
        } else {
          createNotification("error", result.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onArchiveConfirm = () => {
    isShowArchiveConfirmPopup(false);
    const data = {
      stageId: stageId,
      operationType: "archive",
    };
    editStageAction(data)
      .then((result) => {
        if (result.status === 200) {
          setOp(true);
          createNotification("success", result.message);
          getProject(projectIdd);
        } else {
          createNotification("error", result.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [menuvalue, menusetValue] = useState("gantt");
  const handleSelect = (e) => {
    console.log("e----", e)
    menusetValue(e);
  };

  const refreshProject = () => {
    setProject(projectId)
  }

  return (
    <React.Fragment>
      {/* <Sidebar
          sidebarTitle={"Projects & Tasks"}
          openProject={openProject}
          openImport={openImport}
        /> */}
      <WorkLayout>
        <div className="right-sec overscroll">
          <Tab.Container
            id="left-tabs-example"
            activeKey={selectedNavItem}
            defaultActiveKey={selectedNavItem}
          >
            <div className="top-bar dd bg-white">
              <Topbar
                topBarTitle={
                  project &&
                    project.projectName &&
                    project.projectName &&
                    project.projectCode
                    ? project.projectCode + " - " + project.projectName
                    : null
                }
              />
              <div className="d-flex justify-content-between">
                <Nav className="d-flex head-tabs-nav mt-2 top-bar-menu">
                  <NavDropdown
                    title={menuvalue}
                    id="basic-nav-dropdown"
                    className=""
                    onSelect={handleSelect}
                  >
                    <NavDropdown.Item eventKey="list">
                      <span className="menu" onClick={() => setSelectedNavItem("list")}>
                        List
                      </span>
                      <span
                        className="dropdown_menuicon"
                        onClick={() => changeDefaultViewhandler("list")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pin"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z" />
                        </svg>
                        <img src={activepinicon} />
                      </span>
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="gantt">
                      <span className="menu" onClick={() => setSelectedNavItem("gantt")}>
                        Gantt
                      </span>
                      <span
                        className="dropdown_menuicon"
                        onClick={() => changeDefaultViewhandler("gantt")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pin"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z" />
                        </svg>
                        <img src={activepinicon} />
                      </span>
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="board">
                      <span className="menu" onClick={() => setSelectedNavItem("board")}>
                        Board
                      </span>
                      <span
                        className="dropdown_menuicon"
                        onClick={() => changeDefaultViewhandler("board")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pin"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z" />
                        </svg>
                        <img src={activepinicon} />
                      </span>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="four"
                      onClick={() => setSelectedNavItem("four")}
                    >
                      Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="five"
                      onClick={() => setSelectedNavItem("five")}
                    >
                      RAID
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="six"
                      onClick={() => setSelectedNavItem("six")}
                    >
                      Draw
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            {stages && stages.length === 0 && showAddStage ? (
              <button
                className="addstagebtn"
                onClick={() => isShowCreateStagePopup(true)}
              >
                Add stage
              </button>
            ) : null}
            {stages && stages.length > 0 && (
              <div className="right-content-wrap" id="contentbgimage">
                <Fragment>
                  <Fragment>
                    <div
                      className="popup_data"
                      onClick={() => isShowPopup(true)}
                    >
                      <span className="add-card">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 29.7615V0.713867"
                            stroke="white"
                            stroke-width="4"
                          />
                          <path
                            d="M0.475818 15.2383L29.5234 15.2383"
                            stroke="white"
                            stroke-width="4"
                          />
                        </svg>
                      </span>
                    </div>
                  </Fragment>
                  <ModalPopup
                    showModalPopup={showModalPopup}
                    isShowPopup={isShowPopup}
                    stages={stages}
                    project={project}
                    isTicketChangeOrAdd={isTicketChangeOrAdd}
                    type="add"
                  ></ModalPopup>
                  <ModalPopup
                    showModalPopup={showEditTicketPopup}
                    isShowPopup={isShowEditTicketPopup}
                    stages={stages}
                    project={project}
                    isTicketChangeOrAdd={isTicketChangeOrAdd}
                    currentTicket={currentTicket}
                    type="edit"
                  ></ModalPopup>
                </Fragment>
                <Tab.Content>
                  <Tab.Pane eventKey="list">
                    <ProjectListView
                      stages={stages}
                      isShowCreateStagePopup={isShowCreateStagePopup}
                      isShowEditStagePopup={isShowEditStagePopup}
                      isShowDeleteStagePopup={isShowDeleteConfirmPopup}
                      isShowPopup={isShowPopup}
                      isShowEditTicketPopup={isShowEditTicketPopup}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="gantt">
                    {selectedNavItem === 'gantt' ?
                      <GantView
                        projectId={projectIdd}
                        isShowCreateStagePopup={isShowCreateStagePopup}
                        isStageChangeOrAdd={isStageChangeOrAdd}
                        stageChangeOrAdd={stageChangeOrAdd}
                      />
                      : null}
                  </Tab.Pane>
                  <Tab.Pane eventKey="board">
                    <BoardView
                      stages={stages}
                      setShowModalPopup={setShowModalPopup}
                      addStatusPopupHandler={addStatusPopupHandler}
                      editStatusPopupHandler={editStatusPopupHandler}
                      op={op}
                      isShowCreateStagePopup={isShowCreateStagePopup}
                      isShowEditStagePopup={isShowEditStagePopup}
                      setOp={setOp}
                      isShowDeleteStagePopup={isShowDeleteConfirmPopup}
                      isShowArchiveStagePopup={isShowArchiveConfirmPopup}
                      setProject={refreshProject}
                      projectId={projectIdd}
                      isShowEditTicketPopup={isShowEditTicketPopup}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <ProjectProfile />
                  </Tab.Pane>
                  <Tab.Pane eventKey="five">
                    <ProjectRaid />
                  </Tab.Pane>
                  <Tab.Pane eventKey="six">Content Six</Tab.Pane>
                </Tab.Content>
              </div>
            )}
            {showCreateProject && (
              <div className="right-sec">
                <div className="newProjectSetup">
                  <div className="newProjectBoxen">
                    <h3>Let's get Started</h3>
                    <p>
                      You can either start a new project or work stream or
                      import from whereever you are already working from
                    </p>
                    <div className="newProjectActions">
                      <button
                        type="button"
                        className="outlineButton"
                        onClick={() => openProjectFn()}
                      >
                        New Project
                      </button>
                      <button
                        type="button"
                        className="outlineButton"
                        onClick={() => openImportFn()}
                      >
                        Import Project
                      </button>
                    </div>
                    <ImportProjectModal
                      showModalPopup={showImportModalPopup}
                      onPopupClose={isShowImportPopup}
                    />
                  </div>
                </div>
              </div>
            )}
          </Tab.Container>
        </div>
        <StagePopupModal
          showStagePopup={showStagePopup}
          isShowPopup={isShowCreateStagePopup}
          project={project}
          isStageChangeOrAdd={isStageChangeOrAdd}
          btnText="Add"
          titleText="NEW STAGE"
          type="add"
        />
        <StatusModal
          showStatusPopup={showStatusPopup}
          isShowPopup={addStatusPopupHandler}
          project={project}
          isStageChangeOrAdd={isStageChangeOrAdd}
          btnText="Add"
          titleText="NEW STATUS"
          refreshProject={refreshProject}
          status={""}
          type="add"
        />

        <StatusModal
          showStatusPopup={showEditStatusPopup}
          isShowPopup={editStatusPopupHandler}
          project={project}
          isStageChangeOrAdd={isStageChangeOrAdd}
          btnText="Edit"
          titleText="EDIT STATUS"
          id={statusId}
          type="edit"
          refreshProject={refreshProject}
          status={statusName}

        />
        <StagePopupModal
          showStagePopup={showStageEditPopup}
          isShowPopup={isShowEditStagePopup}
          project={project}
          isStageChangeOrAdd={isStageChangeOrAdd}
          btnText="Edit"
          titleText="EDIT STAGE"
          id={stageId}
          type="edit"
          name={stageName}
          description={stageDescription}
          stageObj={stageObj}
        />
        <ConfirmBox
          showConfirmPopup={showDeleteConfirmPopup}
          onPopupClose={isShowDeleteConfirmPopup}
          onConfirm={onDeleteConfirm}
          warningText={
            <>
              <p>You are about to delete stage. </p>
              <p>Please confirm this is the action you wish to take</p>
            </>
          }
        />
        <ConfirmBox
          showConfirmPopup={showArchiveConfirmPopup}
          onPopupClose={isShowArchiveConfirmPopup}
          onConfirm={onArchiveConfirm}
          warningText={
            <>
              <p>You are about to archive stage. </p>
              <p>Please confirm this is the action you wish to take</p>
            </>
          }
        />

      </WorkLayout>
      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};
export default Programs;
