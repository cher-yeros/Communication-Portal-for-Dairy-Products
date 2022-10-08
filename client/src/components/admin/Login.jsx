import { useState } from "react";
import avatar from "../../images/avatar.png";
import "../Login/Login.css";
import ResetPasswordModal from "../ResetPasswordForm";

import { Button, Col, Container, Image, Row } from "react-bootstrap";
import LoginComponent from "../Login/LoginComponent";

const AdminLogin = () => {
  const [resetPassword, setresetPassword] = useState(false);

  return (
    <div className="body">
      <Container className="mt-5">
        <Row className=" pt-2">
          <Col sm={12} md={5} lg={5} className="column">
            <div className="p-3 mt-5 form-wrapper ">
              <Image className="avatar" src={avatar}></Image>
              <h3 className="text-center my-3">Admin Login</h3>
              <LoginComponent role="admin" />

              <div className="text-right mt-3">
                <Button onClick={() => setresetPassword(true)} variant="link">
                  Reset Password
                </Button>
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
};

export default AdminLogin;
