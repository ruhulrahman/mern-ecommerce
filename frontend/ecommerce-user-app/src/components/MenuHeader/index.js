import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './style.css'

const MenuHeader = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();


  const renderCategories = (categories) => {
    let categoryItems = [];

    categories.forEach((item) => {
        categoryItems.push(
          <li key={item._id}>
            {/* {
              item.parentId ? 
              <a href={item.slug}>{item.name}</a> :
               <span>{item.name}</span>
            } */}
            {
              item.parentId ? 
              <NavLink to={`/${item.slug}`}>{item.name}</NavLink> :
               <span>{item.name}</span>
            }
            {item.children.length > 0 ? (
              <ul>{renderCategories(item.children)}</ul>
            ) : null}
          </li>
        );
      });

    return categoryItems;
  }

  return(
    <div className='menuHeader'>
      <ul>
        {
          category.categories.length > 0 ? renderCategories(category.categories) : null
        }
      </ul>
    </div>
  )
}
  
export default MenuHeader