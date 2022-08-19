import React from 'react'
import { Col, Container, Row  } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import Header from '../Header';
import MenuHeader from '../MenuHeader';

const Layout = (props) => {
  return(
    <>
        <Header/>
        <MenuHeader/>
        {
          props.children
        }
    </>
   )
 }

 export default Layout