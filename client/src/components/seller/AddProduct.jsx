import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import api from "../../client";
import { updateLocation } from "../../redux/locationSlice";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function AddProductModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    photo: "",
  });

  const [photo, setPhoto] = useState(null);

  const currentUser = useSelector((state) => state.auth.loggedUser);

  function handleInput(e) {
    const newProduct = { ...product };
    newProduct[e.target.name] = e.target.value;

    setProduct(newProduct);
  }

  const location = useSelector((state) => state.location);

  async function handlePost(e) {
    getlocation();
    e.preventDefault();

    if (!photo) {
      alert("Please select a photo");
      return;
    }
    const schema = yup.object().shape({
      quantity: yup
        .number()
        .min(1)
        .required(),
      price: yup.number().required(1),
      description: yup.string().required(),
      name: yup.string().required(),
    });

    product.price = product.price == "" ? "0" : product.price;
    product.quantity = product.quantity == "" ? "0" : product.quantity;

    const valid = await schema.isValid(product);
    if (!valid) {
      schema.validate(product).catch((error) => {
        alert(error.errors);
      });
      return;
    }

    const formData = new FormData();

    formData.append("photo", photo);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("quantity", product.quantity);
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);
    formData.append("UserId", currentUser.id);

    api.post("/post/add-product", formData).then(({ data }) => {
      if (data) {
        alert("Product successfully added");
        setProduct({
          name: "",
          price: "",
          description: "",
          quantity: "",
          photo: "",
        });
      }
    });
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Post product</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Post product</li>
            </ol>
          </nav>
        </div>
        <div className="row justify-content-center">
          <div className="col col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add new product</h5>

                <form className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label className="mb-2" htmlFor="floatingName">
                      Product Image
                    </label>
                    <input
                      className="form-control"
                      name="photo"
                      id="floatingName"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                      accept="image/*"
                      type="file"
                      placeholder="Enter your phone"
                      value=""
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="mb-2" htmlFor="floatingName">
                      Product Name
                    </label>
                    <input
                      className="form-control"
                      name="name"
                      onChange={handleInput}
                      value={product.name}
                      type="text"
                      placeholder="Name "
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="mb-2" htmlFor="floatingName">
                      Price (ETB)
                    </label>
                    <input
                      className="form-control"
                      name="price"
                      onChange={handleInput}
                      value={product.price}
                      type="number"
                      placeholder="Price (ETB)"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="mb-2" htmlFor="floatingName">
                      Quantity (Litre)
                    </label>
                    <input
                      className="form-control"
                      name="quantity"
                      onChange={handleInput}
                      value={product.quantity}
                      type="number"
                      placeholder="Quantity (Litre)"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="mb-2" htmlFor="floatingName">
                      Description
                    </label>

                    <textarea
                      name="description"
                      onChange={handleInput}
                      value={product.description}
                      className="form-control"
                      placeholder="Description"
                      style={{ height: "100px" }}
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <div className="text-center">
                      <button
                        onClick={handlePost}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
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

export default AddProductModal;
