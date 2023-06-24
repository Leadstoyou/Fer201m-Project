import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/DefaultLayoutStyle.css";
import { Link, redirect } from "react-router-dom";

export default function Top() {
  const [dropdownList, setDropdownList] = useState("none");
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("UserID")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("UserID");
    setUser()
    redirect('/home');
  };
  const handleMouseOver = () => {
    setDropdownList("block");
  };
  const handleMouseOut = () => {
    setDropdownList("none");
  };
  return (
    <div className="container top">
      <div className="row">
        <Nav className="me-auto">
          <Link to="/home">
            <FontAwesomeIcon icon={faHome} />
            <span className="nav-link-text">Home</span>
          </Link>
          <Link to="/ao">
            <span className="nav-link-text">Áo</span>
          </Link>
          <Link to="/quan">
            <span className="nav-link-text">Quần</span>
          </Link>
          <Link to="/phukien">
            <span className="nav-link-text">Phụ Kiện</span>
          </Link>

          {user ? (
            user.isAdmin ? (
              <div style={{ display: "flex" }}>
                <div onMouseOut={() => {}}>
                  <div
                    onMouseOver={() => {
                      handleMouseOver();
                    }}
                  >
                    Hello Admin {user.username}
                  </div>
                  <span class="arrow_carrot-down"></span>
                  <ul style={{ display: dropdownList }}>
                    <li>
                      <Link to="/product-manage">Quản lí sản phẩm</Link>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="nav-link-text">Đăng xuất</span>
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <div onMouseOut={() => {}}>
                  <div
                    onMouseOver={() => {
                      handleMouseOver();
                    }}
                  >
                    Hello {user.username}
                  </div>
                  <span class="arrow_carrot-down"></span>
                  <ul style={{ display: dropdownList }}>
                    <li>
                      <Link to="/order">Order</Link>
                    </li>
                    <li>
                      <Link to="/view-order">View Order</Link>
                    </li>
                    <li>
                      <Link to="/cart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="nav-link-text">Giỏ hàng</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="nav-link-text">Đăng xuất</span>
                </Link>
              </div>
            )
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} />
              <span className="nav-link-text">Đăng nhập</span>
            </Link>
          )}
        </Nav>
      </div>
    </div>
  );
}
