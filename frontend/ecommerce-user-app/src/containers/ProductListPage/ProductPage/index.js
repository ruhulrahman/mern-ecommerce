import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getProductPages, getProductsBySlug } from "../../../actions";
import getParams from "../../../utils/getParams";
import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


/**
* @author
* @function ProductPage
**/

const ProductPage = (props) => {
  const product = useSelector((state) => state.product)
  const page = product.page
  const dispatch = useDispatch();

  const search = useLocation().search
  console.log('search', search)

  useEffect(() => {
    const query = getParams(search)
    dispatch(getProductPages(query));
  }, []);

  return (
    <>
    <h3>{page ? page.title : ''}</h3>
            <Carousel
              renderThumbs={() => {}}
            >
            {
              page.banners && page.banners.map((banner, index) => 
                <a href={banner.navigateTo} key={index}>
                  <div style={{ height: '450px' }}>
                        <img src={banner.img} alt=""/>
                  </div>
                </a>
              )
            }
            </Carousel>
            <div className="m-3">
              {
                page.products && page.products.map((banner, index) =>
                <div class="card" style={{ width: '18rem' }} key={index}>
                  <a href={banner.navigateTo}>
                    <img class="card-img-top" src={banner.img} alt=""/>
                  </a>
                  {/* <div class="card-body">
                    <a href={banner.navigateTo}>
                      <h5 class="card-title">Card title</h5>
                    </a>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div> */}
                </div>
                )
              }
            </div>
    </>
  )

}

export default ProductPage