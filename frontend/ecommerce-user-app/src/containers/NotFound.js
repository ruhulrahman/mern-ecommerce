import React from 'react'
import { Alert  } from 'react-bootstrap'
import Layout from '../components/Layout'

const NotFound = (props) => {
  return(
    <Layout>
        <Alert variant='secondary' className='p-5 m-5'>
            <h1 className='text-center text-danger'>404</h1>
            <h5 className='text-danger text-center'>Page Not Found</h5>
        </Alert>
    </Layout>
   )

 }

 export default NotFound