import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import Auth from "../Auth";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { updateLocation } from "../../redux/locationSlice";
import { useDispatch, useSelector } from "react-redux";

function NearbyProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useSelector((state) => state.location);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <Products location={location} type="nearby" />
      </main>
    </>
  );

  function getlocation() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition((pos) => {
              dispatch(
                updateLocation({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                })
              );
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                dispatch(
                  updateLocation({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                  })
                );
              },
              (err) => {
                alert(`ERROR(${err.code}): ${err.message}`);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
            );
          } else if (result.state === "denied") {
            alert("Location Access Denied!");
          }
          result.onchange = function() {
            console.log(result.state);
          };
        });
    } else {
      alert("Geo Location not available!");
    }
  }
}

export default NearbyProduct;
