import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Button, Col, Container, Row, Form, Table  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProduct } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import InputFile from "../../components/UI/InputFile";
import "../style.css";
import MyModal from "../../components/UI/MyModal";

const Products = (props) => {
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // console.log('product.products', product.products)

  // useEffect(() => {
  //   dispatch(getProduct())
  // }, []);

  const createCateogryList = (categories, options = []) => {
    categories.forEach(item => {
        options.push({
            value: item._id,
            id: item._id,
            name: item.name,
            label: item.name,
        })
        if (item.children.length > 0) {
            createCateogryList(item.children, options)
        }
    })
    return options
  }


  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [productImages, setProductImages] = useState([])
  const [quantity, setQuantity] = useState('')
  const [categoryId, setCategoryId] = useState(null)
  const [productDetailsModal, setProductDetailsModal] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  
  const [show, setShow] = useState(false)
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const saveData = (event) => {
    event.preventDefault()
    console.log('productImages', productImages)

    const formData = new FormData()
    formData.append('name', productName)
    formData.append('price', price)
    formData.append('description', description)
    // formData.append('productImages', productImages)
    formData.append('quantity', quantity)
    formData.append('categoryId', categoryId ? categoryId.value : '')

    productImages.forEach(picture => {
      formData.append('productImages', picture)
    });

    dispatch(addProduct(formData))
    clearFormData()

    setShow(false)

  }

  const clearFormData = () => {
    setProductName('')
    setPrice('')
    setDescription('')
    setProductImages([])
    setQuantity('')
    setCategoryId(null)
  }

  const categoryList = createCateogryList(category.categories).map(item => {
    return {
        value: item.value,
        label: item.name,
    }
  })

  const handleProductImage = (e) => {
    console.log('e.target', e)
    setProductImages([
      ...productImages,
      e.target.files[0]
    ])
  }

  const renderProducts = () => {
    return (
      <Table responsive hover style={{ fontSize: '13px' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Price</th>
            {/* <th>Description</th> */}
            <th>Quantity</th>
            {/* <th>Images</th> */}
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length ? 
            product.products.map((item, index) => 
              <tr key={item._id} onClick={() => showProductDetailsModal(item)}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.price}</td>
                {/* <td>{item.description}</td> */}
                <td>{item.quantity}</td>
                {/* <td>
                  {
                    item.productImages && item.productImages.length ?
                    item.productImages.map((image, imgIndex) => 
                        image.img ? 
                        <div className="mb-1" key={image._id}>
                          <img src={image.img} alt={'Product Image'} width={70} height={70}/><br/>
                        </div> : null
                    )
                    : null
                  }
                </td> */}
                <td>{item.category ? item.category.name : ''}</td>
              </tr>
            )
            : null
          }
        </tbody>
      </Table>
    )
  }

  const renderAddProductModal = () => {
    return (
      
      <MyModal size="lg" modalTitle="Add New Product" show={show} closeModal={closeModal} handleClose={saveData}>
        <Row>
            <Col>
              <Input label="Product Name" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" errorMsg=""/>
              <Input label="Product price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" errorMsg=""/>
              <Input label="Product description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" errorMsg=""/>
            </Col>
            <Col>
              <Input label="Product quantity" type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter quantity" errorMsg=""/>
              <Form.Label>Category</Form.Label>
              <Select placeholder="Select Category" className="mb-3" defaultValue={categoryId} onChange={setCategoryId} options={categoryList}/>

              {
                productImages.length > 0 ?
                productImages.map((picture, index) => 
                  <div key={index}>
                    <p>{ JSON.stringify(picture.name) }</p>
                  </div>
                )
                :
                null
              }
              <input type="file" name="productImages" onChange={handleProductImage}/>
              {/* <InputFile label="Upload Image" type="file" name="productImages" onChange={handleProductImage} errorMsg=""/> */}
            </Col>
          </Row>
      </MyModal>
    )
  }

  const showProductDetailsModal = (product) => {
    // console.log('product === ', product)
    setProductDetails(product)
    setProductDetailsModal(true)
  }
  const closeProductDetailsModal = () => {
    setProductDetailsModal(false)
  }

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <MyModal size="lg" modalTitle="Product Details" show={productDetailsModal} saveBtnHide={true} closeModal={closeProductDetailsModal} handleClose={saveData}>
        <Row>
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md={6}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category ? productDetails.category.name : ''}</p>
          </Col>
        </Row>
        <Row>
          <label className="key mb-1">Product Images</label>
          <Col className="d-flex">
            {
              productDetails.productImages && productDetails.productImages.length > 0 ?
              productDetails.productImages.map(image => 
                  
                  <div className="mb-1 me-2 d-flex" key={image._id}>
                  { 
                    image.img ? 
                    <img src={image.img} alt={image.img} width={250} />
                    : null 
                  }
                  </div>
              )
              : ''
            }
          </Col>
        </Row>
      </MyModal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row className="mt-3">
          <Col md={6}>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={showModal}>Add New Product</Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <h3>Products</h3>
              {renderProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
