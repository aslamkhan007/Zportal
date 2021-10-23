import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";

class ImportProjectModal extends Component {
  

  handleClose = () => {
    this.props.onPopupClose(false);
  }
  render(){
    return (
      <>
        <Modal className="basic-Modals importProjectModal" show={this.props.showModalPopup} onHide={this.handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>
                <h4 className="text-center">Choose a Option to Import From</h4>
                <svg width="19" height="6" viewBox="0 0 19 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="2.475" cy="2.72402" rx="2.475" ry="2.475" fill="#DBDBDB" />
                  <ellipse cx="9.07559" cy="2.72402" rx="2.475" ry="2.475" fill="#DBDBDB" />
                  <circle cx="15.6752" cy="2.72402" r="2.475" fill="#DBDBDB" />
                </svg>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="createProject-form">
                <form>
                    <div className="importCard_list">
                      <div className="importCard">
                        <img src="https://wac-cdn.atlassian.com/dam/jcr:9e1841b9-2557-4eb2-ab47-d92428580b02/Jira%20Software@2x-blue.png" alt="Jira"  />
                      </div>
                      <div className="importCard">
                        <img src="https://clickup.com/landing/images/brand-assets/logo-color-transparent.svg" alt="Jira"  />
                      </div>
                      <div className="importCard">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png" alt="Jira"  />
                      </div>
                      <div className="importCard">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Large-monday_black_whiteBG-left.png" alt="Jira"  />
                      </div>
                      <div className="importCard">
                        <img src="https://www.vippng.com/png/full/21-210603_ms-excel-transparent-microsoft-excel-png.png" alt="Jira"  />
                      </div>
                      <div className="importCard">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Todoist_logo.png" alt="Jira"  />
                      </div>
                      <div className="importCard">
                        <img src="https://bridge24.com/wp-content/uploads/2019/11/basecamp-2019-logo.png" alt="Jira"  />
                      </div>
                      <div className="importCard">
                        <img src="https://financesonline.com/uploads/2020/06/vp12e25e1e187a145330a6ee3e33f0d366.png" alt="Jira"  />
                      </div>
                      <div className="importCard downloadCSV">
                        <h4>Download template csv to import</h4>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Microsoft_Excel_2013-2019_logo.svg/110px-Microsoft_Excel_2013-2019_logo.svg.png" alt="Jira"  />
                      </div>
                    </div>
                    <div className="field-group-action justify-content-center">
                        <button type="text" className="outlineButton big">Import</button>
                    </div>
                </form>
              </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ImportProjectModal