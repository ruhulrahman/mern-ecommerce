import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getProductsBySlug } from "../../../actions";
import getParams from "../../../utils/getParams";
import "./style.css";

/**
* @author
* @function ProductStore
**/

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under25k: 25000,
    under30k: 30000,
    under50k: 50000,
    above50k: 50000,
  })
  const [priceRangeText, setPriceRangeText] = useState({
    under5k: 'Under',
    under10k: 'Under',
    under15k: 'Under',
    under20k: 'Under',
    under25k: 'Under',
    under30k: 'Under',
    under50k: 'Under',
    above50k: 'Above',
  })

  const dispatch = useDispatch();

  const { slug } = useParams();
  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);

  const float2 = (value) => {
    if (value) {
      const double = parseFloat(value).toFixed(2)
      return Number(double).toLocaleString()
    } else {
      return 0
    }
  }

  const arrayToMakeString = (value) => {
    if (value) {
      const newArray = value.split('-')
      const newString = newArray.join(" ").toString()
      const result = newString.charAt(0).toUpperCase() + newString.slice(1).toLowerCase()
      return result

    } else {
      return ''
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            {Object.keys(product.productsByPrice).map((key, index) => {
              return (
                <Card className="mt-3">
                  <Card.Header>
                    <Row className="align-items-center">
                      <Col>
                        <Card.Title>
                          {arrayToMakeString(slug)} Range {priceRangeText[key]} {priceRange[key]}
                        </Card.Title>
                      </Col>
                      <Col className="text-end">
                        <Button>View All</Button>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    {product.productsByPrice[key].map((item) => {
                      return (
                        <div className="productContainer">
                          <div className="productImageContainer">
                            <img
                              src={item.productImages[0].img}
                              alt=""
                            />
                          </div>
                          <div className="productInfo">
                            <div className="productName">{item.name}</div>
                            <div className="productRatingBar">
                              <span>4.3</span>
                              <span>4500</span>
                            </div>
                            <div className="productPrice">{float2(item.price)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  )

}

export default ProductStore