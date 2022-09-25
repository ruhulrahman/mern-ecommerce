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
import { addPage, getPages } from '../../actions/page.actions';
import { CirclesWithBar } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const NewPage = (props) => {
  const dispatch = useDispatch()
  const page = useSelector(state => state.page)

  const [show, setShow] = useState(false)
  const [categories, setCategories] = useState([])
  
  const [categoryId, setCategoryId] = useState(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [type, setType] = useState('')
  const [banners, setBanners] = useState([])
  const [products, setProducts] = useState([])

  
  const clearFormData = () => {
    setCategoryId(null)
    setTitle('')
    setDesc('')
    setType('')
    setBanners([])
    setProducts([])
  }
  
  const category = useSelector(state => state.category)
  
  useEffect(() => {
    setCategories(linearCategory(category.categories))
    // dispatch(getPages())
  }, [category])

  // console.log({categories})
  

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true)

  const saveNewPage = (event) => {
    event.preventDefault()
    console.log('categoryId', categoryId)

    const formData = new FormData()
    formData.append('categoryId', categoryId ? categoryId.value : '')
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
    if (!page.loading) {
      closeModal()
      clearFormData()
    }
  }

  const onChangeCategory = (e) => {
    console.log('e.value', e.value)
    console.log('categories', categories)
    setCategoryId(e)
    const category = categories.find(item => item.id === e.value)
    if (category) {
      if (category.type) {
        console.log('category.type', category.type)
        setType(category.type)
      }
    }
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
 
        {
          page.loading ?
          <CirclesWithBar
            className="text-center"
            height = "80"
            width = "80"
            radius = "9"
            color = 'green'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
          />
          : ''
        }
        <Form.Label>Category</Form.Label>
        <Select placeholder="Select Category" className="mb-3" value={categoryId} onChange={onChangeCategory} options={categories} />
        {/* <Select placeholder="Select Category" className="mb-3" value={categoryId} onChange={setCategoryId} options={categories} /> */}
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
        {
          page.loading ? 
          <CirclesWithBar
            className="text-center"
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel='circles-with-bar-loading'
          />
          :
          renderPageModal()
        }
        {/* {renderPageModal()} */}

      </Container>
    </Layout>
  )

}

export default NewPage