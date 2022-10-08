import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import api from "../../client";
import Auth from "../Auth";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import validator from "validator";

function NotifyFeatureForm(props) {
  const [notification, setNotification] = useState({
    type: "",
    title: "",
    body: "",
  });

  function handleInput(e) {
    const neww = { ...notification };
    neww[e.target.name] = e.target.value;

    console.log(e.target.name, e.target.value);
    setNotification(neww);
  }

  function saveNotification(e) {
    e.preventDefault();
    const { type, title, body } = notification;
    if (
      validator.isEmpty(type) ||
      validator.isEmpty(title) ||
      validator.isEmpty(body)
    ) {
      alert("All inputs must be filled!");
      return;
    }
    api.post("/admin/notify-feature", notification).then((data) => {
      alert("Successfully Sent");
      setNotification({
        type: "",
        title: "",
        body: "",
      });
      props.onHide();
    });
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Notify feature</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Notify feature</li>
            </ol>
          </nav>
        </div>
        <div className="row justify-content-center">
          <div className="col col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Notify feature</h5>

                <form className="row g-3">
                  <div className="col-md-12 mb-3">
                    <label className="mb-2" htmlFor="floatingName">
                      Type{" "}
                    </label>
                    <input
                      className="form-control"
                      name="type"
                      onChange={handleInput}
                      value={notification.type}
                      type="text"
                      placeholder="Name "
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="mb-2" htmlFor="floatingName">
                      Title
                    </label>
                    <input
                      className="form-control"
                      name="title"
                      onChange={handleInput}
                      value={notification.title}
                      type="text"
                      placeholder="Title "
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="mb-2" htmlFor="floatingName">
                      Description
                    </label>

                    <textarea
                      name="body"
                      onChange={handleInput}
                      value={notification.body}
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Body"
                      className="form-control"
                      style={{ height: "100px" }}
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <div className="text-center">
                      <button
                        onClick={saveNotification}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="add-product-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Notify Feature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      name="type"
                      onChange={handleInput}
                      value={notification.type}
                      type="text"
                      placeholder="Name "
                    />
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      onChange={handleInput}
                      value={notification.title}
                      type="text"
                      placeholder="Title"
                    />
                  </Form.Group>
                </Col>

                <Col lg={12} md={12} sm={12}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                      name="body"
                      onChange={handleInput}
                      value={notification.body}
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Body"
                    />
                  </Form.Group>
                </Col>

                <div className="d-grid gap-2 mt-4">
                  <Button
                    onClick={saveNotification}
                    variant="primary"
                    type="submit"
                  >
                    Notify
                  </Button>
                </div>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NotifyFeatureForm;
