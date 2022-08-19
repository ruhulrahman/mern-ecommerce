import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Alert, Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCategory, getAllCategory } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import InputFile from "../../components/UI/InputFile";
import "..//style.css";
import MyModal from "../../components/UI/MyModal";

const Category = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();


  const renderCategories = (categories) => {
    let categoryItems = [];

    categories.forEach((item) => {
      categoryItems.push(
        <li key={item._id}>
          {item.name}
          {item.children.length > 0 ? (
            <ul>{renderCategories(item.children)}</ul>
          ) : null}
        </li>
      );
    });

    return categoryItems;
  }

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


  const [categoryName, setCategoryName] = useState('')
  const [parentId, setParentId] = useState(null)
  const [image, setImage] = useState('')
  
  const [show, setShow] = useState(false)
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const saveCategory = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', categoryName)
    formData.append('parentId', parentId ? parentId.value : '')
    formData.append('image', image)

    console.log('save category', formData)
    dispatch(addCategory(formData))
    clearFormData()
    setShow(false)

  }

  const clearFormData = () => {
    setCategoryName('')
    setParentId(null)
    setImage('')
  }

  const categoryList = createCateogryList(category.categories).map(item => {
    return {
        value: item.value,
        label: item.name,
    }
  })

  const handleCategoryImage = (e) => {
    console.log('e.target', e.target)
    setImage(e.target.files[0])
  }

  return (
    <Layout sidebar>
      <Container>
        <Row className="mt-3">
          <Col md={6}>
            <h3>Categories</h3>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={showModal}>Add New Category</Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <ul>
                { renderCategories(category.categories) }
                {/* { JSON.stringify(createCateogryList(category.categories)) } */}
            </ul>
          </Col>
        </Row>
      </Container>

      <MyModal modalTitle="Add New Category" show={show} closeModal={closeModal} handleClose={saveCategory}>
            
            <Input label="Category Name" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name" errorMsg=""/>
            <Form.Label>Category</Form.Label>
            <Select placeholder="Select Category" className="mb-3" defaultValue={parentId} onChange={setParentId} options={categoryList}/>
            
            <InputFile label="Upload Image" type="file" name="image" onChange={handleCategoryImage} errorMsg=""/>
        </MyModal>
    </Layout>
  );
};

export default Category;
