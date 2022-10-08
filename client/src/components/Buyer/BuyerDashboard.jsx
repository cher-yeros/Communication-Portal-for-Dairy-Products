import React from "react";
import * as Icon from "react-bootstrap-icons";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Auth from "../Auth";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function BuyerDashboard() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <Products type="all" />
      </main>
    </>
  );
}

export default BuyerDashboard;
