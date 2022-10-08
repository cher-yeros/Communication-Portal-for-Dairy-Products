import React, { useState, useEffect } from "react";
import api from "../../client";
import { useNavigate } from "react-router-dom";
import Auth from "../Auth";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

function ManageFeedback() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  function fetchComments() {
    api.get("post/get-feedback").then(({ data }) => {
      setComments(data);
      console.log(data);
    });
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="row">
          <div className="col-lg-12  justify-content-center">
            <div
              className="card"
              //  style={{ width: "100", height: "35rem", overflowY: "scroll" }}
            >
              <div className="card-body">
                <h5 className="card-title">Feedbacks</h5>

                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((fb) => (
                      <tr key={fb.id}>
                        <td>{fb.id}</td>
                        <td>{`${fb.User.firstname} ${fb.User.lastname}`}</td>
                        <td>{fb.body}</td>
                        {/*<td>
                                        <Button variant='success'>Reply</Button>
                                    </td>*/}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ManageFeedback;
