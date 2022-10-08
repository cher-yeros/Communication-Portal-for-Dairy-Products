import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../../client";
import { loginSuccess } from "../../redux/authSlice";
import "../Login/Login.css";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    address: "",
    email: "",
    phone: "",
    role: "buyer",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function handleInput(e) {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;

    setUser(newUser);
  }
  const dispatch = useDispatch();
  async function handleRegister(e) {
    e.preventDefault();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup.object().shape({
      confirmPassword: yup
        .string()
        .min(6)
        .required(),
      password: yup
        .string()
        .min(6)
        .required(),
      role: yup.string().required(),
      address: yup.string().required(),
      phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10)
        .required(),
      email: yup
        .string()
        .email()
        .required(),
      username: yup
        .string()
        .min(6)
        .max(20)
        .required(),
      lastname: yup
        .string()
        .min(1)
        .max(20)
        .required(),
      firstname: yup
        .string()
        .min(1)
        .max(20)
        .required(),
    });

    const valid = await schema.isValid(user);

    if (!valid) {
      schema.validate(user).catch(function(err) {
        alert(err.errors);
      });
    } else {
      if (user.password != user.confirmPassword) {
        alert("Password Doesn't match");
        return;
      } else {
        delete user.confirmPassword;
        api.post("/register", user).then(({ data }) => {
          alert("Successfully Registered!");

          const cred = {
            username: user.username,
            password: user.password,
            role: user.role,
          };

          api.post("/login", cred).then((res) => {
            let d = res.data;
            if (d.success) {
              localStorage.setItem("user", JSON.stringify(d.user));
              dispatch(loginSuccess(d.user));

              setUser({
                firstname: "",
                lastname: "",
                username: "",
                address: "",
                email: "",
                phone: "",
                role: "",
                password: "",
                confirmPassword: "",
              });
              navigate(`/${d.user.role}`);
            } else {
              alert(d.message);
            }
          });
        });
      }
    }
  }
  return (
    <div className="body">
      <Container className="mt-5">
        <Row className="pt-1">
          <Col sm={12} md={8} lg={6} className="column">
            <div className="p-3 mt-1 form-wrapper ">
              <h3 className="pb-4" style={{ textAlign: "center" }}>
                Register Form
              </h3>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        name="firstname"
                        value={user.firstname}
                        onChange={handleInput}
                        type="text"
                        placeholder="Firstname"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="lastname"
                        value={user.lastname}
                        onChange={handleInput}
                        type="text"
                        placeholder="Lastname"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        name="username"
                        value={user.username}
                        onChange={handleInput}
                        type="text"
                        placeholder="Username"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="address"
                        value={user.address}
                        onChange={handleInput}
                        type="text"
                        placeholder="Address"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        value={user.email}
                        onChange={handleInput}
                        type="email"
                        placeholder="Email"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        name="phone"
                        value={user.phone}
                        onChange={handleInput}
                        type="tel"
                        placeholder="Phone"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Select Role</Form.Label>
                      <Form.Select
                        name="role"
                        value={user.role}
                        onChange={handleInput}
                        aria-label="Default select example"
                      >
                        <option disabled>Select one</option>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleInput}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2 mt-4">
                  <Button
                    onClick={handleRegister}
                    variant="primary"
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
              </Form>

              <div className="text-right mt-3">
                <small>Already registered?</small>{" "}
                <Link to="/">
                  <small className="reset">Login</small>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
