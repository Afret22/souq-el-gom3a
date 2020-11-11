import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";
const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id);
  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating
                    value={product.rating} 
                    text={product.numReviews}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    Price : {product.price}L.E
                </ListGroup.Item>
                <ListGroup.Item>
                    Description : {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant="flush">
                    <Row>
                        <Col>
                        Price:
                        </Col>
                        <Col>
                        <strong>{product.price}LE    </strong>
                        </Col>
                       
                    </Row>
                    <Row>
                        <Col>
                        Status:
                        </Col>
                        <Col>
                        <strong>{product.countInStock > 0 ? "In Stock" :"Out Of Stock"}    </strong>
                        </Col>
                       
                    </Row>

                </ListGroup>
                <ListGroup>
                    <Button className="btn-dark" disabled={product.countInStock === 0}>
Add To Cart 
                    </Button>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
