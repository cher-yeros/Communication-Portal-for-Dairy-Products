import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../client";
import { logoutUser } from "../redux/authSlice";
import Auth from "./Auth";

function Navbar() {
  const currentUser = useSelector((state) => state.auth.loggedUser);
  const [notifications, setNotifications] = useState([]);
  //const notifications = useSelector((state) => state.notification.nots);

  //console.log(nots);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchNots();
  }, []);

  function fetchNots() {
    api
      .get(`post/get-notified?id=${currentUser.id}`, {
        headers: {
          "x-access-token": currentUser.token,
        },
      })
      .then(({ data }) => {
        console.log(data);
        if (data?.success == false) {
        } else {
          setNotifications(data.nots);
        }
        //if (!data?.success) dispatch(updateNotifications([]));
        //else dispatch(updateNotifications(data));
      });
  }

  const { t, i18n } = useTranslation();

  function changeLang(l) {
    i18n.changeLanguage(l);
  }

  let n = useNavigate();
  function logout() {
    Auth.logout();
    dispatch(logoutUser());

    if (currentUser.role == "admin") {
      n("/admin-login");
    } else {
      n("/");
    }
  }

  const [opened, setOpened] = useState(true);
  useEffect(() => {
    openCloseSidebar();
  }, [opened]);

  function openCloseSidebar() {
    if (opened) {
      document.body.classList.remove("toggle-sidebar");
    } else {
      document.body.classList.add("toggle-sidebar");
    }
  }
  function makeSeen() {
    api.put("/post/make-seen", { id: currentUser.id }).then(({ data }) => {
      fetchNots();
    });
  }
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to={"/" + currentUser?.role}
          className="logo d-flex align-items-center"
        >
          <span className="ml-4 d-none d-lg-block">
            {t(`${currentUser?.role}`)}{" "}
          </span>
        </Link>

        <i
          onClick={() => setOpened(!opened)}
          className="bi bi-list toggle-sidebar-btn"
        ></i>

        <Link
          to={"/" + currentUser?.role}
          className="logo d-flex align-items-center"
        >
          <span className=" ml-4 d-none d-lg-block"> {t("dashboard")}</span>
        </Link>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          {currentUser.role != "admin" ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">
                  {
                    notifications?.filter((n) => n.Notification.seen == false)
                      ?.length
                  }
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have{" "}
                  {notifications?.filter((n) => n.seen == false)?.length} new
                  notifications
                  <a href="#">
                    <span
                      onClick={makeSeen}
                      className="badge rounded-pill bg-primary p-2 ms-2"
                    >
                      View all
                    </span>
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {notifications
                  ?.filter((n) => n.seen == false)
                  ?.map((n) => (
                    <div key={n.Notification.id}>
                      <li key={n.Notification.id} className="notification-item">
                        <i className="bi bi-exclamation-circle text-warning"></i>
                        <div>
                          <h4>{n?.Notification.type}</h4>
                          <p>{n?.Notification.body}</p>
                        </div>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </div>
                  ))}
              </ul>
            </li>
          ) : null}

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-globe"></i>
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {t("language")}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li>
                <span
                  onClick={() => changeLang("en")}
                  className="btn dropdown-item d-flex align-items-center"
                >
                  English
                </span>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span
                  onClick={() => changeLang("am")}
                  className="btn dropdown-item d-flex align-items-center"
                >
                  አማርኛ
                </span>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src={
                  currentUser.avatar != null
                    ? `http://localhost:5000/${currentUser.avatar}`
                    : "assets/img/default-avatar.jpg"
                }
                //src="assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{`${currentUser?.firstname} ${currentUser?.lastname}`}</h6>
                <span>{currentUser?.role}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/profile"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  onClick={logout}
                  className="dropdown-item d-flex align-items-center btn"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
