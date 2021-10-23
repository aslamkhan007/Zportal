import React, { Component, Fragment, useState } from 'react';

import { Modal, Form, Button, Dropdown } from 'react-bootstrap';
import ShortIconn from './../../assets/images/iocn_toggle.png';
import Jira from "../../assets/images/jira.png";
import clickup from "../../assets/images/clickup.png";
import trello from "../../assets/images/trello.png";
import asana from "../../assets/images/asana.png";
import line_center from "../../assets/images/line_center.png";
import Topbar from "./../../components/Common/Topbar";

class ModalPopup extends Component {
  constructor() {
    super();
    this.state = {
      showModalPopup: false,
      count:1
    }
  }
  isShowPopup = (status) => {
    this.setState({ showModalPopup: status });
  };
  handleClose = () => {
    this.props.onPopupClose(false);
  }

  
  updateContent = e => {
    
    const count = this.state.count;
    this.setState({ count: count + 1, showModalPopup: false, });
    
    if (count > 0) {
      this.setState({
        data: (
          <Modal show={this.props.showModalPopup} className="import_mein" onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <div className="step_second">
              <p>The popup is created by the website you are importing from So we'll have to create our own when we want to start importang to other websites</p>
              
            </div>
            <div className="Next_import"><button onClick={this.updateContent}>Next</button></div>
          </Modal>

        )
      });
    }
    if (count > 1) {
      this.setState({
        data: (
          <Modal show={this.props.showModalPopup} className="import_mein third_dot" onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
              <Modal.Title id="sign-in-title row import_header">
                <div className="Import_simport">Import</div>
                <div className="Import_step">Step3</div>
                <div class="slider_dots">
                  <a href="#" className="slider__dot dot0" data-pos="0"></a>
                  <a href="#" className="slider__dot dot1" data-pos="1"></a>
                  <a href="#" className="slider__dot dot2" data-pos="2"></a>
                  <a href="#" className="slider__dot dot3" data-pos="3"></a>
                  <a href="#" className="slider__dot dot4" data-pos="4"></a>
                </div>
                <div className="middle_line"></div>
              </Modal.Title>
            </Modal.Header>
            <div className="third_second">

              <h3>Choose a project or boards to import from</h3>
              <div className="mein_checkbox">
                <label className="container">
                  <input type="checkbox" checked="checked" />
                  <span className="checkmark"></span>
                  <span className="name_label">NAME</span>
                </label>
                <label className="container">
                  <input type="checkbox" checked="checked" />
                  <span className="checkmark1"></span>
                  <span className="name_label">NAME</span>
                </label>
                <label className="container">
                  <input type="checkbox" checked="checked" />
                  <span className="checkmark1"></span>
                  <span className="name_label">NAME</span>
                </label>
                <label className="container">
                  <input type="checkbox" checked="checked" />
                  <span className="checkmark"></span>
                  <span className="name_label">NAME</span>
                </label>
              </div>
              <div className="Next_import"><button onClick={this.updateContent}>Next</button></div>
            </div>
          </Modal>
        )
      });
    }

    if (count > 2) {
      this.setState({
        data: (
          <Modal show={this.props.showModalPopup} className="import_mein four_dot" onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
              <Modal.Title id="sign-in-title row import_header">
                <div className="Import_simport">Import</div>
                <div className="Import_step">Step4</div>
                <div class="slider_dots">
                  <a href="#" className="slider__dot dot0" data-pos="0"></a>
                  <a href="#" className="slider__dot dot1" data-pos="1"></a>
                  <a href="#" className="slider__dot dot2" data-pos="2"></a>
                  <a href="#" className="slider__dot dot3" data-pos="3"></a>
                  <a href="#" className="slider__dot dot4" data-pos="4"></a>
                </div>
                <div className="middle_line"></div>
              </Modal.Title>
            </Modal.Header>
            <div className="four_second">

              <h3>Choose which statues to migrate over</h3>
              <div className="mein_checkbox">
                <label className="container">
                  <input type="checkbox" checked="checked" />
                  <span className="checkmark"></span>
                  <span className="name_label">NAME</span>
                </label>
                <label className="container">
                  <input type="checkbox" checked="checked" />
                  <span className="checkmark1"></span>
                  <span className="name_label">NAME</span>
                </label>
                <label className="container">
                  <input type="checkbox" checked="checked" />
                  <span className="checkmark1"></span>
                  <span className="name_label">NAME</span>
                </label>
                <label className="container">
                  <input type="checkbox" checked="checked" />
                  <span className="checkmark"></span>
                  <span className="name_label">NAME</span>
                </label>
              </div>

              <div className="line_center"><img src={line_center} /></div>

              <div className="mein_right_dropdown">
                <label>BACKLOG<span></span></label>
                <label>BACKLOG<span></span></label>
                <label className="Yellow">THIS SPRINT<span></span></label>
                <label className="Yellow">BACKLOG<span></span></label>
                <label className="blue">IN PROGRESS<span></span></label>
                <label className="blue">IN PROGRESS<span></span></label>
                <label className="orange">IN REVIEW<span></span></label>
                <label className="orange">IN REVIEW<span></span></label>
                <label className="red">BLOCKED<span></span></label>
                <label className="red">BLOCKED<span></span></label>
                <label className="green">COMPLETE<span></span></label>
                <label className="green">DONE<span></span></label>
              </div>
              <div className="Next_import"><button onClick={this.updateContent}>Next</button></div>

            </div>
          </Modal>
        )
      });
    }
    
    if (count > 3) {
      
      this.setState({
        
        data: (
          
          <Modal show={this.props.showModalPopup} className="import_mein five_dot" onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
              <Modal.Title id="sign-in-title row import_header">
                <div className="Import_simport">Import</div>
                <div className="Import_step">Step 5</div>
                <div class="slider_dots">
                  <a href="#" className="slider__dot dot0" data-pos="0"></a>
                  <a href="#" className="slider__dot dot1" data-pos="1"></a>
                  <a href="#" className="slider__dot dot2" data-pos="2"></a>
                  <a href="#" className="slider__dot dot3" data-pos="3"></a>
                  <a href="#" className="slider__dot dot4" data-pos="4"></a>
                </div>
                <div className="middle_line"></div>
              </Modal.Title>
            </Modal.Header>
            <div className="step_second">
              <p>Thanks for that! We'll take over importing from here.<br></br>You can either close this window, or click the button below to take you to the Import area of the Setting page to track the progress of your import!</p>

              <p></p>
            </div>
            <div className="Next_import"><button onClick={this.updateContent}>Track Progress</button></div>
            
          </Modal>
        )
      });
      this.props.onPopupClose(false);
    }
    

  }


