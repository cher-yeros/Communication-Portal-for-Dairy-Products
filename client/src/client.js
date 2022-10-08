import axios from "axios";
import { store } from "./redux/store";
const ls = JSON.parse(localStorage.getItem("persist:root"))?.auth;

const currentUser = ls ? JSON.parse(ls)?.loggedUser?.token : null;

const state = store.getState();

const api = axios.create({
  //baseURL: "http://192.168.43.123:5000/api",
  baseURL: "http://localhost:5000/api",
  headers: {
    "x-access-token": currentUser,
  },
});

export default api;
