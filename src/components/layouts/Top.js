import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePen,
  faHome,
  faListSquares,
  faShoppingBag,
  faShoppingCart,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/DefaultLayoutStyle.css";
import { Link, redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./LayoutsStyle.css";

export default function Top() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("UserID")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("UserID");
    setUser();
    redirect("/home");
  };

  return (
    <Nav
      className="bg-body-tertiary sticky-nav"
      justify="true"
      fill="true"
      style={{
        justifyContent: "space-around",
        padding: "10px 0 10px",
        backgroundColor: "white !important",
        borderBottom: "1px solid black",
      }}
      expand="lg"
    >
      <Container style={{ display: "contents" }}>
        <Link to="/home" style={{ color: "black" }}>
          <FontAwesomeIcon icon={faHome} />
          <span className="nav-link-text product-list-header">Home</span>
        </Link>
        <Link to="/ao" style={{ color: "black" }}>
          <span className="nav-link-text product-list-header">ÁO</span>
        </Link>
        <Link to="/quan" style={{ color: "black" }}>
          <span className="nav-link-text product-list-header">QUẦN</span>
        </Link>
        <Link to="/phukien" style={{ color: "black" }}>
          <span className="nav-link-text product-list-header">PHỤ KIỆN</span>
        </Link>

        {user ? (
          user.isAdmin ? (
            <div style={{ display: "flex" }}>
              <div className="dropdown">
                <div
                  className="dropdown-toggle"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontWeight: "500", fontSize: "large" }}
                >
                  {user.username}
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    textAlign: "center",
                    borderColor: "white",
                  }}
                >
                  <li>
                    <FontAwesomeIcon icon={faFilePen} />
                    <Link to="/product-manage" style={{ color: "black" }}>
                      Quản lí sản phẩm
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        handleLogout();
                      }}
                      style={{ color: "black" }}
                    >
                      <FontAwesomeIcon icon={faSignOut} />
                      <span className="nav-link-text">Đăng xuất</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <div className="dropdown">
                <div
                  className="dropdown-toggle"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontWeight: "500", fontSize: "large" }}
                >
                  {user.username}
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    textAlign: "center",
                    borderColor: "white",
                  }}
                >
                  <li>
                    <Link to="/cart" style={{ color: "black" }}>
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <span className="nav-link-text"> Giỏ hàng</span>
                    </Link>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faShoppingBag} />
                    <Link to="/order" style={{ color: "black" }}>
                      {" "}
                      Order
                    </Link>
                  </li>
                  <li style={{ color: "black" }}>
                    <Link to="/view-order" style={{ color: "black" }}>
                      <FontAwesomeIcon icon={faListSquares} />
                      <span className="nav-link-text"> View Order</span>
                    </Link>
                  </li>
                  <li style={{ color: "black" }}>
                    <Link to="/profile"   style={{ color: "black" }}>
                      <FontAwesomeIcon icon={faUser} />
                      <span className="nav-link-text"> Người dùng</span>
                    </Link>
                  </li>
                  <li style={{ color: "black" }}>
                    <Link
                      to="/"
                      onClick={() => {
                        handleLogout();
                      }}
                      style={{ color: "black" }}
                    >
                      <FontAwesomeIcon icon={faSignOut} />
                      <span className="nav-link-text"> Đăng xuất</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )
        ) : (
          <div style={{ display: "flex" }}>
            <Link to="/cart" style={{ color: "black", marginRight: "15px" }}>
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="nav-link-text">Giỏ hàng</span>
            </Link>
            <Link to="/login" style={{ color: "black" }}>
              <span className="nav-link-text">Đăng nhập</span>
            </Link>
          </div>
        )}
      </Container>
    </Nav>
  );
}
