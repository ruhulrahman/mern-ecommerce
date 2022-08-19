import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions';

const Header = (props) => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()


  const userLogout = () => {
    console.log('hit logout')
    dispatch(logout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <span className='nav-link hand' onClick={userLogout}>Logout</span>
      </Nav>
    )
  }

  const renderNotLoggedInLinks = () => {
    return (
      <Nav>
        <NavLink to='/signin' className='nav-link'>Sign In</NavLink>
        <NavLink to='/signup' className='nav-link'>Sign Up</NavLink>
      </Nav>
    )
  }

  return(
    <Navbar bg="dark" variant="dark" expand="lg" style={{ zIndex: '1' }} className="fixed-top">
      <Container>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <NavLink to='/' className='navbar-brand'>Admin Dashboard</NavLink>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className='nav-link'>Home</NavLink>
          </Nav>
          {
            auth.authenticate ? renderLoggedInLinks() : renderNotLoggedInLinks()
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
   )
 }

 export default Header