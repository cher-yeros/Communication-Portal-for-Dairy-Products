import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../client";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { updateReport } from "../../redux/adminSlice";
import { updateSellerCounts } from "../../redux/sellerSlice";
function GenerateReport() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const [GenReport, setGenReport] = useState({
    type: "",
    date: "",
  });
  //const [reports, setReports] = useState({
  //  users: [],
  //  products: [],
  //  comments: [],
  //  payments: [],
  //});

  const reports = useSelector((state) => state.admin.report);
  const currentUser = useSelector((state) => state.auth.loggedUser);

  useEffect(() => {
    fetchReports();
  }, []);

  function fetchReports() {
    api
      .get(`/admin/generate-report?today=${new Date()}&type=year`, {
        headers: { "x-access-token": currentUser.token },
      })
      .then(({ data }) => {
        dispatch(updateReport(data));
      });
  }

  const dispatch = useDispatch();

  function generateReport(e) {
    e.preventDefault();
    if (GenReport.date == "") {
      alert("Enter Valid Date!");
      return;
    }
    api
      .get(
        `/admin/generate-report?today=${GenReport.date}&type=${GenReport.type}`
      )
      .then(({ data }) => {
        dispatch(updateReport(data));
      });
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Generate Report</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li
                style={{ textTransform: "capitalize" }}
                className="breadcrumb-item active"
              >
                Generate Report
              </li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            <form className="row ">
              <div className="col-lg-4 mb-3">
                <div className="input-group mb-3">
                  <label className="input-group-text">Type</label>
                  <select
                    value={GenReport.type}
                    onChange={(e) =>
                      setGenReport({ ...GenReport, type: e.target.value })
                    }
                    className="form-select"
                    id="inputGroupSelect01"
                  >
                    <option value="year">Yearly</option>
                    <option value="month">Monthly</option>
                    <option value="day">Daily</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Select date
                  </span>
                  <input
                    value={GenReport.date}
                    onChange={(e) =>
                      setGenReport({ ...GenReport, date: e.target.value })
                    }
                    type="date"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <button
                  onClick={generateReport}
                  type="button"
                  className="btn btn-primary"
                >
                  Generate
                </button>
              </div>
            </form>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Users </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{reports.users?.length}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Products</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{reports.products?.length}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Feedbacks </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{reports.comments.length}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Reserves</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{reports.payments.length}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card"
                style={{ height: "20.3rem", overflowY: "scroll" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Users</h5>

                  <table className="table datatable">
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
                      {reports.users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{`${user.firstname} ${user.lastname}`}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                          <td>
                            {user.Roles?.map((role) => (
                              <button
                                className="btn btn-success sm"
                                key={role.id}
                                style={{ marginRight: "5px" }}
                                size="sm"
                                variant="success"
                              >
                                {role.name}
                              </button>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="card"
                style={{ height: "20.3rem", overflowY: "scroll" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Products</h5>

                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Preview</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Seller</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.products.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.photo}</td>
                          <td>{p.name}</td>
                          <td>{p.price} ETB</td>
                          <td>{p?.User?.firstname}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="card"
                style={{ height: "20.3rem", overflowY: "scroll" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Feedbacks</h5>

                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Sender Name</th>
                        <th>Body</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.comments.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p?.User?.firstname}</td>
                          <td>{p.body}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="card"
                style={{ height: "20.3rem", overflowY: "scroll" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Reserves</h5>
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Preview</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Seller</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.products.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.photo}</td>
                          <td>{p.name}</td>
                          <td>{p.price} ETB</td>
                          <td>{p?.User?.firstname}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default GenerateReport;
