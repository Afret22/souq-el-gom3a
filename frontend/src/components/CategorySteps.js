import React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategorySteps = ({ categories = [] }) => {
  return (
    <Row className="py-2 m-2">
      

      {categories.map(category =>(
          <Col md={2}>
          <LinkContainer to={`/category/${category}`}>
           <a> <strong>{category}</strong> </a>
          </LinkContainer>
        </Col>
      ))}

    </Row>
  );
};

export default CategorySteps;
