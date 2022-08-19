import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
      logout({
        returnTo: window.location.origin,
      });

  const logo = require('./../assets/logo-square.jpg');

  return (
      <div className="nav-container">
        <Navbar color="light" light expand='md'>
          <Container style={{maxWidth: '1800px'}}>
            <div style={{marginRight: '1em'}}>
              <span style={{padding: '7px'}}>The Divine Canine - Admin</span>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink style={{paddingTop: '5px'}}
                           tag={RouterNavLink}
                           to="/"
                           exact
                           activeClassName="router-link-exact-active"
                  >
                    Home
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
              </Nav>
              <Nav className="d-none d-md-block" navbar>
                {!isAuthenticated && (
                    <NavItem>
                      <Button
                          id="qsLoginBtn"
                          color="primary"
                          className="btn-margin"
                          onClick={() => loginWithRedirect()}
                      >
                        Log in
                      </Button>
                    </NavItem>
                )}
                {isAuthenticated && (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret id="profileDropDown">
                        <img
                            src={logo}
                            alt="Profile"
                            className="nav-user-profile rounded-circle"
                            width="50"
                        />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>{user.name}</DropdownItem>
                        {/*<DropdownItem*/}
                        {/*  tag={RouterNavLink}*/}
                        {/*  to="/profile"*/}
                        {/*  className="dropdown-profile"*/}
                        {/*  activeClassName="router-link-exact-active"*/}
                        {/*>*/}
                        {/*  <FontAwesomeIcon icon="user" className="mr-3" /> Profile*/}
                        {/*</DropdownItem>*/}
                        <DropdownItem
                            id="qsLogoutBtn"
                            onClick={() => logoutWithRedirect()}
                        >
                          <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                          out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
  );
};

export default NavBar;
