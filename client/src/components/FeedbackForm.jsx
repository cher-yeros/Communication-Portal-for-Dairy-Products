import { useState } from "react";
import api from "../client";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
function FeedbackForm(props) {
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
      alert("Please Enter valid feedback");
      return;
    }
    api.post("post/store-feedback", feedback).then(({ data }) => {
      alert("your feedback is successfully sent!");
      setBody("");
    });
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Feedback</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Feedback</li>
            </ol>
          </nav>
        </div>

        <div className="row justify-content-center">
          <div className="col col-lg-6 col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Give your feedback</h5>

                <form className="row g-3">
                  <div className="col-md-12 mb-3"></div>

                  <div className="col-md-12 mb-3">
                    <label className="mb-2">Feedback</label>
                    <textarea
                      className="form-control mb-3"
                      onChange={(e) => setBody(e.target.value)}
                      value={body}
                      type="text"
                      placeholder="Write what you feel about our system"
                      style={{ height: "150px" }}
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
      </main>
    </>
  );
}

export default FeedbackForm;
