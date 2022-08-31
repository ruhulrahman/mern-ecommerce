import React from 'react'
import { Col, Container, Row  } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import Header from '../Header';

const Layout = (props) => {
  return(
    <>
        <Header/>
        {
          props.sidebar ? 
          <Container fluid>
            <Row>
              <Col md={2} className="sidebar pe-0">
              Menus
                <ul>
                  <li><NavLink to='/' className='nav-link'>Home</NavLink></li>
                  <li><NavLink to='/page' className='nav-link'>Page</NavLink></li>
                  <li><NavLink to='/category' className='nav-link'>Category</NavLink></li>
                  <li><NavLink to='/products' className='nav-link'>Products</NavLink></li>
                  <li><NavLink to='/orders' className='nav-link'>orders</NavLink></li>
                </ul>
              </Col>
              <Col md={10} className="ms-auto mt-5">
              { props.children }
              </Col>
            </Row>
          </Container>
          :
          props.children
        }
    </>
   )
 }

 export default Layout