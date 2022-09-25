import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getProductsBySlug } from "../../actions";
import Layout from "../../components/Layout";
import getParams from "../../utils/getParams";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage";
import "./style.css";

export const ProductListPage = (props) => {

  const search = useLocation().search
  const categoryId = new URLSearchParams(search).get('categoryId')
  const query = getParams(search)
  const type = query.type

  let content = null

  if (type === 'store') {
    content = <ProductStore {...props}/>
  } else if (type === 'page') {
    content = <ProductPage {...props}/>
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
};