  render() {
    // console.log(this.state.data);
    return (
      <Fragment>
        {
          this.state && typeof (this.state.data) === "undefined" ? (

            <Modal show={this.props.showModalPopup} className="import_mein first_dot" onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
              <Modal.Header closeButton>
                <Modal.Title id="sign-in-title row import_header">
                  <div className="Import_simport">Import</div>
                  <div className="Import_step">Step2</div>
                  <div class="slider_dots">
                    <a href="#" className="slider__dot dot0" data-pos="0"></a>
                    <a href="#" className="slider__dot dot1" data-pos="1"></a>
                    <a href="#" className="slider__dot dot2" data-pos="2"></a>
                    <a href="#" className="slider__dot dot3" data-pos="3"></a>
                    <a href="#" className="slider__dot dot4" data-pos="4"></a>
                  </div>
                  <div className="middle_line"></div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="import_popup row">
                <div className="Import_choose">
                  <label>Choose a option to import from</label>
                  <img className="img_first" src={Jira} />
                  <img src={clickup} />
                  <img src={trello} />
                  <img src={asana} />
                  <img src={Jira} />
                  <img src={clickup} />
                  <img src={asana} />
                  <img src={Jira} />
                  <img src={clickup} />
                </div>
                <div className="Next_import"><button onClick={this.updateContent}>Import</button></div>

              </Modal.Body>
            </Modal >

          ) : <span>
            {this.state.data}
          </span>
        }
      </Fragment >







    );
  }
}
export default (ModalPopup);