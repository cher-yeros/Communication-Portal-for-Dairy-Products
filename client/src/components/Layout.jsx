import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../client";
import Auth from "./Auth";

function Layout() {
  const sellerRoutes = [
    {
      name: "Interested",
      link: "/interests",
      icon: "bi bi-person",
      key: "interest",
    },
    {
      name: "Sold products",
      link: "/sold",
      icon: "bi bi-person",
      key: "sold",
    },
    {
      name: "Post Product",
      link: "/post-product",
      icon: "bi bi-person",
      key: "post_product",
    },
    {
      name: "Give Feedback",
      link: "/give-feedback",
      icon: "bi bi-person",
      key: "give_feedback",
    },
    {
      name: "Get Information",
      link: "/get-info",
      icon: "bi bi-person",
      key: "get_info",
    },
    {
      name: "Contact us",
      link: "/contact-us",
      icon: "bi bi-person",
      key: "contact_us",
    },
    {
      name: "Help",
      link: "/get-help",
      icon: "bi bi-person",
      key: "help",
    },
  ];

  const adminRoutes = [
    {
      name: "Generate report",
      link: "/generate-report",
      icon: "bi bi-person",
      key: "generate_report",
      subRoute: [
        {
          name: "Yearly",
          link: "/yearly",
          icon: "bi bi-person",
          key: "yearly",
        },
        {
          name: "Monthly",
          link: "/monthly",
          icon: "bi bi-person",
          key: "monthly",
        },
        {
          name: "Daily",
          link: "/daily",
          icon: "bi bi-person",
          key: "daily",
        },
      ],
    },
    {
      name: "Read feedbacks",
      link: "/read-feedback",
      icon: "bi bi-person",
      key: "read_feedback",
    },
    {
      name: "Manage data",
      link: "/manage-data",
      icon: "bi bi-person",
      key: "manage_data",
    },
    {
      name: "Notify feature",
      link: "/notify-feature",
      icon: "bi bi-person",
      key: "notify_feature",
    },
    {
      name: "Update chatbot",
      link: "/update-chatbot",
      icon: "bi bi-person",
      key: "update_chatbot",
    },
    {
      name: "Get Information",
      link: "/get-info",
      icon: "bi bi-person",
      key: "get_info",
    },
    {
      name: "Contact us",
      link: "/contact-us",
      icon: "bi bi-person",
      key: "contact_us",
    },
    {
      name: "Help",
      link: "/get-help",
      icon: "bi bi-person",
      key: "help",
    },
  ];

  const buyerRoutes = [
    {
      name: "View Product",
      link: "/view-products",
      icon: "bi bi-person",
      key: "view_products",
    },
    {
      name: "Nearby Products",
      link: "/nearby",
      icon: "bi bi-person",
      key: "nearby_product",
    },
    {
      name: "Get Information",
      link: "/get-info",
      icon: "bi bi-person",
      key: "get_info",
    },
    {
      name: "Contact us",
      link: "/contact-us",
      icon: "bi bi-person",
      key: "contact_us",
    },
    {
      name: "Help",
      link: "/get-help",
      icon: "bi bi-person",
      key: "help",
    },
  ];

  const [notifications, setNotifications] = useState([]);
  let routes = [];
  const user = useSelector((state) => state.auth.loggedUser);

  switch (user?.role) {
    case "seller":
      routes = sellerRoutes;
      break;
    case "buyer":
      routes = buyerRoutes;
      break;
    case "admin":
      routes = adminRoutes;
      break;
  }

  useEffect(() => {
    fetchNots();
  }, []);

  function fetchNots() {
    api.get("post/get-notified").then(({ data }) => {
      setNotifications(data);
    });
  }

  const { t, i18n } = useTranslation();

  function changeLang(l) {
    console.log(l);
    i18n.changeLanguage(l);
  }

  let n = useNavigate();
  function logout() {
    Auth.logout();
    if (user.role == "admin") {
      n("/admin-login");
    } else {
      n("/");
    }
  }

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link
            to={"/" + user?.role}
            className="logo d-flex align-items-center"
          >
            <span className="ml-4 d-none d-lg-block">
              {t(`${user?.role}`)}{" "}
            </span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn"></i>

          <Link
            to={"/" + user?.role}
            className="logo d-flex align-items-center"
          >
            <span className=" ml-4 d-none d-lg-block"> {t("dashboard")}</span>
          </Link>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">
                  {notifications.length}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have {notifications.length} new notifications
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {notifications.map((n) => (
                  <div key={n.id}>
                    <li key={n.id} className="notification-item">
                      <i className="bi bi-exclamation-circle text-warning"></i>
                      <div>
                        <h4>{n.type}</h4>
                        <p>{n.body}</p>
                        {/*<p>30 min. ago</p>*/}
                      </div>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </div>
                ))}
              </ul>
            </li>

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
                  src="assets/img/profile-img.jpg"
                  alt="Profile"
                  className="rounded-circle"
                />
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{`${user?.firstname} ${user?.lastname}`}</h6>
                  <span>{user?.role}</span>
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
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to={"/" + user?.role}>
              <i className="bi bi-grid"></i>
              <span>{t("dashboard")}</span>
            </Link>
          </li>

          {routes.map((route) => (
            <li key={route.key} className="nav-item">
              {route?.subRoute ? (
                <>
                  <a
                    className="nav-link collapsed"
                    data-bs-target="#components-nav"
                    data-bs-toggle="collapse"
                    href="#"
                  >
                    <i className="bi bi-menu-button-wide"></i>
                    <span>{t(`${route.key}`)}</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </a>
                  {route.subRoute.map((sr) => (
                    <ul
                      key={sr.key}
                      id="components-nav"
                      className="nav-content collapse "
                      data-bs-parent="#sidebar-nav"
                    >
                      <li>
                        <Link to={"/report" + sr.link}>
                          <i className="bi bi-circle"></i>
                          <span>{t(`${sr.key}`)}</span>
                        </Link>
                      </li>
                    </ul>
                  ))}
                </>
              ) : (
                <Link to={route.link} className="nav-link collapsed">
                  <i className={route.icon}></i>
                  <span>{t(`${route.key}`)}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Layout;
