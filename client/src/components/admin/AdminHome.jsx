import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCounts } from "../../redux/api_calls";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Admin() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.loggedUser);
  const count = useSelector((state) => state.admin.counts);
  const dispatch = useDispatch();

  console.log(count, "count");
  useEffect(() => {
    getCounts(currentUser?.token, dispatch);
  }, []);

  const { t } = useTranslation();

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
            <div className="col-lg-12">
              <div className="row">
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Buyers </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.buyers}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Sellers</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.sellers}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Products </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.products}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
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
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Sold</h5>
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Admin;
