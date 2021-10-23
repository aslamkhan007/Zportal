import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Sidebar.scss';
import CreateProject from '../Project/CreateProject';
import ImportProjectModal from '../Project/ImportProjectModal';
import ArchiveModal from '../Project/ArchiveModal';
import DeleteProjectModal from '../Project/DeleteprojectModal';
import ProjectRenameModal from '../Project/ProjectRenameModal';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { addClass: false }
    this.state = { Dashboard: false }
    this.state = { Ongoing: false }
    this.state = { Settings: false }
    this.state = { Common: false }
    this.state = { showProjectModalPopup : false}
    this.state = { showImportModalPopup : false}
    this.state = { showArchiveModalPopup : false}
    this.state = { showDeleteModalPopup : false}
    this.state = { showRenameModalPopup : false}
  }

  isRenameProjectModal = () => {
    this.setState({showRenameModalPopup: true})
  }
  isDeleteProjectModal = () =>{
    this.setState({showDeleteModalPopup: true})
  }
  isArchiveProjectModal = () => {
    this.setState({showArchiveModalPopup: true})
  }
  isShowProjectPopup = (status) => {
    this.setState({showProjectModalPopup: status})
  };
  isShowImportPopup = (status) => {
    this.setState({showImportModalPopup: status})
  };
  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }
  dashboard() {
    this.setState({ addDashboard: !this.state.Dashboard });
  }
  ongoing() {
    this.setState({ Ongoing: !this.state.Ongoing });
  }
  settings() {
    this.setState({ Settings: !this.state.Settings });
  }
  common() {
    this.setState({ CommonClass: !this.state.Common });
  }
  Create(){
    alert('Create Project');
  }



  render() {
    let boxClass = ["sidebar-sec d-flex bg-white"];
    let onGlass = [];
    let OngoingC = [];
    let SettingsC = [];
    let Common = [];

    if (window.location.pathname == "/settings") {
      Common.push('active');
    } else {
      Common.push('');
    }

    if (this.state.addClass) {
      boxClass.push('sidebar-slide');
    }
    if (this.state.addDashboard) {
      Common.push('active');
    } else {
      Common.push('');
    }
    if (this.props.sidebar.sidebarSubTitle[0].link === 'dashboard' && this.props.sidebar.sidebarSubTitle[1].link && this.props.sidebar.sidebarSubTitle[2].link === 'dashboard-digital-transformation') {
      onGlass.push('active');
    } else {
      onGlass.push('');
    }
    if (window.location.pathname == "/ongoing-construction") {
      OngoingC.push('active');
    } else {
      OngoingC.push('');
    }
    if (this.props.sidebar.sidebarSubTitle[1].link === 'account' && this.props.sidebar.sidebarSubTitle[2].link === 'user' && this.props.sidebar.sidebarSubTitle[3].link === 'security' && this.props.sidebar.sidebarSubTitle[4].link === 'recycle' && this.props.sidebar.sidebarSubTitle[5].link === 'import') {
      SettingsC.push('active');
    } else {
      SettingsC.push('');
    }

    return (
      <>
        <button className="menuOpen" onClick={this.toggle.bind(this)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            class="svg-inline--fa fa-bars fa-w-14"
            role="img"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            />
          </svg>
        </button>
        <div className={boxClass.join(" ")}>
          <div className="parent-bar">
            <Link className="sidebar-logo" to="/dashboard">
              <svg
                width="39"
                height="50"
                viewBox="0 0 39 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.3544 19.6179C32.4142 19.6179 35.3683 16.4155 35.3683 10.253C35.3683 10.253 35.6393 0 22.278 0L12.8193 0H3.92981V5.92034H8.94371V40.6889C7.5073 40.07 6.20639 39.2626 5.0681 38.267L0 44.7255C4.17373 47.901 10.2175 50 16.0716 50C28.4031 50 39 43.8106 39 32.6695C39 23.2508 32.0347 19.6179 30.3544 19.6179ZM17.508 6.91604C18.4566 6.78149 19.3509 6.64693 20.2995 6.64693C22.9284 6.64693 25.5031 7.40043 26.5601 9.52637C26.8853 10.0915 27.0751 10.7643 27.0751 11.5178C27.0751 11.5716 27.0751 11.6254 27.0751 11.7061C27.048 12.5404 26.8853 13.267 26.5601 13.8859C25.5031 16.0118 22.9284 16.7922 20.2995 16.7922C19.3509 16.7922 18.4566 16.6577 17.508 16.5231V6.91604ZM17.508 42.169V23.8698C17.508 23.8698 30.3815 22.3358 30.3815 32.0506C30.3544 40.8235 24.0938 41.8461 17.508 42.169Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="21.2426"
                    y1="49.6286"
                    x2="13.6614"
                    y2="-1.44298"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#C73967" />
                    <stop offset="0.4208" stop-color="#FA6164" />
                    <stop offset="1" stop-color="#FDD422" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
            <ul className="list-unstyled parent-bar-list">
              <li className={onGlass.join(" ")}>
                <Link to="/dashboard">
                  <svg
                    width="27"
                    height="28"
                    viewBox="0 0 27 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.83073 0H10.2306C11.1998 0 12.0613 0.750834 12.0613 1.82346V10.1899C12.0613 11.1553 11.3075 12.0134 10.2306 12.0134H1.83073C0.861519 12.0134 0 11.2625 0 10.1899V1.82346C0 0.750834 0.753828 0 1.83073 0Z"
                      fill="white"
                    />
                    <path
                      d="M16.693 0H25.0928C26.062 0 26.9236 0.750835 26.9236 1.82346V25.0993C26.9236 26.0647 26.1697 26.9228 25.0928 26.9228H16.693C15.7238 26.9228 14.8623 26.1719 14.8623 25.0993V1.82346C14.97 0.750835 15.7238 0 16.693 0Z"
                      fill="white"
                    />
                    <path
                      d="M1.83073 15.0771H10.2306C11.1998 15.0771 12.0613 15.828 12.0613 16.9006V25.267C12.0613 26.2324 11.3075 27.0905 10.2306 27.0905H1.83073C0.861519 27.0905 0 26.3397 0 25.267V16.9006C0 15.828 0.753828 15.0771 1.83073 15.0771Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </li>
              <li className={OngoingC.join(" ")}>
                <Link to="/ongoing-construction">
                  <svg
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.6308 6.054H19.1692V1.96169C19.1692 1.31553 18.6308 0.884766 18.0923 0.884766H8.83077C8.18461 0.884766 7.75384 1.42323 7.75384 1.96169V6.054H1.2923C0.538458 6.054 0 6.59246 0 7.3463V24.3617C0 25.1155 0.538458 25.654 1.2923 25.654H25.6308C26.3846 25.654 26.9231 25.1155 26.9231 24.3617V7.3463C26.9231 6.59246 26.3846 6.054 25.6308 6.054ZM9.69231 2.82323H17.1231V5.9463H9.69231V2.82323ZM2.04616 23.7155V16.8232H7.32308V14.8848H2.04616V7.99246H7.75384H19.1692H24.8769V14.8848H19.6V16.8232H24.8769V23.7155H2.04616Z"
                      fill="#C1BEBE"
                    />
                    <path
                      d="M18.0933 18.5467H8.93945V13.1621H18.0933V18.5467ZM10.8779 16.5006H16.0471V15.1006H10.8779V16.5006Z"
                      fill="#C1BEBE"
                    />
                  </svg>
                </Link>
              </li>
              <li className={SettingsC.join(" ")}>
                <Link to="/settings">
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.0769 26.9231H11.8462C10.8769 26.9231 10.0154 26.1692 10.0154 25.0923V23.8C9.8 23.6923 9.58462 23.5846 9.26154 23.5846C9.26154 23.5846 9.26154 23.5846 9.15385 23.5846H9.04615C8.83077 23.4769 8.72308 23.4769 8.50769 23.3692L7.64615 24.2308C7.32308 24.5538 6.89231 24.7692 6.35385 24.7692C5.92308 24.7692 5.38461 24.5538 5.06154 24.2308L2.8 21.9692C2.47692 21.6462 2.26154 21.2154 2.26154 20.6769C2.26154 20.2462 2.47692 19.7077 2.8 19.3846L3.66154 18.5231C3.55385 18.3077 3.44615 18.0923 3.33846 17.8769C3.33846 17.8769 3.33846 17.8769 3.33846 17.7692C3.33846 17.7692 3.33846 17.7692 3.33846 17.6615C3.23077 17.2308 3.12308 17.0154 3.12308 16.9077H1.83077C0.753846 16.9077 0 16.0462 0 15.0769V11.8462C0 10.8769 0.753846 10.0154 1.83077 10.0154H3.12308C3.12308 9.90769 3.23077 9.69231 3.23077 9.47692C3.23077 9.47692 3.23077 9.47692 3.23077 9.36923V9.26154C3.33846 9.04615 3.44615 8.83077 3.55385 8.50769L2.8 7.64615C2.47692 7.32308 2.26154 6.78461 2.26154 6.35385C2.26154 5.92308 2.47692 5.38461 2.8 5.06154L5.06154 2.8C5.81538 2.04615 6.89231 2.04615 7.64615 2.8L8.50769 3.66154C8.72308 3.55385 8.83077 3.44615 9.04615 3.44615C9.04615 3.44615 9.04615 3.44615 9.15385 3.44615C9.15385 3.44615 9.15385 3.44615 9.26154 3.44615C9.47692 3.33846 9.8 3.23077 10.0154 3.12308V1.83077C10.0154 0.861538 10.7692 0 11.8462 0H15.0769C16.0462 0 16.9077 0.753846 16.9077 1.83077V3.12308C17.2308 3.23077 17.5538 3.33846 17.7692 3.44615C17.7692 3.44615 17.7692 3.44615 17.8769 3.44615H17.9846C18.0923 3.55385 18.2 3.55385 18.3077 3.66154L19.1692 2.8C19.9231 2.04615 21 2.04615 21.7538 2.8L24.1231 5.06154C24.8769 5.81538 24.8769 6.89231 24.1231 7.64615L23.2615 8.50769C23.3692 8.83077 23.5846 9.04615 23.6923 9.36923C23.6923 9.36923 23.6923 9.36923 23.6923 9.47692C23.6923 9.47692 23.6923 9.47692 23.6923 9.58461C23.6923 9.69231 23.8 9.8 23.8 9.90769H25.0923C26.0615 9.90769 26.9231 10.6615 26.9231 11.7385V14.9692C26.9231 15.9385 26.1692 16.8 25.0923 16.8H23.8C23.6923 17.0154 23.6923 17.1231 23.5846 17.3385V17.4462C23.5846 17.4462 23.5846 17.4462 23.5846 17.5538C23.4769 17.7692 23.3692 17.9846 23.2615 18.3077L24.1231 19.1692C24.4462 19.4923 24.6615 19.9231 24.6615 20.4615C24.6615 20.8923 24.4462 21.4308 24.1231 21.7538L21.8615 24.0154C21.5385 24.3385 21.1077 24.5538 20.5692 24.5538C20.1385 24.5538 19.6 24.3385 19.2769 24.0154L18.4154 23.1538C18.2 23.2615 18.0923 23.3692 17.8769 23.3692C17.8769 23.3692 17.8769 23.3692 17.7692 23.3692C17.7692 23.3692 17.7692 23.3692 17.6615 23.3692C17.4462 23.4769 17.1231 23.5846 16.9077 23.6923V24.9846C16.9077 26.0615 16.0462 26.9231 15.0769 26.9231ZM11.9538 24.9846H14.8615V22.4L15.6154 22.1846C16.0462 22.0769 16.4769 21.9692 16.8 21.7538C16.8 21.7538 16.8 21.7538 16.9077 21.7538C17.2308 21.6462 17.5538 21.4308 17.8769 21.2154L18.5231 20.7846L20.3538 22.6154L22.4 20.5692L20.4615 18.6308L20.8923 17.9846C21.1077 17.6615 21.3231 17.2308 21.4308 16.9077V16.8C21.4308 16.8 21.4308 16.8 21.4308 16.6923C21.5385 16.3692 21.6462 16.0462 21.7538 15.6154L21.9692 14.8615H24.5538V11.9538H21.9692L21.7538 11.2C21.6462 10.8769 21.6462 10.6615 21.4308 10.3385C21.4308 10.3385 21.4308 10.3385 21.4308 10.2308C21.2154 9.8 21 9.36923 20.7846 8.93846L20.3538 8.29231L22.6154 6.35385L20.5692 4.30769L18.7385 6.13846L18.0923 5.70769C17.7692 5.6 17.5538 5.38461 17.2308 5.27692C17.2308 5.27692 17.2308 5.27692 17.1231 5.27692H17.0154C16.5846 5.06154 16.1538 4.95385 15.7231 4.84615L14.9692 4.63077V1.93846H12.0615V4.52308L11.3077 4.73846C10.8769 4.84615 10.4462 4.95385 10.1231 5.16923C10.1231 5.16923 10.1231 5.16923 10.0154 5.16923C9.47692 5.38461 9.15385 5.49231 8.83077 5.70769L8.18462 6.13846L6.35385 4.30769L4.30769 6.35385L6.13846 8.18462L5.70769 8.83077C5.49231 9.26154 5.27692 9.58461 5.16923 10.0154C5.16923 10.0154 5.16923 10.0154 5.16923 10.1231V10.2308C5.06154 10.5538 4.95385 10.8769 4.84615 11.3077L4.63077 12.0615H1.93846V14.9692H4.52308L4.73846 15.7231C4.84615 16.0462 4.95385 16.3692 5.06154 16.8C5.06154 16.8 5.06154 16.8 5.06154 16.9077H5.16923C5.38462 17.3385 5.49231 17.6615 5.70769 17.9846L6.13846 18.6308L4.30769 20.5692L6.35385 22.6154L8.18462 20.7846L8.83077 21.2154C9.15385 21.4308 9.47692 21.5385 9.8 21.6462C9.8 21.6462 9.8 21.6462 9.90769 21.6462C10.3385 21.7538 10.6615 21.9692 11.0923 22.0769L11.8462 22.2923V24.9846H11.9538Z"
                      fill="#C1BEBE"
                    />
                    <path
                      d="M13.4619 20.4619C9.58499 20.4619 6.46191 17.3388 6.46191 13.4619C6.46191 9.58499 9.58499 6.46191 13.4619 6.46191C17.3388 6.46191 20.4619 9.58499 20.4619 13.4619C20.4619 17.3388 17.3388 20.4619 13.4619 20.4619ZM13.4619 8.40038C10.6619 8.40038 8.40038 10.6619 8.40038 13.4619C8.40038 16.2619 10.6619 18.5235 13.4619 18.5235C16.2619 18.5235 18.5235 16.2619 18.5235 13.4619C18.5235 10.6619 16.2619 8.40038 13.4619 8.40038Z"
                      fill="#C1BEBE"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
          <div className="child-bar addPopup">
            <h3 className="d-flex align-items-center justify-content-between sofia-semibold mb-3">
              {this.props.sidebarTitle}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => this.isShowProjectPopup(true)}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.6619 7.60574C14.6622 7.69072 14.6457 7.77493 14.6134 7.85353C14.5811 7.93213 14.5336 8.00358 14.4736 8.0638C14.4136 8.12401 14.3423 8.1718 14.2639 8.20443C14.1854 8.23706 14.1013 8.25389 14.0163 8.25395L1.22406 8.27954C1.05249 8.27988 0.887806 8.21205 0.766242 8.09098C0.644678 7.9699 0.576191 7.80549 0.575847 7.63391C0.575504 7.46234 0.643333 7.29766 0.764411 7.17609C0.88549 7.05453 1.0499 6.98604 1.22147 6.9857L14.0137 6.96011C14.0987 6.95983 14.1829 6.97632 14.2615 7.00864C14.3401 7.04096 14.4115 7.08846 14.4717 7.14843C14.532 7.20841 14.5798 7.27967 14.6124 7.35814C14.645 7.43661 14.6618 7.52075 14.6619 7.60574Z"
                  fill="#0C1826"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.60503 0.577036C7.52004 0.577099 7.43591 0.593927 7.35743 0.626557C7.27896 0.659186 7.2077 0.706977 7.14773 0.767191C7.08775 0.827404 7.04025 0.898858 7.00793 0.97746C6.97562 1.05606 6.95912 1.14027 6.9594 1.22525L6.98499 14.0175C6.98533 14.189 7.05382 14.3535 7.17539 14.4745C7.29695 14.5956 7.46163 14.6634 7.63321 14.6631C7.80478 14.6628 7.96919 14.5943 8.09027 14.4727C8.21135 14.3511 8.27918 14.1865 8.27883 14.0149L8.25324 1.22266C8.25318 1.13768 8.23635 1.05354 8.20372 0.975068C8.17109 0.896597 8.1233 0.825333 8.06309 0.76536C8.00288 0.705387 7.93142 0.657881 7.85282 0.625566C7.77422 0.59325 7.69001 0.576759 7.60503 0.577036Z"
                  fill="#0C1826"
                />
              </svg>
              <CreateProject
                showModalPopup={this.state.showProjectModalPopup}
                onPopupClose={this.isShowProjectPopup}
                onOpenImport={this.isShowImportPopup}
                onProjectCreateSubmit={this.props.onProjectCreateSubmit}
                projectName={this.props.projectName}
                setProject={this.props.setProject}
                errors={this.props.errors}
              />
              <ImportProjectModal
                showModalPopup={this.state.showImportModalPopup}
                onPopupClose={this.isShowImportPopup}
              />
              <ArchiveModal
                showModalPopup={this.state.showArchiveModalPopup}
                onPopupClose={this.isArchiveProjectModal}
              />
              <DeleteProjectModal 
                showModalPopup={this.state.showDeleteModalPopup}
                onPopupClose={this.isDeleteProjectModal}
              />
              <ProjectRenameModal
                showModalPopup={this.state.showRenameModalPopup}
              />
            </h3>
            <ul className="list-unstyled child-bar-list">
              {typeof this.props.sidebar.sidebarSubTitle != "undefined"
                ? this.props.sidebar.sidebarSubTitle.map((sub, index_p) => (
                    <li key={"menu_p" + index_p}>
                      <div className="child-bar-list-item d-flex align-items-center justify-content-between">
                        <Link
                          to={sub.link}
                          className={
                            window.location.pathname === "/" + sub.link
                              ? "active"
                              : null
                          }
                        >
                          {sub.name}
                        </Link>
                        <Dropdown>
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
                              <circle
                                cx="15.6752"
                                cy="2.72402"
                                r="2.475"
                                fill="#DBDBDB"
                              />
                            </svg>
                          </Dropdown.Toggle>

                          <Dropdown.Menu align="right">
                            <Dropdown.Item onClick={this.isRenameProjectModal}>
                              Rename
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              New Project
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              New Programme
                            </Dropdown.Item>
                            <Dropdown.Item onClick={this.isArchiveProjectModal}>
                              Archive
                            </Dropdown.Item>
                            <Dropdown.Item onClick={this.isDeleteProjectModal}>
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      {sub.children ? (
                        <ul className="list-unstyled">
                          {sub.children.map((child, index_c) => (
                            <li key={"menu_c" + index_c}>
                              <div className="d-flex align-items-center justify-content-between">
                                <Link to="">{child.name}</Link>
                                <Dropdown>
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
                                      <circle
                                        cx="15.6752"
                                        cy="2.72402"
                                        r="2.475"
                                        fill="#DBDBDB"
                                      />
                                    </svg>
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu align="right">
                                    <Dropdown.Item onClick={this.isRenameProjectModal}>
                                      Rename
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">
                                      New Project
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      New Programme
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={this.isArchiveProjectModal}>
                                      Archive
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={this.isDeleteProjectModal}>
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
export default Sidebar;