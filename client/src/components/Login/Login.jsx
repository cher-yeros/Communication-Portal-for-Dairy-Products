import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../images/avatar.png";
import ResetPasswordModal from "../ResetPasswordForm";
import "./Login.css";
import { Button, Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateLocation } from "../../redux/locationSlice";
import Auth from "../Auth";
import LoginComponent from "./LoginComponent";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    location();
  }, []);

  const [resetPassword, setresetPassword] = useState(false);

  return (
    <div className="body">
      <Container className="mt-5">
        <Row className=" pt-2">
          <Col sm={12} md={5} lg={5} className="column">
            <div className="p-3 mt-5 form-wrapper ">
              <Image className="avatar" src={avatar}></Image>
              <Tabs defaultActiveKey="buyer" className="mb-3">
                <Tab eventKey="buyer" title="Buyer">
                  <LoginComponent role="buyer" />
                </Tab>

                <Tab eventKey="seller" title="Seller">
                  <LoginComponent role="seller" />
                </Tab>
              </Tabs>

              <div className="text-right mt-3">
                <Button onClick={() => setresetPassword(true)} variant="link">
                  Reset Password
                </Button>
                <Link to="/register">
                  <Button variant="link">Sign up</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <ResetPasswordModal
        show={resetPassword}
        onHide={() => setresetPassword(false)}
        backdrop="static"
      />
    </div>
  );

  function location() {
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
};

export default Login;
