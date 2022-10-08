import React, { useState } from 'react'
import '../Login/Login.css'
import { Link, Route, useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button, Image } from "react-bootstrap";
import api from '../../client'
const AdminRegistser = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        address: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        confirmPassword: '',
    })
    const navigate = useNavigate();

    function handleInput(e) {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value

        setUser(newUser);
    }

    function handleRegister(e) {
        e.preventDefault();
        if (user.password != user.confirmPassword) {
            alert('Password Doesn\'t match');
            return
        }
        delete user.confirmPassword
        api.post('/register', user).then(({ data }) => {
            alert("Successfully Registered!")
            navigate('/admin-login')
        })
    }
    return (
        <div className='body'>
            <Container className='mt-5'>
                <Row className='pt-1'>
                    <Col sm={12} md={8} lg={6} className='column'>
                        <div className='p-3 mt-1 form-wrapper ' >
                            <h3 className='pb-4' style={{ textAlign: 'center' }}>Admin Register Form</h3>
                            <Form >
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                name='firstname'
                                                value={user.firstname}
                                                onChange={handleInput}
                                                type="text"
                                                placeholder="Enter your phone"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                name='lastname'
                                                value={user.lastname}
                                                onChange={handleInput}
                                                type="text"
                                                placeholder="Enter your phone" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                name='username'
                                                value={user.username}
                                                onChange={handleInput}
                                                type="text"
                                                placeholder="Enter your usrename" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control name='address'
                                                value={user.address}
                                                onChange={handleInput} type="text" placeholder="Enter your phone" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control name='email'
                                                value={user.email}
                                                onChange={handleInput} type="email" placeholder="Enter your phone" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control name='phone'
                                                value={user.phone}
                                                onChange={handleInput} type="tel" placeholder="Enter your phone" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Select Role</Form.Label>
                                            <Form.Select name='role'
                                                value={user.role}
                                                onChange={handleInput} aria-label="Default select example">
                                                <option value='admin'>Admin</option>

                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name='password'
                                                value={user.password}
                                                onChange={handleInput} type="password" placeholder="Password" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control name='confirmPassword'
                                                value={user.confirmPassword}
                                                onChange={handleInput} type="password" placeholder="Password" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-grid gap-2 mt-4">
                                    <Button onClick={handleRegister} variant="primary" type="submit">
                                        Register
                                    </Button>
                                </div>
                            </Form>

                            <div className='text-right mt-3'>

                                <small>Already registered?</small> {' '}

                                <Link to='/admin-login'><small className='reset'>Login</small></Link>
                            </div>
                        </div>

                    </Col>


                </Row>
            </Container>
        </div>
    )
}

export default AdminRegistser