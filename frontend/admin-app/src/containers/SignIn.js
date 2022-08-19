import React, { useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { NavLink, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Input from '../components/UI/Input'
import { login } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

const SignIn = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState('')

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const userLogin = (event) => {
    event.preventDefault()
    
    const user = { email, password }
    dispatch(login(user))
  }

  if (auth.authenticate) {
    return <Navigate to='/' rereplace={true}/>
  }

  if (auth.authenticating) {
    return <p>Loading ....</p>
  }

  return(
    <Layout>
      <Container className='mt-3'>
        <Row className="justify-content-md-center">
          <Col md='6' className='mt-5'>
            <Form onSubmit={ userLogin }>
            
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" errorMsg=""/>
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" errorMsg=""/>

              <Button variant="primary" type="submit">
                Sign In
              </Button>
              <p>Don't have an account? Please <NavLink to='/signup'>Sign Up</NavLink></p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
   )

 }

 export default SignIn