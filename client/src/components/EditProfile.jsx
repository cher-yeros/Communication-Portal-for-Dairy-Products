import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import api from "../client";
import Button from "react-bootstrap/Button";
import avatar from "../images/avatar.png";
import { useSelector } from "react-redux";

function EditProfile(props) {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const currentUser = useSelector((state) => state.auth.loggedUser);
  useEffect(() => {
    let u = currentUser;
    delete u.createdAt;
    delete u.updatedAt;
    delete u.password;
    delete u.confirmPassword;
    setUser(u);
    //setUser(props.user)
    //console.log("user", props.user);
  }, []);

  function handleProfile(e) {
    const formData = new FormData();
    formData.append("profileImg", e.target.files[0]);
    formData.append("id", currentUser.id);

    api
      .post("update-avatar", formData, {
        headers: {
          "x-access-token": currentUser.token,
        },
      })
      .then(({ data }) => {
        var output = document.getElementById("profileImg");
        output.src = `http://localhost:5000/${data}`;

        const user = currentUser;
        user.avatar = data;

        localStorage.setItem("user", JSON.stringify(user));
      });
  }

  function handleEdit(e) {
    e.preventDefault();

    if (user.password != user.confirmPassword) {
      alert("Password Doesn't match");
      return;
    }
    delete user.confirmPassword;

    api
      .put("/edit-profile", user, {
        headers: {
          "x-access-token": currentUser.token,
        },
      })
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        alert("Successfully Updated!");
        console.log(data);
      });
  }
  function handleInput(e) {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;

    setUser(newUser);
  }
  return <></>;
}

export default EditProfile;
