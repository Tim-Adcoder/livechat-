import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from "../services/appApi";

import {Row, Col, Form, Container, Button } from "react-bootstrap"
import "./Signup.css"

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    // signup the user
    signupUser({ name, email, password }).then(({ data }) => {
        if (data) {
            console.log(data);
            navigate("/chat");
        }
    });
}
  
  return (
    <Container>
      <Row>
        <Col md={5} ></Col>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{width: '80%', maxWidth: 500}} onSubmit={handleSignup}>
            <h1 className="text-center">Create account</h1>
            <div className="profile_pic"></div>
            
            <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            { isLoading ? "Signing you up..." : "Signup"}
                        </Button>
            <div className='py-4'>
              <p className='text-center'>
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup;
