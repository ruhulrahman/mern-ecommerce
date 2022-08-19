import React from 'react'
import { Alert  } from 'react-bootstrap'
import Layout from '../components/Layout'
import './style.css'

const Home = (props) => {
  return(
    <Layout sidebar>
      
        <Alert variant='secondary' className='p-5 m-5'>
            <h1 className='text-center'>Welcome to Admin Dashboard</h1>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid.
            </p>
        </Alert>
    </Layout>
   )

 }

 export default Home