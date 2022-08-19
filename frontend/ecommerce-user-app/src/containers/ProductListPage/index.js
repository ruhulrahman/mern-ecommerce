import React, { useEffect } from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductsBySlug } from '../../actions'
import Layout from '../../components/Layout'
import './style.css'

export const ProductListPage = (props) => {
    const dispatch = useDispatch()
    const { slug } = useParams()
    useEffect(() => {
        dispatch(getProductsBySlug(slug))
    }, [])
  return(
    <Layout>
        <Container fluid>
            <Row className='mt-3'>
                <Col>
                    <Card>
                        <Card.Header as="h5"><Card.Title>Special title treatment</Card.Title></Card.Header>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </Layout>
   )

 }