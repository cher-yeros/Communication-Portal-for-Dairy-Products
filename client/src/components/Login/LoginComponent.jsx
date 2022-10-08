import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import api from "../../client";
import * as yup from "yup";
import { authSlice, loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

function LoginComponent(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [details, setdetails] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();
  async function handleLogin(e) {
    e.preventDefault();
    const role = props.role;
    const cred = {
      username,
      password,
      role,
    };
    const schema = yup.object().shape({
      password: yup
        .string()
        .min(6)
        .required(),
      username: yup
        .string()
        .min(6)
        .required(),
    });

    const valid = await schema.isValid(cred);
    if (!valid) {
      schema.validate(cred).catch((error) => {
        alert(error.errors);
      });
      return;
    }

    api.post("/login", cred).then(({ data }) => {
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(loginSuccess(data.user));
        navigate(`/${role}`);
      } else {
        alert(data.message);
      }
    });
  }
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="tel"
          placeholder="Enter your username"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <div className="d-grid gap-2 mt-4">
        <Button onClick={handleLogin} variant="primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
}

export default LoginComponent;
