import React from 'react'
import { Col, Row, Form } from "react-bootstrap";
import MyModal from "../../components/UI/MyModal";
import Input from "../../components/UI/Input";
import Select from 'react-select';

export const UpdateCategory = (props) => {
    const {
        updateCategoryModal,
        closeUpdateCategoryModal,
        updateCategoryData,
        expandedArray,
        categoryList,
        handleCategoryInput,
        categoryTypeList,
        checkedArray
    } = props
  return(
    <MyModal modalTitle="Update Category" size="lg" show={updateCategoryModal} closeModal={closeUpdateCategoryModal} handleClose={updateCategoryData}>
        <h3>Expanded Categories</h3>
        {
          expandedArray.length > 0 && expandedArray.map((item, index) => {
            return (
              <Row key={index}>
              <Col>
                <Input label="Category Name" type="text" value={item.name} onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')} placeholder="Enter category name" errorMsg="" />
              </Col>
              <Col>
                <Form.Label>Parent Category</Form.Label>
                <Select placeholder="Select Category" className="mb-3" 
                  value={ categoryList.find(option => option.value === item.parentId) } 
                  onChange={(e) => handleCategoryInput('parentId', e.value, index, 'expanded')} 
                  options={categoryList} 
                />
              </Col>
              <Col>
                <Form.Label>Type {item.type}</Form.Label>
                <Select placeholder="Select Type" className="mb-3" 
                value={ categoryTypeList.find(option => option.value === item.type) }
                onChange={(e) => handleCategoryInput('type', e.value, index, 'expanded')} 
                options={categoryTypeList} />
              </Col>
            </Row>
            )
          })
        }

        <h3>Checked Categories</h3>
        {
          checkedArray.length === 0 ? 
          <p className="text-danger text-center">Please mark check to edit category</p>
          :
          checkedArray.length > 0 && checkedArray.map((item, index) => {
            return (
              <Row key={index}>
              <Col>
                <Input label="Category Name" type="text" value={item.name} onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')} placeholder="Enter category name" errorMsg="" />
              </Col>
              <Col>
                <Form.Label>Parent Category</Form.Label>
                <Select placeholder="Select Category" className="mb-3" 
                  value={ categoryList.find(option => option.value === item.parentId) } 
                  onChange={(e) => handleCategoryInput('parentId', e.value, index, 'checked')} 
                  options={categoryList} 
                />
              </Col>
              <Col>
                <Form.Label>Type {item.type}</Form.Label>
                <Select placeholder="Select Type" className="mb-3" 
                value={ categoryTypeList.find(option => option.value === item.type) }
                onChange={(e) => handleCategoryInput('type', e.value, index, 'checked')} 
                options={categoryTypeList} />
              </Col>
            </Row>
            )
          })
        }

        {/* <InputFile label="Upload Image" type="file" name="image" onChange={handleCategoryImage} errorMsg="" /> */}
      </MyModal>
   )

 }