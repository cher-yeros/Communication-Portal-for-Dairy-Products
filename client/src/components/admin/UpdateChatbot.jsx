import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../client";
import Auth, { logout } from "../Auth";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseSdk";

function UpdateChatbot() {
  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [chatBots, setChatBots] = useState([]);

  const [bot, setBot] = useState({
    cbid: "",
    trigger: "",
    message: "",
  });

  const [options, setOptions] = useState([
    { value: 1, label: "", trigger: "" },
    { value: 2, label: "", trigger: "" },
  ]);

  const [isAdding, setisAdding] = useState(false);
  const [isEditing, setisEditing] = useState(true);

  useEffect(() => {
    fetchChatbots();
  }, []);

  function fetchChatbots() {
    try {
      addDoc(collection(db, "steps"), {
        id: "1",
        message: "hey",
        trigger: "2",
      }).then((res) => {
        console.log(res);
      });
      //  onClose();
    } catch (err) {
      alert(err);
    }
    //api.get("/admin/get-wcb").then(({ data }) => {
    //  setChatBots(data);
    //});
  }

  function addContent() {
    //chatBots.push(2);
    setisAdding(true);
  }

  function addNewOptions(e, bot) {
    if (bot) {
      let i = chatBots.findIndex((b) => b.id == bot.id);

      console.log("Before update: ", chatBots[i]);
      chatBots[i].options.push(
        JSON.stringify({
          value: bot.options.length + 1,
          label: "",
          trigger: "",
        })
      );
    } else {
      let newOpts = options;

      let op = {
        value: options.length + 1,
        label: "",
        trigger: "",
      };
      newOpts.push(op);
      //  console.log(newOpts);
      setOptions(newOpts);
      console.log(options);
      //  bot.options.push({
      //    value: options.length + 1,
      //    label: "",
      //    trigger: "",
      //  });
    }
  }
  function fillbotInput(e) {}
  function fillOptions(e) {}
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="main" id="main">
        <div className="pagetitle">
          <h1>Update chatbot</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Update chatbot</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div
              className="card"
              style={{ height: "33.3rem", overflowY: "scroll" }}
            >
              <div className="card-body">
                <h5 className="card-title">Update chatbot</h5>

                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Trigger ID</th>
                      <th>Message</th>
                      <th>Options</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chatBots.map((bot) => (
                      <tr key={bot.id}>
                        <td style={{ width: "6rem" }}>
                          <div className="col-lg-12 col-md-6 mb-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="ID"
                              value={bot.cbid}
                              disabled={isEditing}
                            />
                          </div>
                        </td>
                        <td style={{ width: "6rem" }}>
                          <div className="col-lg-12 col-md-6 mb-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Trigger ID"
                              value={bot.trigger}
                              disabled={isEditing}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="col-lg-12 col-md-6 mb-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Chatbot ID"
                              value={bot.message}
                              disabled={isEditing}
                            />
                          </div>
                        </td>
                        <td style={{ width: "22rem" }}>
                          {bot.options.map((op) => (
                            <div className="row" key={op.value}>
                              <div className="col-lg-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Value"
                                  value={JSON.parse(op).value}
                                  disabled={isEditing}
                                />
                              </div>
                              <div className="col-lg-6">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Label"
                                  value={JSON.parse(op).label}
                                  disabled={isEditing}
                                />
                              </div>
                              <div className="col-lg-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Trigger"
                                  value={JSON.parse(op).trigger}
                                  disabled={isEditing}
                                />
                              </div>
                            </div>
                          ))}
                          {/*<div
                            onClick={(e) => addNewOptions(e, bot)}
                            className="btn btn-success btn-sm"
                          >
                            Add Options
                          </div>*/}
                        </td>
                        <td>
                          {/* <div
                            onClick={() => setisEditing(true)}
                            className="btn-sm btn btn-primary"
                          >
                            Edit
                          </div>
                          {""}*/}
                          <div className="btn-sm btn btn-danger">Delete</div>
                        </td>
                      </tr>
                    ))}
                    {isAdding ? (
                      <tr>
                        <td style={{ width: "6rem" }}>
                          <div className="col-lg-12 col-md-6 mb-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="ID"
                              value={bot.cbid}
                              onChange={fillbotInput}
                            />
                          </div>
                        </td>
                        <td style={{ width: "6rem" }}>
                          <div className="col-lg-12 col-md-6 mb-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Trigger ID"
                              value={bot.trigger}
                              onChange={fillbotInput}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="col-lg-12 col-md-6 mb-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Chatbot ID"
                              value={bot.message}
                              onChange={fillbotInput}
                            />
                          </div>
                        </td>
                        <td>
                          {options.map((op) => (
                            <div key={op.value} className="row">
                              <div className="col-lg-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Value"
                                  value={op.value}
                                  onChange={fillOptions}
                                />
                              </div>
                              <div className="col-lg-6">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Label"
                                  value={op.label}
                                  onChange={fillOptions}
                                />
                              </div>
                              <div className="col-lg-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Trigger"
                                  value={op.trigger}
                                  onChange={fillOptions}
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={addNewOptions}
                            className="btn btn-success btn-sm"
                          >
                            Add Options
                          </button>
                        </td>
                        <td>
                          <div className="btn-sm btn btn-primary">Save</div>{" "}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td align="end">
                        <div
                          onClick={addContent}
                          className="btn btn-primary btn-sm"
                        >
                          Add Content
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateChatbot;
