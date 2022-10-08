import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerCounts } from "../../redux/api_calls";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Dashboard() {
  const currentUser = useSelector((state) => state.auth.loggedUser);
  const count = useSelector((state) => state.seller.counts);
  const dispatch = useDispatch();

  useEffect(() => {
    getSellerCounts(currentUser.id, currentUser.token, dispatch);
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-xxl-4 col-md-12">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Your Products </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.productCount}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Sold </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.sold}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Reserved</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.reserved}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              {/*<div className="col-12">*/}
              <div className="card top-selling overflow-auto">
                <div className="card-body pb-0">
                  <h5 className="card-title">Your recent products</h5>

                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Preview</th>
                        <th scope="col">Product Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {count?.products?.map((r) => (
                        <tr>
                          <th scope="row">
                            <a href="#">
                              <img
                                src={`http://localhost:5000/${r.photo}`}
                                alt=""
                              />
                            </a>
                          </th>
                          <td>
                            <span className="text-primary fw-bold">
                              {r.name}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/*</div>*/}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
