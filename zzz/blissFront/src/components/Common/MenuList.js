import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';


const MenuList = (props) => {
  return (
    <>
      <li className="active">
        <div className="child-bar-list-item d-flex align-items-center justify-content-between">
          <a href="">
            {props.MenuTitle}
          </a>
          <svg width="19" height="6" viewBox="0 0 19 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="2.475" cy="2.72402" rx="2.475" ry="2.475" fill="#DBDBDB" />
            <ellipse cx="9.07559" cy="2.72402" rx="2.475" ry="2.475" fill="#DBDBDB" />
            <circle cx="15.6752" cy="2.72402" r="2.475" fill="#DBDBDB" />
          </svg>
        </div>

      </li>
    </>
  )
}


export default MenuList;