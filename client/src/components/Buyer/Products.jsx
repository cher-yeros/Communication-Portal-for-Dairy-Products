import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import api from "../../client";
import milk from "../../images/milk.jpg";
import {
  getMyProducts,
  getNearbyProducts,
  getProducts,
} from "../../redux/api_calls";
import { updateLocation } from "../../redux/locationSlice";

function Products(props) {
  const { type } = props;
  const dispatch = useDispatch();

  const [q, setQ] = useState("");
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getlocation();
    fetchProducts();
  }, []);

  const currentUser = useSelector((state) => state.auth.loggedUser);
  const l = useSelector((state) => state.location);

  function fetchProducts(e) {
    if (e) {
      setQ(e.target.value);
    }

    if (type == "nearby") {
      getNearbyProducts(q, currentUser.token, l, dispatch);
    } else if (type == "myProduct") {
      getMyProducts(q, currentUser.token, currentUser.id, dispatch);
    } else {
      getProducts(q, currentUser.token, dispatch);
    }
  }
  function calculate(products) {
    let p = products[5];
    let latt1 = l.latitude;
    let long1 = l.longitude;

    let latt2 = p.latitude;
    let long2 = p.longitude;
    console.log(
      `distance between (${latt1} , ${long1}) and (${latt2} , ${long2})`
    );

    var R = 6371; // km
    var dLat = toRad(latt2 - latt1);
    var dLon = toRad(long2 - long1);
    var lat1 = toRad(latt1);
    var lat2 = toRad(latt2);
    console.log(
      `distance between (${latt1} , ${long1}) and (${latt2} , ${long2})`
    );
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    //return d;
    console.log(d * 1000, " KM");
  }
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  function handleOrdered(product) {
    setSelectedUser(product);
    setShowInterestModal(true);
  }
  function getlocation() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition((pos) => {
              dispatch(
                updateLocation({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                })
              );
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                dispatch(
                  updateLocation({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                  })
                );
              },
              (err) => {
                alert(`ERROR(${err.code}): ${err.message}`);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
            );
          } else if (result.state === "denied") {
            alert("Location Access Denied!");
          }
          result.onchange = function() {
            console.log(result.state);
          };
        });
    } else {
      alert("Geo Location not available!");
    }
  }

  const products = useSelector((state) => state.product.products);
  return (
    <>
      <div className="row col-lg-4 col-md-6 col-sm-12">
        <Form className="d-flex mb-2">
          <InputGroup className="">
            <FormControl
              placeholder="Search product"
              aria-label=""
              aria-describedby="basic-addon2"
              value={q}
              onChange={fetchProducts}
            />
            <Button variant="outline-secondary" id="button-addon2">
              <Icon.Search />
            </Button>
          </InputGroup>
        </Form>
      </div>
      <Row style={{ gap: "0rem" }}>
        {products.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={4}>
            <div className="card">
              <img
                src={`http://localhost:5000/${product.photo}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p
                  style={{
                    maxHeight: "5rem",
                    overflow: "hidden",
                    overflowY: "auto",
                  }}
                  className="card-text"
                >
                  {product.description}
                </p>
                {type == "nearby" ? (
                  product.distance < 0.9999 ? (
                    <span className="away">
                      {Math.round(product.distance * 1000, 2)} M away
                    </span>
                  ) : (
                    <span className="away">
                      {Math.round(product.distance, 2)} KM away
                    </span>
                  )
                ) : null}
                <div className="span">
                  Price : <strong>{product.price}</strong>
                </div>
                <div className="span">
                  Quantity : <strong>{product.quantity} Birr</strong>{" "}
                </div>
                <Button
                  onClick={() => handleOrdered(product)}
                  variant="primary"
                >
                  Interested
                </Button>
              </div>
            </div>
            
          </Col>
        ))}
      </Row>
      <InterestedModal
        product={selectedUser}
        show={showInterestModal}
        onHide={() => setShowInterestModal(false)}
        onReserved={() => getProducts(q, currentUser.token, dispatch)}
      />
    </>
    //</Container>
  );
}

export default Products;

function InterestedModal(props) {
  console.log(props);
  const { product } = props;
  const user = product.User;

  const CU = useSelector((state) => state.auth.loggedUser);

  function reserveProduct() {
    api
      .post(
        "/buyer/reserve",
        { id: product.id },
        {
          headers: {
            "x-access-token": CU.token,
          },
        }
      )
      .then(({ data }) => {
        if (data.success) {
          props.onReserved();
        }
        props.onHide();
      });
  }
  return (
    <Modal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {user?.firstname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Row>
              <Col className="d-flex justify-content-center">
                <Image
                  style={{
                    width: "7rem",
                    height: "7rem",
                    borderRadius: "50%",
                    marginBottom: "1.5rem",
                    border: "6px solid lightgray",
                  }}
                  src={milk}
                  className="avatar-profile"
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    disabled
                    value={`${user?.firstname} ${user?.lastname}`}
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control disabled value={user?.email} type="text" />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control disabled value={user?.phone} type="text" />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Address</Form.Label>
                  <Form.Control disabled value={user?.address} type="text" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={reserveProduct}>Reserve</Button>
      </Modal.Footer>
    </Modal>
  );
}
