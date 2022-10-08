import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ViewUsers(props) {
  const navigate = useNavigate();

  const tableStyle = {
    height: "20.7rem",
    display: "block",
    overflowY: "scroll",
    width: "100%",
  };
  return (
    <Container fluid>
      <Table id="users" style={tableStyle} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.firstname} ${user.lastname}`}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                {user.Roles?.map((role) => (
                  <Button
                    key={role.id}
                    style={{ marginRight: "5px" }}
                    size="sm"
                    variant="success"
                  >
                    {role.name}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

function ViewOrders(props) {
  const tableStyle = {
    height: "20.7rem",
    display: "block",
    overflowY: "scroll",
    width: "100%",
  };
  return (
    <Container fluid>
      <Table id="users" style={tableStyle} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.firstname} ${user.lastname}`}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                {user.Roles.map((role) => (
                  <Button
                    key={role.id}
                    style={{ marginRight: "5px" }}
                    size="sm"
                    variant="success"
                  >
                    {role.name}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

function ViewProducts(props) {
  const tableStyle = {
    height: "20.7rem",
    display: "block",
    overflowY: "scroll",
    width: "100%",
  };
  return (
    <Container fluid>
      <Table id="users" style={tableStyle} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.firstname} ${user.lastname}`}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                {user.Roles.map((role) => (
                  <Button
                    key={role.id}
                    style={{ marginRight: "5px" }}
                    size="sm"
                    variant="success"
                  >
                    {role.name}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

function ViewComments(props) {
  const tableStyle = {
    height: "20.7rem",
    display: "block",
    overflowY: "scroll",
    width: "100%",
  };
  return (
    <Container fluid>
      <Table id="users" style={tableStyle} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.firstname} ${user.lastname}`}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                {user.Roles.map((role) => (
                  <Button
                    key={role.id}
                    style={{ marginRight: "5px" }}
                    size="sm"
                    variant="success"
                  >
                    {role.name}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

function ViewPayments(props) {
  const tableStyle = {
    height: "20.7rem",
    display: "block",
    overflowY: "scroll",
    width: "100%",
  };
  return (
    <Container fluid>
      <Table id="users" style={tableStyle} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.firstname} ${user.lastname}`}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                {user.Roles.map((role) => (
                  <Button
                    key={role.id}
                    style={{ marginRight: "5px" }}
                    size="sm"
                    variant="success"
                  >
                    {role.name}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ViewUsers;

export { ViewUsers, ViewComments, ViewOrders, ViewProducts, ViewPayments };
