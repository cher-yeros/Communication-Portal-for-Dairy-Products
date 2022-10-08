import "./App.css";
//import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./css/try.css";

import AdminHome from "./components/admin/AdminHome";
import AdminLogin from "./components/admin/Login";
import ManageData from "./components/admin/ManageData";
import ManageFeedback from "./components/admin/ManageFeedback";
import ViewReport from "./components/admin/ViewReport";

import SellerDashboard from "./components/seller/SellerDashboard";

import GenerateReport from "./components/admin/GenerateReport";
import NotifyFeatureForm from "./components/admin/NotifyFeatureForm";
import Payment from "./components/admin/Payment";
import BuyerDashboard from "./components/Buyer/BuyerDashboard";
import NearbyProduct from "./components/Buyer/NearbyProduct";
import ViewProduct from "./components/Buyer/ViewProduct";
import Contact from "./components/Contact";
import FeedbackForm from "./components/FeedbackForm";
import GetInformation from "./components/GetInformation";
import Help from "./components/Help";
import Profile from "./components/Profile";
import AddProductModal from "./components/seller/AddProduct";
import Interests from "./components/seller/Interests";
import Sold from "./components/seller/Sold";
import RequireAuth from "./RequiredAuth";
import { useSelector } from "react-redux";

var hours = 1;
var now = new Date().getTime();
var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", now);
} else {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem("setupTime", now);
  }
}

function App() {
  const auth = useSelector((state) => state.auth.loggedUser);

  return (
    <Router>
      <Routes>
        {/* public routes*/}
        <Route
          path="/admin-login"
          element={
            auth ? <Navigate to={`/${auth.role}`} replace /> : <AdminLogin />
          }
        ></Route>

        <Route
          path="/"
          element={auth ? <Navigate to={`/${auth.role}`} replace /> : <Login />}
        ></Route>
        <Route
          path="/register"
          element={
            auth ? <Navigate to={`/${auth.role}`} replace /> : <Register />
          }
        ></Route>
        <Route
          path="/profile"
          element={auth ? <Profile /> : <Navigate to="/" replace />}
        ></Route>
        <Route
          path="/contact-us"
          element={auth ? <Contact /> : <Navigate to="/" replace />}
        ></Route>
        <Route
          path="/get-help"
          element={!auth ? <Navigate to="/" replace /> : <Help />}
        ></Route>
        <Route
          path="/get-info"
          element={!auth ? <Navigate to="/" replace /> : <GetInformation />}
        ></Route>

        {/* Admin */}

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminHome />}></Route>
          <Route path="/manage-data" element={<ManageData />}></Route>
          <Route path="/read-feedback" element={<ManageFeedback />}></Route>
          <Route path="/view-report" element={<ViewReport />}></Route>
          <Route path="/generate-report" element={<GenerateReport />}></Route>
          <Route path="/notify-feature" element={<NotifyFeatureForm />}></Route>
          <Route path="/payments" element={<Payment />}></Route>
        </Route>

        {/* Seller */}
        <Route element={<RequireAuth allowedRoles={["seller"]} />}>
          <Route path="/seller" element={<SellerDashboard />}></Route>
          <Route path="/interests" element={<Interests />}></Route>
          <Route path="/sold" element={<Sold />}></Route>
          <Route path="/post-product" element={<AddProductModal />}></Route>
          <Route path="/give-feedback" element={<FeedbackForm />}></Route>
        </Route>

        {/* Buyer */}
        <Route element={<RequireAuth allowedRoles={["buyer"]} />}>
          <Route path="/buyer" element={<BuyerDashboard />}></Route>
          <Route path="/view-products" element={<ViewProduct />}></Route>
          <Route path="/nearby-products" element={<NearbyProduct />}></Route>
          <Route path="/nearby" element={<NearbyProduct />}></Route>
        </Route>

        <Route
          path="*"
          element={
            <h1
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              No page Found
            </h1>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
