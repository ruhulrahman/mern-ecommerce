import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import Select from 'react-select';
import Layout from '../../components/Layout'
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import MyModal from "../../components/UI/MyModal";
import Input from "../../components/UI/Input";
import InputFile from "../../components/UI/InputFile";
import { useDispatch, useSelector } from 'react-redux';
import linearCategory from '../../helpers/linearCategory';
import { addPage } from '../../actions/page.actions';


const NewPage = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [categories, setCategories] = useState([])
  
  const [categoryId, setCategoryId] = useState(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [type, setType] = useState('')
  const [banners, setBanners] = useState([])
  const [products, setProducts] = useState([])
  
  const category = useSelector(state => state.category)
  
  useEffect(() => {
    setCategories(linearCategory(category.categories))
  }, [category])

  // console.log({categories})
  

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const saveNewPage = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('categoryId', categoryId)
    formData.append('title', title)
    formData.append('desc', desc)
    formData.append('type', type)
    banners.forEach(banner => {
      formData.append('banners', banner)
    })
    products.forEach(product => {
      formData.append('products', product)
    })

    dispatch(addPage(formData))
    closeModal()
  }

  const onChangeCategory = (e) => {
    const category = categories.find(item => item.id === e.value)
    if (category) {
      if (category.type) {
        setType(category.type)
      }
    }
    setCategoryId(e.value)
  }

  const handleBannerImage = (e) => {
    console.log('e.target.files[0]', e.target.files[0])
    setBanners([
      ...banners,
      e.target.files[0]
    ])
  }

  const handleProductImage = (e) => {
    console.log('e.target.files[0]', e.target.files[0])
    setProducts([
      ...products,
      e.target.files[0]
    ])
  }

  const renderPageModal = () => {
    return (

      <MyModal modalTitle="Create New Page" show={show} closeModal={closeModal} handleClose={saveNewPage}>

        <Form.Label>Category</Form.Label>
        <Select placeholder="Select Category" className="mb-3" value={categoryId} onChange={onChangeCategory} options={categories} />
        <Input label="Page Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter page title" errorMsg="" />
        <Input label="Description" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter page description" errorMsg="" />
        {
            banners.length > 0 ? 
            banners.map((banner, index) => 
                <Row key={index}>
                    <Col>{banner.name}</Col>
                </Row>
            ) : null
        }
        <Input label="Upload Banner Image" type="file" name="banners" onChange={handleBannerImage} errorMsg="" />

        {
            products.length > 0 ? 
            products.map((product, index) => 
                <Row key={index}>
                    <Col>{product.name}</Col>
                </Row>
            ) : null
        }
        <Input label="Upload Product Image" type="file" name="products" onChange={handleProductImage} errorMsg="" />

      </MyModal>
    )
  }

  return (
    <Layout sidebar>

      <Container>
        <Row className="mt-3">
          <Col md={6}>
            <h3 className="font-size-40 text-purple">Page</h3>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={showModal}>Create New Page</Button>
          </Col>
        </Row>

        {renderPageModal()}

      </Container>
    </Layout>
  )

}

export default NewPage