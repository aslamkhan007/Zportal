import React, { Component } from 'react';
import { Form, Table } from 'react-bootstrap';
import ShortIcon from './../../assets/images/ShortIcon.svg';

class ProjectRaid extends Component {
  render() {
    return (
      <>
        <div className="text-end mb-3">
          <button className="bg-transparent border-0 px-2">
            Group
            <img className="ms-1" src={ShortIcon} alt="" />
          </button>
          <button className="bg-transparent border-0 px-2">
            Sort
            <img className="ms-1" src={ShortIcon} alt="" />
          </button>
          <button className="bg-transparent border-0 px-2">
            Subtask
            <img className="ms-1" src={ShortIcon} alt="" />
          </button>
          <button className="bg-transparent border-0 px-2">
            Filter
            <img className="ms-1" src={ShortIcon} alt="" />
          </button>
          <button className="bg-transparent border-0 px-2">
            More +
          </button>
        </div>
        <div className="table-wrap">
          <Table className="custom-table mb-0">
            <thead>

              <tr>
                <td>
                  <h3 className="ps-4">RISKS</h3>
                </td>
                <td className="text-center lh-1 fs-10" style={{ width: "110px" }}>
                  Description
                  <img className="ms-1" src={ShortIcon} alt="" />
                </td>
                <td className="text-center lh-1 fs-10" style={{ width: "58px" }}>
                  Risk
                  <br/>Rating
                  <img className="ms-1" src={ShortIcon} alt="" />
                </td>
                <td className="text-center lh-1 fs-10" style={{ width: "110px" }}>
                  Mitigating Action
                  <img className="ms-1" src={ShortIcon} alt="" />
                </td>
                <td className="text-center lh-1 fs-10" style={{ width: "110px" }}>
                  Assignee
                  <img className="ms-1" src={ShortIcon} alt="" />
                </td>
                <td className="text-center lh-1 fs-10" style={{ width: "110px" }}>
                  Priority
                  <img className="ms-1" src={ShortIcon} alt="" />
                </td>
                <td className="text-center lh-1 fs-10" style={{ width: "110px" }}>
                  Status
                  <img className="ms-1" src={ShortIcon} alt="" />
                </td>
                <td className="text-center lh-1 fs-10" style={{ width: "110px" }}>
                  Linked Ticket
                  <img className="ms-1" src={ShortIcon} alt="" />
                </td>
                
              </tr>

            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Check type="checkbox" id="check2" className="custom-check pe-2 d-inline-block">

                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>1056-015 - Propsal gets rejected by architect or local authority
                    </Form.Check.Label>
                  </Form.Check>
                  
                </td>
                <td className="lh-1 fs-10">
                  Initial build proposal gets
                  <br/>rejected for any reason as ou...
                </td>
                <td className="px-0">
                  <span class="badge rounded-0 bg-primary" style={{ width: "58px" }}>15</span>
                </td>
                <td className="lh-1 fs-10">
                  Work within company and<br/>regulartory guildines 
                </td>
                <td className="text-center">
                  <span className="name-badge sm bg-pink d-inline-flex align-items-center justify-content-center">HT</span>
                </td>
                <td className="text-center">
                  <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2.5" y1="-2.18557e-08" x2="2.5" y2="17" stroke="#FA6164" />
                    <path d="M11 5.5L2.75 10.2631L2.75 0.73686L11 5.5Z" fill="#FA6164" />
                  </svg>
                </td>
                <td className="px-0">
                  <span class="badge rounded-0 bg-royal">IN-PROGRESS</span>
                </td>
                <td className="text-center">
                  1056-003
                </td>
                
              </tr>
            </tbody>
          </Table>
          <button className="bg-transparent border-0 px-3 py-2">Add Risk</button>
        </div>
        

      </>
    )
  }
}
export default ProjectRaid;