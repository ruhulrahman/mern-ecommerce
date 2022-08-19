import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { NavLink, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Input from '../components/UI/Input'
import { signup } from '../actions'

const SignUp = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const userSignup = (event) => {

    event.preventDefault()
    
    const user = { firstName, lastName, email, password }
    dispatch(signup(user))
  }

  if (auth.authenticate) {
    return <Navigate to='/'/>
  }

  if (user.loading) {
    return <p>Loading ....</p>
  }

  if (user.success) {
    return <Navigate to='/signin'/>
  }


  return(
    <Layout>
      <Container className='mt-3'>
        <Row className="justify-content-md-center">
          <Col md='6' className='mt-5'>
            { user.message }
            <Form onSubmit={userSignup}>
              <Row>
                <Col md="6">
                  <Input label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" errorMsg=""/>
                </Col>
                <Col md="6">
                  <Input label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" errorMsg=""/>
                </Col>
              </Row>
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" errorMsg=""/>
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" errorMsg=""/>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              <p>Have an account? Please <NavLink to='/signin'>Sign In</NavLink></p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
   )

 }

 export default SignUp