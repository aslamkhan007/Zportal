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
import ModalPopup from "../../components/Project/modal_popup";
import ImportProjectModal from "../../components/Project/ImportProjectModal";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import { Link, useParams } from "react-router-dom";
import { find } from "lodash";
import { WorkLayout } from "../../components/Common/WorkLayout";
import CreateStage from "../../components/Project/CreateStage";
import ConfirmBox from "../../components/Common/ConfirmBox";
import { ProjectAction ,listStageAction,getProjectAction,editStageAction} from "../../redux/Action";
import GanttView from "./GanttView";
import GanttView2 from "./GanttView2";


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
  const [showStageEditPopup, setShowStageEditPopup] = useState(false);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
  const [stageId, setStageId] = useState('');
  const [stageName, setStageName] = useState('')
  const [stageChangeOrAdd, setStageChangeOrAdd] = useState(false);
  const [ticketChangeOrAdd, setTicketChangeOrAdd] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState('');
  const [projectIdd , setProjectIdd] = useState('')
  

  const { projectId } = useParams();
  const programsState = useSelector((state) => state.programs);
  console.log("program::: ", programsState)
  

  const isShowPopup = (status) => {
    setShowModalPopup(status);
  };

  const isStageChangeOrAdd = (status) => {
    setStageChangeOrAdd(status)
  }

  const isTicketChangeOrAdd = (status) => {
    setTicketChangeOrAdd(status)
  }

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
        getProject(projectId)
      } else {
        setProjectIdd(projects[0]._id);
        getProject(projects[0]._id)
      }
    }
  }, [projectId, projects]);

  

  useEffect(() => {
    console.log("props===", stageChangeOrAdd)
    if (stageChangeOrAdd || ticketChangeOrAdd) {
      setStageChangeOrAdd(false)
      setTicketChangeOrAdd(false)
      const projectId = project && project._id ? project._id : ''
      if (projectId) {
        getProject(projectId)
      }

    }
  }, [stageChangeOrAdd, ticketChangeOrAdd]);

  const getProject = (projectId) => {
    setLoading(false);
    getProjectAction(projectId)
      .then((result) => {
        console.log("project result 23= ", result)
        if (result.status === 200) {
          setProject(result.results)
          setStages(result.results.stages)
          const view = result && result.results && result.results.view ?result.results.view:'list'
          setSelectedNavItem(view)
        } else {
          createNotification("error", result.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

 

  const isShowCreateStagePopup = (status) => {
    setShowStagePopup(status);
  };
  const isShowEditStagePopup = (status,id,stageName) => {
    setShowStageEditPopup(status);
    setStageId(id)
    setStageName(stageName)
  };
  const isShowDeleteConfirmPopup = (status,id) => {
    setShowDeleteConfirmPopup(status);
    setStageId(id)
  };

  const changeDefaultViewhandler = async (value) => {
    const response = await ProjectAction({ projectId:projectIdd, operationType: "edit", view: value })
    setSelectedNavItem(value)
    getProject(projectIdd)
    console.log("response::", response)
    createNotification("success", "Pin successfully");
  }

  const onDeleteConfirm =()=>{
    isShowDeleteConfirmPopup(false)
    const data = {
      stageId: stageId,
      operationType: 'delete'
    }; 
    editStageAction(data)
      .then((result) => {
        if (result.status === 200) {
          createNotification("success", result.message);
          getProject(projectIdd)
        } else {
          createNotification("error", result.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <div className="main-sec">
        <Sidebar
          sidebarTitle={"Projects & Tasks"}
          openProject={openProject}
          openImport={openImport}
        />
        <WorkLayout>
          <div className="right-sec overscroll">
            <Tab.Container id="left-tabs-example" activeKey={selectedNavItem} defaultActiveKey={selectedNavItem}>
              <div className="top-bar bg-white">
                <Topbar
                  topBarTitle={project && project.projectName && project.projectName && project.projectCode ? (project.projectCode + ' - ' + project.projectName) : null}
                />
                <div className="d-flex justify-content-between">
                  <Nav className="d-flex head-tabs-nav mt-2">
                    <NavDropdown
                      title="Dropdown"
                      id="basic-nav-dropdown"
                      className=""
                    >
                      <NavDropdown.Item eventKey="list"  >
                        <Button onClick={() => setSelectedNavItem("list")}>List</Button>
                        <Button onClick={() => changeDefaultViewhandler("list")}></Button>
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="gantt"   >
                        <Button onClick={() => setSelectedNavItem("gantt")}>Gantt</Button>  
                        <Button onClick={() => changeDefaultViewhandler("gantt")}></Button>
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="board" >
                              <Button onClick={() => setSelectedNavItem("board")}>Board</Button> 
                              <Button onClick={() => changeDefaultViewhandler("board")}></Button>
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="ganttest" >
                        Gantt test <Button onClick={() => changeDefaultViewhandler("gantt")}></Button>
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="ganttest2" >
                        Gantt test2
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                      <Nav.Link eventKey="four">Profile </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="five">RAID</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="six">Draw</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>
             {stages && stages.length === 0?
              <button onClick={() => isShowCreateStagePopup(true)}>Add stage</button>
              :null}
              {!showCreateProject ? (
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
                    ></ModalPopup>
                  </Fragment>
                  <Tab.Content >
                  <Tab.Pane eventKey="list">
                      <ProjectListView
                        stages={stages}
                        isShowCreateStagePopup={isShowCreateStagePopup}
                        isShowEditStagePopup={isShowEditStagePopup}
                        isShowDeleteStagePopup={isShowDeleteConfirmPopup}
                        isShowPopup={isShowPopup}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="gantt">
                      <ProjectGranttView 
                        stages={stages}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="ganttest">
                      <GanttView />
                    </Tab.Pane>
                    <Tab.Pane eventKey="ganttest2">
                      <GanttView2 />
                    </Tab.Pane>
                    <Tab.Pane eventKey="board">
                      <ProjectBoardView 
                       stages={stages}/>
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
              ) : (
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
          <CreateStage
            showStagePopup={showStagePopup}
            isShowPopup={isShowCreateStagePopup}
            project={project}
            isStageChangeOrAdd={isStageChangeOrAdd}
            btnText="Add"
            title="NEW STAGE"
            type='add'
          />
          <CreateStage
            showStagePopup={showStageEditPopup}
            isShowPopup={isShowEditStagePopup}
            project={project}
            isStageChangeOrAdd={isStageChangeOrAdd}
            btnText="Edit"
            title="EDIT STAGE"
            id={stageId}
            type='edit'
            name={stageName}
          />
          <ConfirmBox
             showConfirmPopup={showDeleteConfirmPopup}
             onPopupClose={isShowDeleteConfirmPopup}
             onConfirm={onDeleteConfirm}
             warningText={<><p>You are about to  delete stage. </p>
              <p>Please confirm this is the action you wish to take</p></>}
            />
        </WorkLayout>
      </div>
      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};
export default Programs;
