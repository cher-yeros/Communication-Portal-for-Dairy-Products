import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function Home() {
    return (
        <Container className='mt-4' fluid>
            <Row >
                <Col>
                    <Card border='primary' style={{ maxWidth: '18rem', cursor: 'pointer' }}>
                        <div className="col-sm-12">
                            <div className="card widget-flat">
                                <div className="card-body">
                                    <div className="float-end">
                                        <Icon.BackspaceFill size={40} />
                                    </div>
                                    <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Your Posts</h5>
                                    <h3 className="mt-3 mb-3">5,543</h3>
                                    <p className="mb-0 text-muted">
                                        <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col>
                    <Card border='danger' style={{ maxWidth: '18rem' }}>
                        <div className="col-sm-12">
                            <div className="card widget-flat">
                                <div className="card-body">
                                    <div className="float-end">
                                        <Icon.BackspaceFill size={40} />
                                    </div>
                                    <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Reaction</h5>
                                    <h3 className="mt-3 mb-3">5,543</h3>
                                    <p className="mb-0 text-muted">
                                        <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col>
                    <Card border='success' style={{ maxWidth: '18rem' }}>
                        <div className="col-sm-12">
                            <div className="card widget-flat">
                                <div className="card-body">
                                    <div className="float-end">
                                        <Icon.BackspaceFill size={40} />
                                    </div>
                                    <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Payment</h5>
                                    <h3 className="mt-3 mb-3">5,543</h3>
                                    <p className="mb-0 text-muted">
                                        <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>


            </Row>
        </Container>
    )
}

export default Home

//TODO : update profile
//TODO : help
//TODO : get Information
//TODO : how about the payment
