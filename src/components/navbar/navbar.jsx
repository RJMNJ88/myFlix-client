import React from "react";
import {ListGroup, Navbar, Container, Nav, Button } from 'react-bootstrap'
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

import './navbar.css'

export function NavView({user}) {

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
    <Navbar className="main-nav" fixed='top'>
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">myFilms</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="links ml-auto" >
              {isAuth() && (<Nav.Link className="user-btn" href={`/users/${user}`}>{user}</Nav.Link>)}
              {isAuth() && (<Button className="logout-btn" variant='btn' onClick={() => {this.onLoggedOut()}}>logout</Button>)}
              {!isAuth() && (<Nav.Link href="/">sign-in</Nav.Link>)}
              {!isAuth() && (<Nav.Link href="/register">sign-up</Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
    
}