import React from "react";
import {ListGroup, Navbar, Container, Nav, Button } from 'react-bootstrap'
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

export function Menubar({user}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self')
  }

  const isAuth = () => {
    if(typeof window == 'undefined') {
      return false;
    }
    if(localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  }
    
  return (
    <Navbar className="main-nav" sticky='top'>
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">myFilms</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="ml-auto" >
              {isAuth() && (<Nav.Link href={`/users/${user}`}>{user}</Nav.Link>)}
              {isAuth() && (<Button variant='link' onClick={() => {this.onLoggedOut()}}>logout</Button>)}
              {!isAuth() && (<Nav.Link href="/">sign-in</Nav.Link>)}
              {!isAuth() && (<Nav.Link href="/register">sign-up</Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
    
}