import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../Auth";
import { useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import api from "../../client";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function Sold() {
  const [sold, setsold] = useState([]);

  useEffect(() => {
    fetchInterests();
  }, []);

  const currentUser = useSelector((state) => state.auth.loggedUser);

  function fetchInterests() {
    const userId = currentUser.id;
    api.get(`/seller/get-my-sold?id=${userId}`).then(({ data }) => {
      setsold(data);
      console.log(data);
    });
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Sold Products</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Sold Products</li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Sold Products</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {sold.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.description}</td>
                    <td>
                      <Button size="sm" variant="danger">
                        Delete
                      </Button>{" "}
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

export default Sold;
