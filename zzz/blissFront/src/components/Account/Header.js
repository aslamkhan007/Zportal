import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import blissLogo from './../../assets/images/bliss-logo.svg';
import * as CONFIG from '../../config.json'
import {Link} from 'react-router-dom'
import './Header.scss';
const Header = () => {
  const [logoUrl, setLogoUrl] = useState("");
  useEffect(() => {
    // setLogo()
  }, []);

  const setLogo = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.profile_img) {
      setLogoUrl(`${CONFIG.API_URL}/uploads/profile/${user.profile_img}`)
    } else {
      setLogoUrl(blissLogo)
    }
  }


  return (
    <React.Fragment>
      <Navbar bg="white" expand="lg" className="auth-header position-fixed">
        <Container fluid>
          <Link to={'/'} className="me-auto">
            <img src={blissLogo} alt="" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Help</Nav.Link>
              <Nav.Link href="#link">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )

}
export default Header;