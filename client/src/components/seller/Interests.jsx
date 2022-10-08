import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import api from "../../client";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Interests() {
  const [reserved, setReserved] = useState([]);

  useEffect(() => {
    fetchInterests();
  }, []);

  const currentUser = useSelector((state) => state.auth.loggedUser);

  function fetchInterests() {
    const userId = currentUser.id;
    api.get(`/seller/get-my-reserved?id=${userId}`).then(({ data }) => {
      setReserved(data);
    });
  }

  function handleSold(p) {
    api
      .post(
        "seller/sell",
        { id: p.id },
        {
          headers: {
            "x-access-token": currentUser.token,
          },
        }
      )
      .then(({ data }) => {
        fetchInterests();
      });
  }
  function handleReleased(p) {
    api.post("seller/release", { id: p.id }).then(({ data }) => {
      fetchInterests();
    });
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Interested</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Interested</li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Reserved Products</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {reserved.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.price}</td>
                    <td>
                      <Button
                        onClick={() => handleSold(r)}
                        size="sm"
                        variant="danger"
                      >
                        Sold
                      </Button>{" "}
                      <Button
                        onClick={() => handleReleased(r)}
                        size="sm"
                        variant="success"
                      >
                        Release
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Interests;
