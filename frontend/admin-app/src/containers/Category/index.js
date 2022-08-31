import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Alert, Button, Col, Container, Row, Modal, Form, Badge } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCategory, deleteCategoryData, getInitialData, updateCategory } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import InputFile from "../../components/UI/InputFile";
import MyModal from "../../components/UI/MyModal";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FcOpenedFolder, FcFolder, FcFile } from "react-icons/fc";
import { FaAngleRight, FaAngleDown, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Swal from 'sweetalert2'
import "../style.css";
import { UpdateCategory } from "./UpdateCategory";
import { RiEdit2Fill } from "react-icons/ri"
import { MdDeleteForever } from "react-icons/md"

const Category = (props) => {

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState('')
  const [parentId, setParentId] = useState(null)
  const [categoryType, setCategoryType] = useState(null)
  const [image, setImage] = useState('')

  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])

  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])

  const [show, setShow] = useState(false)
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
  const closeUpdateCategoryModal = () => setUpdateCategoryModal(false)

  const showUpdateCategoryModal = () => {
    setUpdateCategoryModal(true)
    const checkedArray = []
    const expandedArray = []

    const categories = createCateogryList(category.categories)
    console.log({ categories })

    checked.length > 0 && checked.forEach(categoryId => {
      const categoryItem = categories.find(data => data.id === categoryId)
      if (categoryItem) {
        checkedArray.push(categoryItem)
      }
    })

    expanded.length > 0 && expanded.forEach(categoryId => {
      const categoryItem = categories.find(data => data.id === categoryId)
      if (categoryItem) {
        expandedArray.push(categoryItem)
      }
    })
    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
    // console.log({ checked, expanded })
    // console.log({ checkedArray, expandedArray })
  }
  
  const deleteCategory= () => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-success ml-15',
        cancelButton: 'btn btn-danger'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoryConfirmed()
      }
    })
    
  }

  const deleteCategoryConfirmed= () => {

    const checkedIds = checked.length > 0 ? checked.map((item, index) => ({ _id: item })) : null

    console.log({checkedIds})
    dispatch(deleteCategoryData(checkedIds))
    .then(result => {
      if(result) {
        Swal.fire({
          position: 'middle',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        dispatch(getInitialData())
      }
    })

  }

  const categoryTypeList = [
    { value: 'store', label: 'Store' },
    { value: 'product', label: 'Product' },
    { value: 'page', label: 'Page' },
  ]

  // const renderCategories = (categories) => {
  //   let categoryItems = [];

  //   categories.forEach((item) => {
  //     categoryItems.push(
  //       <li key={item._id}>
  //         {item.name}
  //         {item.children.length > 0 ? (
  //           <ul>{renderCategories(item.children)}</ul>
  //         ) : null}
  //       </li>
  //     );
  //   });

  //   return categoryItems;
  // }

  const renderCategories = (categories) => {
    let categoryItems = [];

    categories.forEach((item) => {
      categoryItems.push(
        {
          value: item._id,
          label: item.name,
          children: item.children.length > 0 && renderCategories(item.children),
        }
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
        type: item.type,
        parentId: item.parentId,
      })
      if (item.children.length > 0) {
        createCateogryList(item.children, options)
      }
    })
    return options
  }

  const saveCategory = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', categoryName)
    formData.append('type', categoryType ? categoryType.value : '')
    formData.append('parentId', parentId ? parentId.value : '')
    formData.append('image', image)

    // console.log('save category', formData)
    dispatch(addCategory(formData))
    clearFormData()
    setShow(false)

  }

  const updateCategoryData = (event) => {
    event.preventDefault()
    const expandedAndCheckedArray = expandedArray.concat(checkedArray)
    console.log({expandedAndCheckedArray})

    const formData = new FormData()

    expandedAndCheckedArray.length > 0 && expandedAndCheckedArray.forEach((item, index) => {
      
      formData.append('_id', item.id)
      formData.append('name', item.name)
      formData.append('type', item.type)
      formData.append('parentId', item.parentId)
      // formData.append('image', image)

    })

    // console.log('save category', formData)
    dispatch(updateCategory(formData))
    // .then(result => {
    //   if(result) {
    //     dispatch(getInitialData())
    //   }
    // })

    closeUpdateCategoryModal()
  }

  const clearFormData = () => {
    setCategoryName('')
    setParentId(null)
    setCategoryType(null)
    setImage('')
  }

  const categoryList = createCateogryList(category.categories).map(item => {
    return {
      value: item.value,
      label: item.name,
    }
  })

  const handleCategoryImage = (e) => {
    // console.log('e.target', e.target)
    setImage(e.target.files[0])
  }

  const handleCategoryInput = (key, value, index, type) => {
    console.log({value})
    if (type === 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) => _index === index ? { ...item, [key]: value } : item)
      setExpandedArray(updatedExpandedArray)
    } else if (type === 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) => _index === index ? { ...item, [key]: value } : item)
      setCheckedArray(updatedCheckedArray)
    }
  }

  return (
    <Layout sidebar>
      <Container>
        <Row className="mt-3">
          <Col md={6}>
            <h3 className="font-size-40 text-purple">Categories</h3>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={showModal}>Add New Category</Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            {/* <ul>
                { renderCategories(category.categories) }
            </ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={checked => setChecked(checked)}
              onExpand={expanded => setExpanded(expanded)}
              icons={{
                check: <ImCheckboxChecked />,
                uncheck: <ImCheckboxUnchecked />,
                halfCheck: <ImCheckboxUnchecked />,
                expandClose: <FaAngleRight />,
                expandOpen: <FaAngleDown />,
                expandAll: <FaMinusCircle />,
                collapseAll: <FaPlusCircle />,
                parentClose: <FcFolder />,
                parentOpen: <FcOpenedFolder />,
                leaf: <FcFile />
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <button onClick={showUpdateCategoryModal} className='btn btn-danger btn-sm me-1'>Delete</button>
            <button onClick={showUpdateCategoryModal} className='btn btn-info btn-sm'>Edit</button> */}
            <Badge pill bg="danger" className="me-1 hand" onClick={deleteCategory}><MdDeleteForever></MdDeleteForever>Delete</Badge>
            <Badge pill bg="info" className="hand" onClick={showUpdateCategoryModal}><RiEdit2Fill></RiEdit2Fill>Edit</Badge>
            {/* <SweetAlert2 {...swalProps} onConfirm={result => {
                    deleteCategoryConfirmed()
                }}/> */}
          </Col>
        </Row>
      </Container>

      <MyModal modalTitle="Add New Category" show={show} closeModal={closeModal} handleClose={saveCategory}>

        <Input label="Category Name" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name" errorMsg="" />
        <Form.Label>Category</Form.Label>
        <Select placeholder="Select Category" className="mb-3" value={parentId} onChange={setParentId} options={categoryList} />

        <Form.Label>Type</Form.Label>
        <Select placeholder="Select Type" className="mb-3" value={categoryType} onChange={setCategoryType} options={categoryTypeList} />

        <Input label="Upload Image" type="file" name="image" onChange={handleCategoryImage} errorMsg="" />
      </MyModal>


      {/* Start Update Category */}
      {/* <MyModal modalTitle="Update Category" size="lg" show={updateCategoryModal} closeModal={closeUpdateCategoryModal} handleClose={updateCategoryData}>
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

      </MyModal> */}
      <UpdateCategory 
        updateCategoryModal={updateCategoryModal}
        closeUpdateCategoryModal={closeUpdateCategoryModal}
        updateCategoryData={updateCategoryData}
        expandedArray={expandedArray}
        categoryList={categoryList}
        handleCategoryInput={handleCategoryInput}
        categoryTypeList={categoryTypeList}
        checkedArray={checkedArray}
      />
      {/* End Update Category */}
    </Layout>
  );
};

export default Category;
