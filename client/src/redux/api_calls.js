import api from "../client";
import { updateCounts } from "./adminSlice";
import { loginSuccess } from "./authSlice";
//import { toast } from "react-toastify";
//import jwtDecode from "jwt-decode";
import { updateNotifications } from "./notificationSlice";
import { updateMyProduct, updateProducts } from "./productSlice";
import { updateSellerCounts } from "./sellerSlice";

export const loginUser = async (user, dispatch, navigate) => {
  api.post("/login", user).then(({ data }) => {
    if (data.error) {
      alert(data.error);
    } else {
      dispatch(loginSuccess(data.user));

      //toast("Just test", {
      //  position: toast.POSITION_BOTTOM_RIGHT,
      //});

      //const decoded = jwtDecode(data.user.token).auth;
      //console.log(decoded);
      //if (decoded.isAdmin) {
      //  navigate("/admin");
      //} else {
      //  navigate("/nearby");
      //}
    }
  });
};

//export const getnotifications = async (dispatch) => {
//  api.get("post/get-notified").then(({ data }) => {
//    console.log(data);
//    dispatch(updateNotifications(data));
//  });
//};

export const getProducts = async (q, token, dispatch) => {
  let url = "buyer/get-products?q=" + q;

  api.get(url, { headers: { "x-access-token": token } }).then(({ data }) => {
    dispatch(updateProducts(data));
  });
};
export const getNearbyProducts = async (q, token, location, dispatch) => {
  const { latitude, longitude } = location;
  console.log("user location", location);

  let url = `buyer/nearby?latitude=${latitude}&longitude=${longitude}&q=${q}`;

  api.get(url, { headers: { "x-access-token": token } }).then(({ data }) => {
    dispatch(updateProducts(data));
  });
};

export const getMyProducts = async (q, token, id, dispatch) => {
  let url = `localhost:5000/api/seller/get-my-product?id=${id}&q=${q}`;

  api
    .get(url, {
      headers: {
        "x-access-token": token,
      },
    })
    .then(({ data }) => {
      dispatch(updateMyProduct(data));
    });
};

export const getCounts = async (token, dispatch) => {
  api
    .get("admin/get-count", { headers: { "x-access-token": token } })
    .then(({ data }) => {
      dispatch(updateCounts(data));
    });
};

export const getSellerCounts = async (uid, token, dispatch) => {
  api
    .get("/seller/seller-counter?id=" + uid, {
      headers: { "x-access-token": token },
    })
    .then(({ data }) => {
      dispatch(updateSellerCounts(data));
    });
};
