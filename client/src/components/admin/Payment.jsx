import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../client";
import Auth from "../Auth";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Payment() {
  const [payment, setpayment] = useState([]);

  useEffect(() => {
    fetchPaymentDetail();
  }, []);

  const currentUser = useSelector((state) => state.auth.loggedUser);
  function fetchPaymentDetail() {
    api
      .get(`/admin/payment-detail`, {
        headers: {
          "x-access-token": currentUser.token,
        },
      })
      .then(({ data }) => {
        setpayment(data.payment);
        console.log(data);
      });
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Payment</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Payment</li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Payment detail</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Seller</th>
                  <th>Products</th>
                  {/*<th>Fixed Payment</th>*/}
                  <th>Paid Total</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {payment?.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{r.User.firstname + " " + r.User.lastname}</td>
                    <td>{r.User.Products.length}</td>
                    {/*<td>5 ETB</td>*/}
                    <td>{1 * r.User.Products.length} ETB</td>
                    <td>{r.balance} ETB</td>
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

export default Payment;
