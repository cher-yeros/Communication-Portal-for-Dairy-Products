import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../client";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Contact() {
  const navigate = useNavigate();

  const [body, setBody] = useState("");

  const currentUser = useSelector((state) => state.auth.loggedUser);
  function handleFeedback(e) {
    e.preventDefault();
    let UserId = currentUser.id;

    const feedback = {
      body,
      UserId,
    };

    if (body == "" || body.length == 0) {
      alert("Enter valid feedback");
      return;
    }

    api
      .post("post/store-feedback", feedback, {
        headers: {
          "x-access-token": currentUser.token,
        },
      })
      .then(({ data }) => {
        alert("your feedback is successfully sent!");
        setBody("");
      });
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Contact</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Contact</li>
            </ol>
          </nav>
        </div>

        <section className="section contact">
          <div className="row gy-4">
            <div className="col-xl-6">
              <div className="row">
                <div className="col-lg-6">
                  <div className="info-box card">
                    <i className="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p>
                      A108 Adam Street,
                      <br />
                      New York, NY 535022
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card">
                    <i className="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p>
                      +1 5589 55488 55
                      <br />
                      +1 6678 254445 41
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card">
                    <i className="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p>
                      info@example.com
                      <br />
                      contact@example.com
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card">
                    <i className="bi bi-clock"></i>
                    <h3>Open Hours</h3>
                    <p>
                      Monday - Friday
                      <br />
                      9:00AM - 05:00PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="card ">
                <div className="card-body">
                  <h5 className="card-title">Give your feedback</h5>

                  <form className="row g-3">
                    <div className="col-md-12 mb-3">
                      <label className="mb-2">Feedback</label>
                      <textarea
                        className="form-control mb-3"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        type="text"
                        placeholder="Write what you feel about our system"
                        style={{ height: "135px" }}
                      ></textarea>

                      <div className="text-center">
                        <div className="text-center">
                          <button
                            onClick={handleFeedback}
                            type="submit"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contact;
