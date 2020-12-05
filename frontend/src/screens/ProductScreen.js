import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listProductsDetail,
  createProductReview,
  editProductReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_EDIT_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview, error: errorReview } = productReviewCreate;

  const productReviewEdit = useSelector((state) => state.productReviewEdit);
  const { success: successEditReview, error: errorEditReview } = productReviewEdit;

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === userInfo._id.toString()
  );

  useEffect(() => {
    
    if (successReview) {
      alert("Review Submitted !");
      setRating(0);
      setComment("");
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
    }
    if (successEditReview) {
        alert("Review Edited !");
        setRating(0);
        setComment("");
        dispatch({
          type: PRODUCT_EDIT_REVIEW_RESET,
        });
      }
    dispatch(listProductsDetail(match.params.id));
  }, [dispatch, successReview, match,successEditReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  const editHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  }

  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />

          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>Price : {product.price}L.E</ListGroup.Item>
                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}LE </strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}{" "}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup>
                  <Button
                    className='btn-dark'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    {<p>{review.updatedAt.substring(0, 10)}</p>}
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write Review</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    alreadyReviewed ? (
                      <Form onSubmit={editHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select..</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4- Very Good</option>
                            <option value='5'>5- Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                          {" "}
                          Edit{" "}
                        </Button>
                      </Form>
                    ) : (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select..</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4- Very Good</option>
                            <option value='5'>5- Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                          {" "}
                          Submit{" "}
                        </Button>
                      </Form>
                    )
                  ) : (
                    <Message>
                      Please <Link to='/login'>SginIn</Link> To write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
