import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import api from "../client";
import avatar from "../images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import * as yup from "yup";
import { loginSuccess, updateAvatar } from "../redux/authSlice";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Profile = () => {
  let u = useSelector((state) => state.auth.loggedUser);

  const [user, setUser] = useState({
    id: u?.id,
    firstname: u?.firstname,
    lastname: u?.lastname,
    username: u?.username,
    address: u?.address,
    email: u?.email,
    phone: u?.phone,
    role: u?.role,
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    renewPassword: "",
  });

  function handleChangePwd(e) {
    let newPwd = { ...password };
    newPwd[e.target.name] = e.target.value;

    setPassword(newPwd);
  }

  const dispatch = useDispatch();
  function handleProfile(e) {
    const formData = new FormData();
    formData.append("profileImg", e.target.files[0]);
    formData.append("id", u.id);

    api
      .post("update-avatar", formData, {
        headers: {
          "x-access-token": u.token,
        },
      })
      .then(({ data }) => {
        var output = document.getElementById("profileImg");
        var output2 = document.getElementById("pImg");
        output.src = `http://localhost:5000/${data}`;
        output2.src = `http://localhost:5000/${data}`;

        dispatch(updateAvatar(data.toString()));
      });
  }

  async function handleEdit(e) {
    e.preventDefault();

    const schema = yup.object().shape({
      role: yup.string().required(),

      address: yup.string().required(),
      phone: yup.string().min(10).required(),
      email: yup.string().email().required(),
      username: yup.string().min(5).max(20).required(),
      lastname: yup.string().min(5).max(20).required(),
      firstname: yup.string().min(5).max(20).required(),
    });

    const valid = await schema.isValid(user);

    if (!valid) {
      schema.validate(user).catch(function (err) {
        alert(err.errors);
      });
    } else {
      api.put("/edit-profile", user).then(({ data }) => {
        console.log(data);
        dispatch(loginSuccess(data.user));
        alert("Successfully Updated!");
      });
    }
  }

  function handleInput(e) {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;

    setUser(newUser);
  }

  function changePassword(e) {
    e.preventDefault();
    const { newPassword, currentPassword, renewPassword } = password;
    if (
      validator.isEmpty(newPassword) ||
      validator.isEmpty(currentPassword) ||
      validator.isEmpty(renewPassword)
    ) {
      alert("Input Cannot be empty!");
      return;
    }
    if (password.newPassword != password.renewPassword) {
      alert("password doesn't match!");
    } else {
      let payload = {
        email: u.email,
        password,
      };

      api
        .post("/change-password", payload, {
          headers: {
            "x-access-token": u.token,
          },
        })
        .then(({ data }) => {
          if (!data?.success) {
            alert(data?.message);
          } else {
            alert("Successfully updated");
          }
        });
    }
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">User Profile</li>
            </ol>
          </nav>
        </div>
        <div className="section profile">
          <div className="row">
            <div className="col-xl-3 col-lg-3">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    id="pImg"
                    src={
                      u?.avatar != null
                        ? `http://localhost:5000/${u?.avatar}`
                        : avatar
                    }
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h2>{`${user.firstname} ${user.lastname}`}</h2>
                  <h3 style={{ textTransform: "capitalize" }}>{user.role}</h3>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content pt-2">
                    {OverView(user)}

                    {ProfileEdit(
                      u,
                      handleProfile,
                      user,
                      handleInput,
                      handleEdit
                    )}

                    {ChangePassword(handleChangePwd, password, changePassword)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;

function ChangePassword(handleChangePwd, password, changePassword) {
  return (
    <div className="tab-pane fade pt-3" id="profile-change-password">
      <form>
        <div className="row mb-3">
          <label
            htmlFor="currentPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Current Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              name="currentPassword"
              onChange={handleChangePwd}
              value={password.currentPassword}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="newPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            New Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              onChange={handleChangePwd}
              value={password.newPassword}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="renewPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Re-enter New Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              type="password"
              className="form-control"
              id="renewPassword"
              name="renewPassword"
              onChange={handleChangePwd}
              value={password.renewPassword}
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={changePassword}
            type="submit"
            className="btn btn-primary"
          >
            Change
          </button>
        </div>
      </form>
    </div>
  );
}

function ProfileEdit(u, handleProfile, user, handleInput, handleEdit) {
  return (
    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
      <form>
        <div className="row mb-3">
          <label
            htmlFor="profileImage"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Profile Image
          </label>
          <div className="col-md-8 col-lg-9">
            <img
              id="profileImg"
              src={u?.avatar ? `http://localhost:5000/${u?.avatar}` : avatar}
              alt="Profile"
            />
            <div className="pt-2">
              <input
                onChange={handleProfile}
                style={{ display: "none" }}
                type="file"
                name="profileImg"
                id="avatar"
              />
              <a
                onClick={() => document.getElementById("avatar").click()}
                className="btn btn-primary btn-sm"
                title="Upload new profile image"
              >
                <i className="bi bi-upload"></i>
              </a>
              {/*<a
                className="btn btn-danger btn-sm"
                title="Remove my profile image"
              >
                <i className="bi bi-trash"></i>
              </a>*/}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="row mb-3">
              <div className="col-md-4 col-lg-3 col-form-label">
                <Form.Label>Firstname</Form.Label>
              </div>
              <div className="col-md-8 col-lg-9">
                <Form.Control
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInput}
                  type="text"
                  placeholder="Enter your phone"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-3">
              <div className="col-md-4 col-lg-3 col-form-label">
                <Form.Label>Lastname</Form.Label>
              </div>
              <div className="col-md-8 col-lg-9">
                <Form.Control
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInput}
                  type="text"
                  placeholder="Enter your phone"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row mb-3">
              <div className="col-md-4 col-lg-3 col-form-label">
                <Form.Label>Username</Form.Label>
              </div>
              <div className="col-md-8 col-lg-9">
                <Form.Control
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row mb-3">
              <div className="col-md-4 col-lg-3 col-form-label">
                <Form.Label>Address</Form.Label>
              </div>
              <div className="col-md-8 col-lg-9">
                <Form.Control
                  name="address"
                  value={user.address}
                  onChange={handleInput}
                  type="text"
                  placeholder="Enter your phone"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row mb-3">
              <div className="col-md-4 col-lg-3 col-form-label">
                <Form.Label>Email</Form.Label>
              </div>
              <div className="col-md-8 col-lg-9">
                <Form.Control
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  type="email"
                  placeholder="Enter your phone"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row mb-3">
              <div className="col-md-4 col-lg-3 col-form-label">
                <Form.Label>Phone</Form.Label>
              </div>
              <div className="col-md-8 col-lg-9">
                <Form.Control
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                  type="tel"
                  placeholder="Enter your phone"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleEdit}
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function OverView(user) {
  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      <h5 className="card-title">Profile Details</h5>

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Full Name</div>
        <div className="col-lg-9 col-md-8">{`${user.firstname} ${user.lastname}`}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Username</div>
        <div className="col-lg-9 col-md-8">{user.username}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Email</div>
        <div className="col-lg-9 col-md-8">{user.email}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Address</div>
        <div className="col-lg-9 col-md-8">{user.address}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Phone</div>
        <div className="col-lg-9 col-md-8">{user.phone}</div>
      </div>
    </div>
  );
}
