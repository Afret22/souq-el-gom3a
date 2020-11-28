import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Pageinate from "../components/Pageinate";
import ProductCarousel from "../components/ProductsCarousel";
import Meta from "../components/Meta";
import CategorySteps from "../components/CategorySteps";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const category = match.params.category;

  let categories=[]

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));

    
  }, [dispatch, pageNumber, keyword]);

  return (
    <>
      <Meta />
      {!category && !keyword && <CategorySteps categories={categories} />}
      {!keyword && !category && <ProductCarousel />}
      <h1> Latest Products</h1>
      {keyword || category ? (
        <Link to='/' className='btn btn-dark'>
          Back
        </Link>
      ):(true)}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
                categories.push(product.category)
                return(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )})}
          </Row>
          <Pageinate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
