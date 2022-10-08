import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../client";
import Auth from "../Auth";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function ManageData() {
  const [isLoading, setIsLoading] = useState(false);
  function handleBackup() {
    setIsLoading(true);
    api.post("/admin/backup-data").then(({ data }) => {
      if (data.success) {
        setIsLoading(false);
        alert("You have backupd your database successfully!");
      }
    });
  }
  return (
    <>
      <Navbar />
      <Sidebar />

      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Manage data</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Manage data</li>
            </ol>
          </nav>
        </div>

        <section className="section contact">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-6">
              <div className="info-box card">
                {isLoading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  <i className="bi bi-file-earmark-arrow-up-fill"></i>
                )}
                <h3>Backup</h3>
                <p>
                  You can access your file in firebase storage
                  <br />
                  Login with credential
                </p>
                <br />

                <button
                  onClick={handleBackup}
                  className="btn btn-primary loading"
                >
                  {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    "Backup to google cloud"
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ManageData;
