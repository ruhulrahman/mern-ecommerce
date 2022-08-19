import React from 'react'
import { Alert  } from 'react-bootstrap'
import Layout from '../../components/Layout'
import '../style.css'

const Orders = (props) => {
  return(
    <Layout sidebar>
      
        <Alert variant='secondary' className='p-5 m-5'>
            <h1 className='text-center'>Welcome to Orders</h1>
        </Alert>
    </Layout>
   )

 }

 export default Orders