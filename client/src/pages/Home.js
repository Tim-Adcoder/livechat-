import React from 'react';
import {Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Home.css"
const Home = () => {

  return (
    <Row>
      <Col md={6} className="d-flex flex-direction-column align-items-center justify-centent-center">
        <div>
          <h1>Share with your friends</h1>
          <p>Chat App lets you connect with the world</p>
          <Link to="/chat">
            <Button variant="success">
              Get Started <i className='fas fa-comments home-message-icon'></i>
            </Button>
          </Link>
        </div>
       
      </Col>
      <Col md={6} className="home_bg"></Col>
    </Row>

  );
};

export default Home;
