import React from "react";
import * as Icon from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const sellerRoutes = [
    {
      name: "Interested",
      link: "/interests",
      icon: "bi bi-bookmark-heart-fill",
      key: "interest",
    },
    {
      name: "Sold products",
      link: "/sold",
      icon: "bi bi-bag-check-fill",
      key: "sold",
    },
    {
      name: "Post Product",
      link: "/post-product",
      icon: "bi bi-bag-plus-fill",
      key: "post_product",
    },
    {
      name: "Get Information",
      link: "/get-info",
      icon: "bi bi-info-circle-fill",
      key: "get_info",
    },
    {
      name: "Contact us",
      link: "/contact-us",
      icon: "bi bi-person-rolodex",
      key: "contact_us",
    },
    {
      name: "Help",
      link: "/get-help",
      icon: "bi bi-question-circle-fill",
      key: "help",
    },
  ];

  const adminRoutes = [
    {
      name: "Generate report",
      link: "/generate-report",
      icon: "bi bi-briefcase-fill",
      key: "generate_report",
    },
    {
      name: "Read feedbacks",
      link: "/read-feedback",
      icon: "bi bi-chat-left-dots-fill",
      key: "read_feedback",
    },
    {
      name: "Manage data",
      link: "/manage-data",
      icon: "bi bi-clipboard-data",
      key: "manage_data",
    },
    {
      name: "Notify feature",
      link: "/notify-feature",
      icon: "bi bi-bell-fill",
      key: "notify_feature",
    },
    {
      name: "Payment",
      link: "/payments",
      icon: "bi bi-cash",
      key: "payments",
    },
  ];

  const buyerRoutes = [
    {
      name: "View Product",
      link: "/view-products",
      icon: "bi bi-list",
      key: "view_products",
    },
    {
      name: "Nearby Products",
      link: "/nearby",
      icon: "bi bi-geo-alt-fill",
      key: "nearby_product",
    },
    {
      name: "Get Information",
      link: "/get-info",
      icon: "bi bi-info-circle-fill",
      key: "get_info",
    },
    {
      name: "Contact us",
      link: "/contact-us",
      icon: "bi bi-person-rolodex",
      key: "contact_us",
    },
    {
      name: "Help",
      link: "/get-help",
      icon: "bi bi-question-circle-fill",
      key: "help",
    },
  ];

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
  const { t } = useTranslation();
  return (
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
  );
}

export default Sidebar;
